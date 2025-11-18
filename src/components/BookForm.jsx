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
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '500px', margin: '20px auto', backgroundColor: '#f9f9f9' }}>
      <h3>{bookToEdit ? 'Editar Livro' : 'Adicionar Novo Livro'}</h3>
      <form onSubmit={handleSubmit}>
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
        <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Descrição</label>
        <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            rows="4"
            style={{ padding: '10px', width: '100%', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
        ></textarea>
        </div>  
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button 
            type="button" 
            onClick={onClose}
            style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Cancelar
          </button>
          <button 
            type="submit"
            style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {bookToEdit ? 'Salvar Edição' : 'Adicionar Livro'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;