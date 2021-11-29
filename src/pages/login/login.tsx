import { useState } from "react";
import "./style.scss"

export function Login() {
    const [login, setLogin] = useState('');


    return(
        <div className="login">
            <form className="login__form">
                <input className="login__user" type="text" placeholder="usuário" />
                <input className="login__password" type="password" placeholder="Senha" />
                <a href="" className="login__forgot-password">Esqueceu a senha ?</a>
            </form>
        </div>
    )
}