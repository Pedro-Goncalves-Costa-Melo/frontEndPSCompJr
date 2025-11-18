// src/components/Input.jsx
import React from 'react';

const Input = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ padding: '10px', width: '100%', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
      />
    </div>
  );
};

export default Input;