import { FormEvent, useContext, useState } from "react";
import Form, { Button, FormContainer, Input, Label, Title } from "../../components/form";
import { AuthContext } from "../../context/AuthContext";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

export function ResetPassword(){
  const [confirmationCode, setconfirmationCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const { confirmCode } = useContext(AuthContext);



  async function handleConfirmationCode(event: FormEvent) {
    event.preventDefault();
    const data = {
      confirmationCode,
      password,
      passwordConfirmation
    }

    await confirmCode(data);

  }

  return(
    <FormContainer>
      <Title tag="h1" onClassName="title_h1" value="Resetar sua senha"/>
      <Form onSubmit={handleConfirmationCode}>
      <Label valueName="Enviamos um e-mail para você, verifique sua caixa de entrada e confirme o código abaixo:"/>
        <Label valueName="Codigo"/>
        <Input value={confirmationCode} onSetState={setconfirmationCode} type="text" placeholder="Digite o codigo recebido no seu email"/>
        <Label valueName="Nova senha"/>
        <Input value={password} onSetState={setPassword} type="password" placeholder="Digite sua nova senha"/>
        <Label valueName="Confirmar senha"/>
        <Input value={passwordConfirmation} onSetState={setPasswordConfirmation} type="password" placeholder="Confirme sua nova senha"/>
        <Button value="Recuperar"/>
      </Form>
    </FormContainer>
  )
}