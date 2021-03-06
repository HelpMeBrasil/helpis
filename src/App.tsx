import { Header } from "./components/header/header";
import { Footer } from "./components/footer/Footer";
import { AuthProvider } from "./context/AuthContext";
import { MenuModal } from './components/MenuModal';
import { useState } from "react";
import { Rotas } from "./routes";
import './styles/global.scss';

import { BrowserRouter } from "react-router-dom";


function App() {
  const [isMenuModalOpen, setIsMenuModalOpen ] = useState(false);
    
  function handleOpenMenuModal(){
    setIsMenuModalOpen(true);
  }

  function handleCloseMenuModal(){
    setIsMenuModalOpen(false);
  }

  function handleCloseHeaderMenuModal(){
    if(isMenuModalOpen===true){
      setIsMenuModalOpen(false);
    }
  }

  return (
   <>
   <BrowserRouter>
    <AuthProvider>
      <Header onOpenMenuModal={handleOpenMenuModal} handleCloseHeaderMenuModal={handleCloseHeaderMenuModal}/>
      <Rotas/>
      <MenuModal
      isOpen={isMenuModalOpen}
      onRequestClose={handleCloseMenuModal}/>
      <div style={{height: 1}}></div>
      <Footer/>
    </AuthProvider>
   </BrowserRouter>
   </>
  );
}

export default App;
