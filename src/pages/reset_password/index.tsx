import { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Form, { Button, FormContainer, Input, Label, Title } from "../../components/form";
import { AuthContext } from "../../context/AuthContext";

export function ResetPassword(){
  const [confirmationCode, setconfirmationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { confirmCode } = useContext(AuthContext);



  async function handleConfirmationCode(event: FormEvent) {
    event.preventDefault();
    const data = {
      confirmationCode
    }

    await confirmCode(data);

  }



  return(
    <FormContainer>
      <Title tag="h1" onClassName="title_h1" value="Recuperar senha"/>
      <Form onSubmit={handleConfirmationCode}>
        <Label valueName="Codigo"/>
        <Input value={confirmationCode} onSetState={setconfirmationCode} type="text" placeholder="Digite sua nova senha"/>
        <Label valueName="Nova senha"/>
        <Input value={password} onSetState={setPassword} type="text" placeholder="Digite sua nova senha"/>
        <Label valueName="Confirmar senha"/>
        <Input value={confirmPassword} onSetState={setConfirmPassword} type="text" placeholder="Confirme sua nova senha"/>
        <Button value="Recuperar"/>
      </Form>
    </FormContainer>
  )
}