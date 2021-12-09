import logo from '../../assets/logo.svg';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



interface HeaderProps{
  onOpenMenuModal: () => void;
  handleCloseHeaderMenuModal: () => void;
}

export function Header({onOpenMenuModal, handleCloseHeaderMenuModal}: HeaderProps){
  //const [login, setLogin] = useState("");
  const [name, setName] = useState("");
  const navigate  = useNavigate();

  function handleKeyPress(e: React.KeyboardEvent<HTMLDivElement>){
  if(e.key === 'Enter'){
    navigate('campanhas_nome/'+name);
  }
  }
 //<p className="header__loggin">{login}</p>
  return (
    <div className="header" onClick={handleCloseHeaderMenuModal}>
        <Link className="header__link"to="/"> 
        <img className="header__img" src={logo} alt="helpis"/> 
        <p className="header__title"> Helpis </p>
        </Link>

        <input onKeyPress={handleKeyPress}  value={name} onChange={(e) => setName(e.target.value) } className="header__search" type="text" placeholder="Pesquisar campanhas"></input>
        
       
        <FontAwesomeIcon onClick={onOpenMenuModal} className="header__icon" icon={faBars}/>
    
    
    </div>
  );
}