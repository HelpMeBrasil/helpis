import { useState } from "react";
import { Link } from "react-router-dom";
import  Form, {Button, FormContainer, Input, Label,Title}  from "../../components/form";

export const Forget_password= (): JSX.Element =>{
  const [email, setEmail] = useState('');

  return(
    <FormContainer>
      <Form>
        <Title tag="h1" onClassName="title_h1" value="Recupera senha"/>
        <Label valueName="Email"/>
        <Input value={email} onSetState={setEmail} type="text" placeholder="Digite seu email"/>
        <Link to="/login" className="forgot-password">
        <Button value="Recuperar"/>
        </Link>
      </Form>
    </FormContainer>
  )
}