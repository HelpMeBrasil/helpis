import { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "../../components/form";
import { AuthContext } from "../../context/AuthContext";
import "./style.scss"

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
     
        <div className="login">
          <h1 className="login__welcome">Bem vindo ao Helpis</h1>
          <h2 className="login__title">Acessar sua conta</h2>
          <Form onSubmit={handleSubmit}>
                <p className="login__paragraphs">Email</p>
                <input value={username} onChange={e => setEmail(e.target.value)} className="login__input" type="email" placeholder="Digite seu email" />
                <p className="login__paragraphs">Senha</p>
                <input value={password} onChange={e => setPassword(e.target.value)} className="login__input" type="password" placeholder="Digite sua senha" />
                <Link to="/forget_password" className="login__forgot-password">Esqueceu a senha ?</Link>
                <button className="login__button" type="submit">Acessar</button>
          </Form>
        </div>
    )
}

export default  Login;