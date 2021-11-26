import logo from '../../assets/logo.svg';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
export function Header(){
  const [login, setLogin] = useState("");

  const logar = (logar: boolean) => {
    if(logar === true){
      setLogin("Ola Jeferson");
      console.log(login);
    }else{
      setLogin("Entrar/Cadastrar")
      console.log(login);
    }
  }
  return (
    <div className="header">
        <img className="header__img" src={logo} alt="helpis"/> 
        <p className="header__title"> Helpis </p>
        <input className="header__search" type="text" placeholder="Pesquisar campanhas"></input>
        <p className="header__loggin">{login}</p>
        <FontAwesomeIcon onClick={() => logar(true)} className="header__icon" icon={faBars}/>
    </div>
  );
}