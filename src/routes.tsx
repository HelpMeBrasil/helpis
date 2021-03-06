import {Routes, Route } from 'react-router-dom';
import { ForgetPassword } from './pages/password/forgetPassword';
import { ResetPassword } from './pages/password/recoveryPassword';
import Login from './pages/login';
import { Register } from './pages/register';
import { UserData } from './pages/userData';
import { ChangePassword } from './pages/password/changePassword';
import { NewCampaign } from './pages/Campaign/NewCampaign';
import { ViewCampaign } from './pages/Campaign/ViewCampaign';
import { CampaignsByUserName } from './pages/Campaign/campaignsByUserName';
import { EditCampaign } from './pages/Campaign/editCampaign';
import { CampaignsName } from './pages/Campaign/campaignsByName';
import { Payment } from './pages/Payments/addPayment';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Home } from './pages/home';

import { NotFound } from './pages/Campaign/notFound';
import { PaymentSucess } from './pages/Payments/paymentSucess';


export const Rotas = (): JSX.Element => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
      <Routes>
        {isAuthenticated === true ? 
        <>
          <Route path="/user_data" element={<UserData/>} />
          <Route path="/change_password" element={<ChangePassword/>} />
          <Route path="/new_campaign" element={<NewCampaign/>} /> 
          <Route path="/minhas_campanhas" element={<CampaignsByUserName/>} />
          <Route path="/editar_campanha/:hash" element={<EditCampaign/>} />
          </> : ''
        }
        <Route path="/login"  element={<Login/>} />
        <Route path="/forget_password" element={<ForgetPassword/>} />
        <Route path="/reset_password" element={<ResetPassword/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/ver_campanha/:hash" element={<ViewCampaign/>} />
        <Route path="/campanhas_nome/:campaignName" element={<CampaignsName/>} />
        <Route path="/payment/:hash" element={<Payment/>} />
        <Route path="/paymentSucess" element={<PaymentSucess/>} />
        <Route path="/nao_encontrado" element={<NotFound/>} />
        <Route path="/" element={<Home/>} />
        <Route path="" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/pagina_inicial" element={<Home/>} />
        <Route path="/*" element={<NotFound/>} />

      </Routes>
  );
};