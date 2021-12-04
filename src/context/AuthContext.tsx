import { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  forgetPassword(emailForRecovery: ForgetPassword): Promise<void>;
  confirmCode(codeRecovery: ConfirmCode): Promise<void>;
  register(propsRegister: RegisterProps): Promise<void>;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [username, setUsername] = useState('');
  const isAuthenticated = false;


  async function signIn({ username, password }: SignInCredentials) {
    const response = await api.post('Auth', {
      username,
      password
    })

    if (response.status == 200) {
      toast.success('Sucesso!', {autoClose:3000});

      window.sessionStorage.setItem('accessToken', response.data.accessToken);
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

      if (response.status == 200) {
        toast.success('teste', {autoClose:3000});

        window.location.href = "./login";
      }else{
        toast.warning('Não foi possível realizar o cadastro, revise os dados informados e tente novamente.' +
        ' Caso o erro persista entre em contato conosco.', {autoClose:3000});
      }

    }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, forgetPassword, confirmCode, register }}>
      {children}
    </AuthContext.Provider>
  )

}