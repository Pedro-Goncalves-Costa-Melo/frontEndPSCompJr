// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import { register } from '../services/authService';

const RegisterForm = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('A senha e a confirmação de senha não coincidem.');
      return;
    }

    if (register(email, password)) {
      navigate('/home');
    } else {
      setError('Preencha todos os campos para se registrar.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
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
          placeholder="Mínimo 6 caracteres"
        />
        <Input
          label="Confirmar Senha"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repita a senha"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '10px' }}>
          Registrar
        </button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Já tem conta?{' '}
        <a href="#" onClick={() => toggleForm('login')} style={{ color: '#007bff', cursor: 'pointer' }}>
          Clique aqui para Login
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;