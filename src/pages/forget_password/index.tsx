import { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "../../components/form";
import { Button } from "../../components/formButton";
import { FormContainer } from "../../components/formContent";
import { Input } from "../../components/formInput";
import { Paragraph } from "../../components/formParagraph";
import { Title } from "../../components/formTitle";

export const ForgetPassword= (): JSX.Element =>{
  const [email, setEmail] = useState('');

  return(
    <FormContainer>
      <Title tag="h1" onClassName="title_h1" value="Recuperar senha"/>
      <Form>
        <Paragraph valueName="Email"/>
        <Input value={email} onSetState={setEmail} type="text" placeholder="Digite seu email"/>
        <Link to="/login" className="forgot-password">
        <Button value="Recuperar"/>
        </Link>
      </Form>
    </FormContainer>
  )
}