import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

import Login from './pages/Login';


export const Rotas = (): JSX.Element => {
  return (
      <Routes>
        <Route path="/login"  element={<Login/>} />
        <Route path="/" />
      </Routes>
  );
};