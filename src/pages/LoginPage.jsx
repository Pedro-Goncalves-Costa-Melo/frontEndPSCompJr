// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import RegisterForm from '../components/RegisterForm'; 
import { login, isAuthenticated } from '../services/authService';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoginView, setIsLoginView] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (login(email, password)) {
      navigate('/home');
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  const toggleForm = (formType) => {
    setIsLoginView(formType === 'login');
    setError('');
  };

  if (!isLoginView) {
    return <RegisterForm toggleForm={toggleForm} />;
  }

  return (
    <div className="glass-effect" style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu.email@exemplo.com"
        />
        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
        />
        {error && <p style={{ color: '#FF7043' }}>{error}</p>} {/* Erro em tom de atenção */}
        <button type="submit" style={{ backgroundColor: '#4CAF50', color: '#121212', width: '100%' }}>
          Entrar
        </button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Ainda não tem conta?{' '}
        <a href="#" onClick={() => toggleForm('register')} style={{ color: '#4CAF50' }}>
          Clique aqui para Registrar
        </a>
      </p>
    </div>
  );
};

export default LoginPage;