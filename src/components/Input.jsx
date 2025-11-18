// src/components/Input.jsx
import React from 'react';

const Input = ({ label, type, value, onChange, placeholder, name }) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ 
          padding: '10px', 
          width: '100%', 
          boxSizing: 'border-box', 
          background: 'rgba(255, 255, 255, 0.1)', 
          color: '#E0E0E0',
          border: '1px solid #4CAF50', 
          borderRadius: '4px' 
        }}
      />
    </div>
  );
};

export default Input;