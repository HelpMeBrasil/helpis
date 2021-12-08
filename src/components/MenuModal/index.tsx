
import './style.scss';
import 'antd/lib/menu/style/index.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import  Modal  from 'react-modal';
Modal.setAppElement('body');
interface MenuModalProps {
  
  isOpen: boolean;
  onRequestClose: () => void;
}
export function MenuModal({ isOpen, onRequestClose} : MenuModalProps){
  let { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const menuNotLogged = () => {
      if(isAuthenticated === false){
        return(
        <div className="menu">
        <Link onClick={() => handleCloseLink()} className="menu__link" to="/login">Logar</Link>
        <Link onClick={() => handleCloseLink()} className="menu__link" to="/register">Cadastrar</Link>
        </div>
        )
      } 
    }

    function logoff() {
      sessionStorage.removeItem('accessToken');
      setIsAuthenticated(false);
      handleCloseLink();
    }

    function handleCloseLink(){
      onRequestClose();
    }
    const menuLogged = () => {
      if(isAuthenticated === true){
        return(
        <div className="menu">
        <Link  className="menu__link" to="/minhas_campanhas" onClick={() => handleCloseLink() }>Minhas campanhas</Link>
        <Link  className="menu__link" to="/user_data" onClick={() => handleCloseLink() }>Dados do usuario</Link>
        <Link  className="menu__link" to="/change_password"onClick={() => handleCloseLink() }>Mudar senha</Link>
        <Link  className="menu__link" to="/new_campaign"onClick={() => handleCloseLink() }>Criar campanha</Link>
        <Link  onClick={logoff} className="menu__link" to="/">Deslogar</Link>
        </div>
        )
      } 
    }

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
    >
      {menuNotLogged()}
      {menuLogged()}
  
    {/* <Menu
          mode="inline"
          theme="light"
          className="menu"
        >
          <Menu.Item className="menu__item" key="1" icon={<PieChartOutlined />}>
            <Link className="menu__link" to="/login">Logar</Link>
          </Menu.Item>
          <Menu.Item className="menu__item" key="2" icon={<DesktopOutlined />}>
            Cadastrar
          </Menu.Item>
    </Menu> */}
    </Modal>
  );
};