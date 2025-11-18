// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/**/}
      <App>
        <Routes>
          {/* */}
          <Route path="/" element={<LoginPage />} />
          
          {/* */}
          {/* */}
          <Route element={<PrivateRoute />}>
             <Route path="/home" element={<HomePage />} />
             {/*  */}
          </Route>
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>,
);