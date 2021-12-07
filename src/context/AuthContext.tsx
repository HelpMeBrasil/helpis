import { createContext, ReactNode, useState, useCallback } from "react";
import { api } from "../services/api";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
toast.configure()


type SignInCredentials = {
  username: string;
  password: string;
}

type ForgetPassword = {
  username: string;
}

type ConfirmCode = {
  confirmationCode: string;
  password: string;
  passwordConfirmation: string;
}

type RegisterProps = {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
  identity: string;
  name: string;
  commercialName: string;
  responsibleName: string;
  responsibleIdentity: string;
  active?: boolean;
  codeBank: string;
  codeAccount: string;
  bankAgency: string;
  bankAgencyDigit: string;
  bankAccount: string;
  bankAccountDigit: string;
  operation: string;
  street: string;
  number: string;
  district: string;
  zipCode: string;
  complement: string;
  cityName: string;
  stateInitials: string;
  countryName: string;
  boleto: string;
  credito: string;
  cripto: string;
  debito: string;
  pix: string;
}

type UserProps = {
  id: string;
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
  identity: string;
  merchant:{
    name: string;
    commercialName: string;
    responsibleName: string;
    responsibleIdentity: string;
    bankData:{
      bank:{
      code: string;
      };
      accountType:{
        code: string;
      };
    bankAgency: string;
    bankAgencyDigit: string;
    bankAccount: string;
    bankAccountDigit: string;
    operation: string;
  }
  address: {
    street: string;
    number: string;
    district: string;
    zipCode: string;
    complement: string;
    cityName: string;
    stateInitials: string;
    countryName: string;
  };
  merchantSplit: [  {
      paymentMethodCode: string,
  }];
  
};
}

type Payment = {
  hash: string | undefined
  isSandbox: boolean,
  paymentMethod:{
    code: string
  },
  customer: {
    email: string
    phoneNumber: string
    identity: string
    name:string
    address: {
      street:string
      number:string
      district:string
      zipCode:string
      complement:string
      cityName:string
      stateInitials:string
      countryName:string
    },
  },
  products: {
    code: string,
    description: string,
    unitPrice: number,
    quantity: number,
  }[],
  paymentObject: any, //pode variar dependendo do tipo de pagamento
} 

type PasswordChange = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

type UserUpdate = Omit<RegisterProps, 'password'>;

type CampaignReturnProps = {
  hash: string,
  title: string,
  description: string,
  image: string,
}

type CampaignProps = Omit<CampaignReturnProps, 'id' | 'hash'>;

type ResponseRequest = {
    paymentMethod:{
      code: string,
      name: string,
    },
    isEnabled: boolean,
    InstallmentLimit: number,
    MinorInstallmentAmount: number,
    IsInstallmentEnable: false
  }


