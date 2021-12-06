import {Routes, Route } from 'react-router-dom';
import { ForgetPassword } from './pages/password/forgetPassword';
import { ResetPassword } from './pages/password/recoveryPassword';
import Login from './pages/login';
import { Register } from './pages/register';
import { UserData } from './pages/userData';
import { ChangePassword } from './pages/password/changePassword';
import { NewCampaign } from './pages/campaign/NewCampaign';
import { ViewCampaign } from './pages/campaign/ViewCampaign';
import { CampaignsByUserName } from './pages/campaign/campaignsByUserName';


export const Rotas = (): JSX.Element => {
  return (
      <Routes>
        <Route path="/login"  element={<Login/>} />
        <Route path="/forget_password" element={<ForgetPassword/>} />
        <Route path="/reset_password" element={<ResetPassword/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/user_data" element={<UserData/>} />
        <Route path="/change_password" element={<ChangePassword/>} />
        <Route path="/new_campaign" element={<NewCampaign/>} />
        <Route path="/view_campaign/:hash" element={<ViewCampaign/>} />
        <Route path="/minhas_campanhas" element={<CampaignsByUserName/>} />
      </Routes>
  );
};