import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import Form, { Button, FormContainer, Input, Label, Title } from "../../../components/form";
import { AuthContext } from "../../../context/AuthContext";
import './styles.scss';

export function ChangePassword() {
  const { changePassword } = useContext(AuthContext);
  const [oldPassword, setOldPassowrd] = useState('');
  const [newPassword, setNewPassowrd] = useState('');
  const [confirmNewPassword, setConfirmNewPassowrd] = useState('');
  async function handleSubmit(event: FormEvent){
    event.preventDefault();
    
    if(newPassword === confirmNewPassword){
      const data = {
        oldPassword,
        newPassword,
        confirmNewPassword,
      }
      await changePassword(data);

      setOldPassowrd('');
      setNewPassowrd('');
      setConfirmNewPassowrd('');
    }else{
      toast.warning('Confirmação de senha incorreta', {autoClose:3000})
    }
  }
  
  return(
    <div className="formChangePassword">
    <FormContainer>
      <Title tag="h1" onClassName="title_h1" value="Alterar sua senha"/>
      <Form onSubmit={handleSubmit}>
        <Label valueName="Senha antiga"/>
        <Input  value={oldPassword} onSetState={setOldPassowrd} type="password" placeholder="Digite sua senha antiga"/>
        <Label valueName="Nova senha"/>
        <Input value={newPassword} onSetState={setNewPassowrd} type="password" placeholder="Digite sua nova senha"/>
        <Label valueName="Confirmar nova senha"/>
        <Input value={confirmNewPassword} onSetState={setConfirmNewPassowrd} type="password" placeholder="Digite sua senha antiga"/>
        <div className="passwordRequirements">
          <p>A senha deve possuir no mínimo 8 caracteres.</p>
          <p>A senha deve conter ao menos um número.</p>
          <p>A senha deve conter ao menos uma letra maiúscula.</p>
          <p>A senha deve conter ao menos uma letra minúscula.</p>
          <p>A senha deve conter ao menos um caracter especial.</p>
        </div>
        <Button value="Alterar"/>
      </Form>
    </FormContainer>
    </div>
  )
}