type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  forgetPassword(emailForRecovery: ForgetPassword): Promise<void>;
  confirmCode(codeRecovery: ConfirmCode): Promise<void>;
  register(propsRegister: RegisterProps): Promise<void>;
  userDataGet(): Promise<UserProps>;
  userUpdate(propsUpdate: UserUpdate): Promise<void>;
  changePassword(propsChangePassword: PasswordChange): Promise<void>;
  isAuthenticated: any;
  setIsAuthenticated: any;
  addCampaign: (propsCampaign: CampaignProps) => Promise<void>;
  viewCampaign:(hash: string) => Promise<CampaignReturnProps>;
  campaign: CampaignProps | undefined;
  listGridByUserName:() => Promise<CampaignReturnProps[]>
  editCampaign: (propsEditCampaign: CampaignReturnProps) => Promise<void>
  listGridByName:(name: string) => Promise<CampaignReturnProps[]>
  listGridSite:(name: string) => Promise<CampaignReturnProps[]>
  addPayment:(data: Payment) => Promise<void>;
  requestMethods:(hash: string) => Promise<ResponseRequest[]>;
};

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [username, setUsername] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState('');
  const [campaign, setCampaign] = useState<CampaignProps>()
  const storagedToken = sessionStorage.getItem('accessToken');
  

  const navigate = useNavigate();


  async function signIn({ username, password }: SignInCredentials) {
    const response = await api.post('Auth', {
      username,
      password
    })

    if (response.status === 200) {
      toast.success('Sucesso!', {autoClose:3000});

      //window.sessionStorage.setItem('accessToken', response.data.accessToken);
      sessionStorage.setItem('accessToken', response.data.accessToken)
      setIsAuthenticated(true);
      navigate("/minhas_campanhas");
    }else{
      toast.warning('Usuário/senha incorretos ou este cadastro não existe.', {autoClose:3000});
    }
  }

  async function forgetPassword({ username }: ForgetPassword){
    const notificationType = 1;
    const response = await api.post('Recovery', {
      username,
      notificationType
  })
  setUsername(username);
    if (response.status !== 200) {
      toast.warning('Usuário não encontrado.', {autoClose:3000});
    }
  }


  async function confirmCode({confirmationCode, password, passwordConfirmation}: ConfirmCode) {
    const response = await api.post('Recovery/Confirmation', {
      username,
      confirmationCode
  })
  if(response.status === 200) {
    console.log(response.data.identifier);
    const recoveryId = response.data.identifier
    const responseRecover = await api.put('Recovery', {
      recoveryId,
      username,
      password,
      passwordConfirmation
    })

    if (responseRecover.status !== 200) {
      toast.warning('A senha não atende os requisitos.', {autoClose:3000});
    }else{
      window.location.href = "./login";
    }
  }else
  toast.warning('Código informado é inválido.', {autoClose:3000});

  if (response.status !== 200) {
    console.log(response.data);
  }
    
  }

  async function register({ 
    firstName, surname, email, phoneNumber, password, identity, name, commercialName, responsibleName, responsibleIdentity, codeBank,
    codeAccount, bankAgency, bankAgencyDigit, bankAccount, bankAccountDigit, operation, street, number, district, zipCode, complement, cityName, stateInitials,
    countryName, boleto, credito, cripto, debito, pix}: RegisterProps)  {
      let merchantSplit = [];
      if(boleto !== ''){
        merchantSplit.push({
          PaymentMethodCode: "1",
          IsSubaccountTaxPayer: true,
          Taxes: [
                {
                    TaxTypeName: 2,
                    Tax: "0.20"
                }
            ]
        });
      }
      if(credito !== ''){
        merchantSplit.push({
          PaymentMethodCode: "2",
          IsSubaccountTaxPayer: true,
          Taxes: [
                {
                    TaxTypeName: 2,
                    Tax: "0.20"
                }
            ]
        });
      }
      if(cripto !== ''){
        merchantSplit.push({
          PaymentMethodCode: "3",
          IsSubaccountTaxPayer: true,
          Taxes: [
                {
                    TaxTypeName: 2,
                    Tax: "0.20"
                }
            ]
        });
      }
      if(debito !== ''){
        merchantSplit.push({
          PaymentMethodCode: "4",
          IsSubaccountTaxPayer: true,
          Taxes: [
                {
                    TaxTypeName: 2,
                    Tax: "0.20"
                }
            ]
        });
      }
      if(pix !== ''){
        merchantSplit.push({
          PaymentMethodCode: "6",
          IsSubaccountTaxPayer: true,
          Taxes: [
                {
                    TaxTypeName: 2,
                    Tax: "0.20"
                }
            ]
        });
      }

      let username = email;
      const isPanelRestricted = true;
      const response = await api.post('Register',{
        firstName,
        surname,
        username,
        email,
        phoneNumber,
        password,
        merchant:{
          name,
          identity,
          commercialName,
          responsibleName,
          responsibleIdentity,
          isPanelRestricted,
          bankData:{
            bank:{
              code : codeBank,
            },
            accountType:{
              code : codeAccount,
            },
          bankAgency,
          bankAgencyDigit,
          bankAccount,
          bankAccountDigit,
          operation,
          },
        address:{
          street,
          number,
          district,
          zipCode,
          complement,
          cityName,
          stateInitials,
          countryName,
        },
        merchantSplit,
      }
    });
      if (response.status === 200) {
        toast.success('teste', {autoClose:3000});

        //window.location.href = "./login";
        navigate('/login');
      }else{
        toast.warning('Não foi possível realizar o cadastro, revise os dados informados e tente novamente.' +
        ' Caso o erro persista entre em contato conosco.', {autoClose:3000});
      }

    }


    async function userUpdate({ 
      firstName, surname, email, phoneNumber, identity, name, commercialName, responsibleName, responsibleIdentity, codeBank,
      codeAccount, bankAgency, bankAgencyDigit, bankAccount, bankAccountDigit, operation, street, number, district, zipCode, complement, cityName, stateInitials,
      countryName, boleto, credito, cripto, debito, pix}: UserUpdate)  {
        let merchantSplit = [];
        if(boleto !== ''){
          merchantSplit.push({
            PaymentMethodCode: "1",
            IsSubaccountTaxPayer: true,
            Taxes: [
                  {
                      TaxTypeName: 2,
                      Tax: "0.20"
                  }
              ]
          });
        }
        if(credito !== ''){
          merchantSplit.push({
            PaymentMethodCode: "2",
            IsSubaccountTaxPayer: true,
            Taxes: [
                  {
                      TaxTypeName: 2,
                      Tax: "0.20"
                  }
              ]
          });
        }
        if(cripto !== ''){
          merchantSplit.push({
            PaymentMethodCode: "3",
            IsSubaccountTaxPayer: true,
            Taxes: [
                  {
                      TaxTypeName: 2,
                      Tax: "0.20"
                  }
              ]
          });
        }
        if(debito !== ''){
          merchantSplit.push({
            PaymentMethodCode: "4",
            IsSubaccountTaxPayer: true,
            Taxes: [
                  {
                      TaxTypeName: 2,
                      Tax: "0.20"
                  }
              ]
          });
        }
        if(pix !== ''){
          merchantSplit.push({
            PaymentMethodCode: "6",
            IsSubaccountTaxPayer: true,
            Taxes: [
                  {
                      TaxTypeName: 2,
                      Tax: "0.20"
                  }
              ]
          });
        }
        const config  = {
          headers: {
            //token: window.sessionStorage.geyItem('accessToken')
            authorization: storagedToken ? 'bearer '+ storagedToken : 'Opa'
          }
        }
  
        let username = email;
        const isPanelRestricted = true;

        const data = {
            id: userId,
            active: true,
            firstName,
            surname,
            username,
            email,
            phoneNumber,
            merchant:{
              name,
              identity,
              commercialName,
              responsibleName,
              responsibleIdentity,
              isPanelRestricted,
              bankData:{
                bank:{
                  code : codeBank,
                },
                accountType:{
                  code : codeAccount,
                },
              bankAgency,
              bankAgencyDigit,
              bankAccount,
              bankAccountDigit,
              operation,
              },
            address:{
              street,
              number,
              district,
              zipCode,
              complement,
              cityName,
              stateInitials,
              countryName,
            },
            merchantSplit,
          }
        }
        const response = await api.put('User', data, config);
        if (response.status === 200) {
          toast.success('Update realizado', {autoClose:3000});
  
          //window.location.href = "./login";
          //navigate('/login');
        }else{
          toast.warning('Não foi possível realizar a alteração de cadastro, revise os dados informados e tente novamente.' +
          ' Caso o erro persista entre em contato conosco.', {autoClose:3000});
        }
  
      }




    async function userDataGet(){
      const config  = {
        headers: {
          //token: window.sessionStorage.geyItem('accessToken')
          authorization: storagedToken ? 'bearer '+ storagedToken : 'Opa'
        }
      }
      console.log(config)
      
      const response = await api.get('User', config);
      console.log(response);
      // setUserId(response.data.id)
      return response.data;
    }

    async function changePassword({oldPassword, newPassword, confirmNewPassword}: PasswordChange){
      const config  = {
        headers: {
          //token: window.sessionStorage.geyItem('accessToken')
          authorization: storagedToken ? 'bearer '+ storagedToken : 'Opa'
        }
      }
      
      const response = await api.post('Management/ChangePassword',{
        password: newPassword,
        oldPassword,
        passwordConfirmation: confirmNewPassword,
      }, config);
      return response.data;
    }

    async function addCampaign({title, description, image}: CampaignProps){

      const config  = {
        headers: {
          //token: window.sessionStorage.geyItem('accessToken')
          authorization: storagedToken ? 'bearer '+ storagedToken : 'Opa'
        }
      }
      const response = await api.post('DonationCampaign',{
        title,
        description,
        image,
      }, config)

      if(response.status === 200) {
        console.log(response.data)
        navigate('view_campaign/'+response.data);

      }
    }


    async function viewCampaign(hash: string ){
      var config = {
        params:{
          hash
        }
      }
      const response = await api.get("DonationCampaign", config)
      if(response.status === 200) {
        return response.data;
      }
       
    }

    const listGridByUserName = useCallback( async () => {
      
      const config  = {
        headers: {
          //token: window.sessionStorage.geyItem('accessToken')
          authorization: storagedToken ? 'bearer '+ storagedToken : 'Opa'
        }
      }

      const response = await api.get('DonationCampaign/ListGridByUserName', config)
      if(response.status !== 200) {
        console.log("erro");
      }
      console.log(response.data)
      return response.data;
    }, [storagedToken])

    async function editCampaign({title, description, image, hash}: CampaignReturnProps){

      const config  = {
        headers: {
          //token: window.sessionStorage.geyItem('accessToken')
          authorization: storagedToken ? 'bearer '+ storagedToken : 'Opa'
        }
      }
      const response = await api.put('DonationCampaign',{
        hash,
        title,
        isActive:true,
        description,
        image,
      }, config)
      if(response.status === 200) {
        navigate('view_campaign/'+hash);

      }
    }

    async function listGridByName(campaignName: string) {
      const config  = {
        headers: {
          //token: window.sessionStorage.geyItem('accessToken')
          authorization: storagedToken ? 'bearer '+ storagedToken : 'Opa'
        },
        params: {
          //token: window.sessionStorage.geyItem('accessToken')
          campaignName
        }
      }

      const response = await api.get('DonationCampaign/ListGridByName', config)
      if(response.status !== 200) {
        console.log("erro");
      }
      return response.data;
    }

    async function listGridSite(campaignName: string) {
      const config  = {
        
        params: {
          //token: window.sessionStorage.geyItem('accessToken')
          campaignName
        }
      }

      const response = await api.get('DonationCampaign/ListSite', config)
      if(response.status !== 200) {
        console.log("erro");
      }
      return response.data;
    }

    async function addPayment(data: Payment){
      const config  = {
        params: {
          //token: window.sessionStorage.geyItem('accessToken')
          hash: data.hash
        }
      }
      if(data.paymentMethod.code === '1'){
        console.log(data);
        const response = await api.post('Payment/AddTransactionBankSlip',data,config)

        console.log(response.data);
      }

      if(data.paymentMethod.code === '2'){
        console.log(data);
        const response = await api.post('Payment/AddTransactionCredit',data,config)

        console.log(response.data);
      }

      if(data.paymentMethod.code === '3'){
        console.log(data);
        const response = await api.post('Payment/AddTransactionCripto',data,config)

        console.log(response.data);
      }

      if(data.paymentMethod.code === '4'){
        console.log(data);
        const response = await api.post('Payment/AddTransactionDebit',data,config)

        console.log(response.data);
      }

      if(data.paymentMethod.code === '6'){
        console.log(data);
        const response = await api.post('Payment/AddTransactionPix',data,config)

        console.log(response.data);
      }
      
    }

    async function requestMethods(hash: string){
      const config  = {
        
        params: {
          //token: window.sessionStorage.geyItem('accessToken')
          hash
        }
      }
      const response = await api.get('payment/ListPaymentMethods', config);
      if(response.status === 200){
        console.log(response.data)
        return response.data;
      }
    }

  return (
    <AuthContext.Provider value={{requestMethods, addPayment, listGridSite, listGridByName, editCampaign, listGridByUserName, campaign, viewCampaign, signIn,setIsAuthenticated, addCampaign, isAuthenticated, forgetPassword, confirmCode, register, userDataGet, userUpdate, changePassword }}>
      {children}
    </AuthContext.Provider>
  )

}