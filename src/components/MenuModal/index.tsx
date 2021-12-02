import Modal from 'react-modal';
import './style.scss';
import 'antd/lib/menu/style/index.css';
import { Link } from 'react-router-dom';
Modal.setAppElement('#root');
interface MenuModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
export function MenuModal({ isOpen, onRequestClose} : MenuModalProps){
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
    >
      <div className="menu">
      <Link  className="menu__link" to="/login">Logar</Link>
      <Link  className="menu__link" to="/cadastrar">Cadastrar</Link>
      </div>
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