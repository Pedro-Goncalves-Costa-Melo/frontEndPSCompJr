// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService'; 
import { initializeBooks, getBooks } from '../services/bookService';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      const initialData = await initializeBooks(); 
      
      const currentBooks = getBooks();
      setBooks(currentBooks);
      setLoading(false);
    };

    loadBooks();
  }, []); 

  const handleLogout = () => {
    logout(); 
    navigate('/');
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Carregando Livros...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
        <h2>Minha Biblioteca ({books.length} Livros)</h2>
        <button 
          onClick={handleLogout}
          style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Sair
        </button>
      </header>

      <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {books.map(book => (
          <div key={book.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            {book.thumbnail && <img src={book.thumbnail} alt={`Capa de ${book.title}`} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />}
            <h3>{book.title}</h3>
            <p><strong>Autor:</strong> {book.author}</p>
            <p><strong>Publicação:</strong> {book.publishedDate}</p>
          </div>
        ))}
      </div>
      
      {books.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '50px' }}>Nenhum livro encontrado. Tente adicionar um!</p>
      )}
    </div>
  );
};

export default HomePage;