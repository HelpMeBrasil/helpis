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


  async function confirmCode({confirmationCode}: ConfirmCode) {
    console.log(username);

    const response = await api.post('Recovery/Confirmation', {
      username,
      confirmationCode
  })

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