import { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";

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
  identityCompany: string;
  responsibleName: string;
  responsibleIdentity: string;
  emailCompany: string;
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

    if (response.status !== 200) {
      console.log(response.data);
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
      console.log(response.data);
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
      console.log(responseRecover.data);
    }
  }

  if (response.status !== 200) {
    console.log(response.data);
  }
    
  }

  async function register({ 
    firstName, surname, email, phoneNumber, password, identity, name, commercialName, identityCompany, responsibleName, responsibleIdentity, emailCompany, codeBank,
    codeAccount, bankAgency, bankAgencyDigit, bankAccount, bankAccountDigit, operation, street, number, district, zipCode, complement, cityName, stateInitials,
    countryName, boleto, credito, cripto, debito, pix}: RegisterProps)  {
      let merchantSplit = [{}];
      if(boleto !== ''){
        merchantSplit.push({
          PaymentMethodCode: "1",
          IsSubaccountTaxPayer: true,
          Taxes: [
                {
                    TaxTypeName: "2",
                    Tax: "0.20"
                }
            ]
        });
      }
      if(credito === ''){
        merchantSplit.push({
          PaymentMethodCode: "1",
          IsSubaccountTaxPayer: true,
          Taxes: [
                {
                    TaxTypeName: "2",
                    Tax: "0.20"
                }
            ]
        });
      }
      if(cripto === ''){
        merchantSplit.push({
          PaymentMethodCode: "1",
          IsSubaccountTaxPayer: true,
          Taxes: [
                {
                    TaxTypeName: "2",
                    Tax: "0.20"
                }
            ]
        });
      }
      if(debito === ''){
        merchantSplit.push({
          PaymentMethodCode: "1",
          IsSubaccountTaxPayer: true,
          Taxes: [
                {
                    TaxTypeName: "2",
                    Tax: "0.20"
                }
            ]
        });
      }
      if(pix === ''){
        merchantSplit.push({
          PaymentMethodCode: "1",
          IsSubaccountTaxPayer: true,
          Taxes: [
                {
                    TaxTypeName: "2",
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
        identity,
        merchant:{
          name,
          commercialName,
          identityCompany,
          responsibleName,
          responsibleIdentity,
          emailCompany,
          isPanelRestricted,
          bankData:{
            bank:{
              codeBank,
            },
            accountType:{
              codeAccount,
            },
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
      })

      if (response.status !== 200) {
        console.log(response.data);
      }

    }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, forgetPassword, confirmCode, register }}>
      {children}
    </AuthContext.Provider>
  )

}