import {Routes, Route } from 'react-router-dom';
import { ForgetPassword } from './pages/forget_password';

import Login from './pages/login';


export const Rotas = (): JSX.Element => {
  return (
      <Routes>
        <Route path="/login"  element={<Login/>} />
        <Route path="/forget_password" element={<ForgetPassword/>} />
      </Routes>
  );
};