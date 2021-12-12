import { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import "./styles.scss"
import  Form, {Button, FormContainer, Input, Label,Title}  from "../../components/form";

 const Login = (): JSX.Element =>{
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useContext(AuthContext);


    async function handleSubmit(event: FormEvent) {
      event.preventDefault();
      const data = {
        username,
        password,
      }
      await signIn(data);
    }
    
    return(
     
        <FormContainer>
          <Title tag="h1" onClassName="title_h1" value="Bem vindo ao Helpis"/>
          <Title tag="h2" onClassName="title_h2" value="Acessar sua conta"/>
          <Form onSubmit={handleSubmit}>
                <Label valueName="Username"/>
                <Input value={username} onSetState={setEmail} type="text" placeholder="Digite seu usuario"/>
                <Label valueName="Senha"/>
                <Input value={password} onSetState={setPassword} type="password" placeholder="Digite sua senha"/>
                <Link to="/forget_password" className="forgot_password">Esqueceu a senha ?</Link>
                <Button value="Acessar"/>
          </Form>
          </FormContainer>
    )
}

export default  Login;