import logo from '../../assets/logo.svg';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { Link } from 'react-router-dom';



interface HeaderProps{
  onOpenMenuModal: () => void;
  handleCloseHeaderMenuModal: () => void;
}

export function Header({onOpenMenuModal, handleCloseHeaderMenuModal}: HeaderProps){
  const [login, setLogin] = useState("");
  return (
    <div className="header" onClick={handleCloseHeaderMenuModal}>
        <Link className="ant-menu-item-selected header__link"to="/"> 
        <img className="header__img" src={logo} alt="helpis"/> 
        <p className="header__title"> Helpis </p>
        </Link>

        
        
        <input className="header__search" type="text" placeholder="Pesquisar campanhas"></input>
        <p className="header__loggin">{login}</p>
        <FontAwesomeIcon onClick={onOpenMenuModal} className="header__icon" icon={faBars}/>
    
    
    </div>
  );
}