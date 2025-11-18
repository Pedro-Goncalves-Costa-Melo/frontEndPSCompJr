// src/pages/HomePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm.jsx';
import { initializeBooks, getBooks, deleteBook } from '../services/bookService'; 
import { logout } from '../services/authService'; 

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const navigate = useNavigate();

  const loadBooks = useCallback(async () => {
    setLoading(true);
    await initializeBooks(); 
    setBooks(getBooks());
    setLoading(false);
  }, []);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const handleLogout = () => {
    logout(); 
    navigate('/');
  };

  const handleCreate = () => {
    setEditingBook(null); 
    setIsFormOpen(true);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      deleteBook(id);
      loadBooks(); 
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Carregando Livros...</h2>
      </div>
    );
  }
  
  if (isFormOpen) {
    return (
      <BookForm 
        bookToEdit={editingBook} 
        onSuccess={() => { loadBooks(); }} 
        onClose={() => setIsFormOpen(false)} 
      />
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
        <h2>Minha Biblioteca ({books.length} Livros)</h2>
        <div>
          <button 
            onClick={handleCreate}
            style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
          >
            + Adicionar Livro
          </button>
          <button 
            onClick={handleLogout}
            style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Sair
          </button>
        </div>
      </header>

      <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {books.map(book => (
          <div key={book.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', boxShadow: book.status === 'LOCAL' ? '0 0 5px rgba(0, 123, 255, 0.5)' : 'none' }}>
            <div style={{ float: 'right', fontSize: '0.8em', color: book.status === 'LOCAL' ? '#007bff' : '#6c757d' }}>
                {book.status === 'LOCAL' ? 'Local' : 'API'}
            </div>
            {book.thumbnail && <img src={book.thumbnail} alt={`Capa de ${book.title}`} style={{ width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover', marginBottom: '10px' }} />}
            <h3>{book.title}</h3>
            <p><strong>Autor:</strong> {book.author}</p>
            <p><strong>Publicação:</strong> {book.publishedDate}</p>
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => handleEdit(book)}
                style={{ padding: '8px 12px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', flexGrow: 1 }}
              >
                Editar
              </button>
              <button 
                onClick={() => handleDelete(book.id)}
                style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', flexGrow: 1 }}
              >
                Excluir
              </button>
            </div>
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