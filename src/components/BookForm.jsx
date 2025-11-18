// src/components/BookForm.jsx
import React, { useState, useEffect } from 'react';
import Input from './Input.jsx'; 
import { addBook, updateBook } from '../services/bookService';

const BookForm = ({ bookToEdit, onSuccess, onClose }) => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    publishedDate: '',
    description: '',
    ...bookToEdit 
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!book.title || !book.author) {
      setError('O título e o autor são obrigatórios.');
      return;
    }

    try {
      if (bookToEdit && bookToEdit.id) {
        updateBook(book);
      } else {
        addBook(book);
      }
      
      onSuccess(); 
      onClose();
    } catch (err) {
      setError('Erro ao salvar o livro. Tente novamente.');
    }
  };

  return (
    <div 
      className="glass-effect" 
      style={{ 
        maxWidth: '500px', 
        margin: '50px auto', 
        padding: '20px' 
      }} 
    >
      <h3>{bookToEdit ? 'Editar Livro' : 'Adicionar Novo Livro'}</h3>
      <form onSubmit={handleSubmit}>
        
        {}
        <Input
          label="Título"
          type="text"
          name="title" 
          value={book.title}
          onChange={handleChange}
        />
        <Input
          label="Autor(es)"
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
        />
        <Input
          label="Data de Publicação"
          type="text"
          name="publishedDate"
          value={book.publishedDate}
          onChange={handleChange}
        />
        
        {}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Descrição</label>
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            rows="4"
            style={{ 
              padding: '10px', 
              width: '100%', 
              boxSizing: 'border-box', 
              background: 'rgba(255, 255, 255, 0.1)', 
              color: '#E0E0E0',
              border: '1px solid #4CAF50',
              borderRadius: '4px' 
            }}
          ></textarea>
        </div> 
        
        {error && <p style={{ color: '#FF7043' }}>{error}</p>}
        
        {}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', gap: '10px' }}>
          <button 
            type="button" 
            onClick={onClose}
            className="btn-secondary"
            style={{ flexGrow: 1 }}
          >
            Cancelar
          </button>
          <button 
            type="submit"
            className="btn-primary"
            style={{ flexGrow: 1 }}
          >
            {bookToEdit ? 'Salvar Edição' : 'Adicionar Livro'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;