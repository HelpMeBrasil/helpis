import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import Form, { Button, FormContainer, Input, Label, Title } from "../../../components/form";
import { AuthContext } from "../../../context/AuthContext";


export function ChangePassword() {
  const { changePassword } = useContext(AuthContext);
  const [oldPassword, setOldPassowrd] = useState('');
  const [newPassword, setNewPassowrd] = useState('');
  const [confirmNewPassword, setConfirmNewPassowrd] = useState('');
  
  async function handleSubmit(event: FormEvent){
    if(newPassword === confirmNewPassword){
      const data = {
        oldPassword,
        newPassword,
        confirmNewPassword,
      }
      await changePassword(data);
    }else{
      toast.warning('Confirmação de senha incorreta')
    }
  }
  
  return(
     
    <FormContainer>
      <Title tag="h1" onClassName="title_h1" value="Alterar sua senha"/>
      <Form onSubmit={handleSubmit}>
        <Label valueName="Senha antiga"/>
        <Input value={oldPassword} onSetState={setOldPassowrd} type="text" placeholder="Digite sua senha antiga"/>
        <Label valueName="Nova senha"/>
        <Input value={newPassword} onSetState={setNewPassowrd} type="text" placeholder="Digite sua nova senha"/>
        <Label valueName="Confirmar nova senha"/>
        <Input value={confirmNewPassword} onSetState={setConfirmNewPassowrd} type="text" placeholder="Digite sua senha antiga"/>
        <Button value="Alterar"/>
      </Form>
    </FormContainer>
  )
}