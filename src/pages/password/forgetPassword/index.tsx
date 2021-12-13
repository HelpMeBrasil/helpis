import { FormEvent, useContext, useState } from "react";
import Form, { Button, FormContainer, Input, Label, Title } from "../../../components/form";
import { AuthContext } from "../../../context/AuthContext";


export function ForgetPassword(){

  const { forgetPassword } = useContext(AuthContext);
  const [username, setUsername] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      username
    }

    await forgetPassword(data);

  }
  return(
    <FormContainer>
      <Title tag="h1" onClassName="title_h1" value="Recuperar senha"/>
      <Form onSubmit={handleSubmit}>
        <Label valueName="Email"/>
        <Input value={username} onSetState={setUsername} type="text" placeholder="Digite seu email"/>
        <Button value="Recuperar"/>
      </Form>
    </FormContainer>
  )
}