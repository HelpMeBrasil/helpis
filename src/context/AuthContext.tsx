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

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  forgetPassword(emailForRecovery: ForgetPassword): Promise<void>;
  confirmCode(codeRecovery: ConfirmCode): Promise<void>;
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
  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, forgetPassword, confirmCode }}>
      {children}
    </AuthContext.Provider>
  )

}