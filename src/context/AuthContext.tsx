import { createContext, ReactNode, useState } from "react";
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
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
  identity: string;
  active: boolean;
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

type PasswordChange = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

type UserUpdate = Omit<RegisterProps, 'password'>;

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  forgetPassword(emailForRecovery: ForgetPassword): Promise<void>;
  confirmCode(codeRecovery: ConfirmCode): Promise<void>;
  register(propsRegister: RegisterProps): Promise<void>;
  userDataGet(): Promise<UserProps>;
  userUpdate(propsUpdate: UserUpdate): Promise<void>;
  changePassword(propsChangePassword: PasswordChange): Promise<void>;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [username, setUsername] = useState('');
  const isAuthenticated = false;
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
              Code : codeBank,
            },
            accountType:{
              Code : codeAccount,
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
      firstName, surname, email, phoneNumber, identity, name, commercialName, active, responsibleName, responsibleIdentity, codeBank,
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
        const config  = {
          headers: {
            //token: window.sessionStorage.geyItem('accessToken')
            authorization: storagedToken ? 'bearer '+ storagedToken : 'Opa'
          }
        }
  
        let username = email;
        const isPanelRestricted = true;
        const response = await api.put('User',{
          firstName,
          surname,
          username,
          email,
          active,
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
                Code : codeBank,
              },
              accountType:{
                Code : codeAccount,
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
      }, config);
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
      
      const response = await api.get('User', config);
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

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, forgetPassword, confirmCode, register, userDataGet, userUpdate, changePassword }}>
      {children}
    </AuthContext.Provider>
  )

}