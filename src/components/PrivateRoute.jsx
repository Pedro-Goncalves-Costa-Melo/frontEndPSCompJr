import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

/**
 * Componente que protege rotas
 * Usa o Outlet para renderizar os componentes 
 */
const PrivateRoute = () => {
  const auth = isAuthenticated();
  
  if (auth) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default PrivateRoute;