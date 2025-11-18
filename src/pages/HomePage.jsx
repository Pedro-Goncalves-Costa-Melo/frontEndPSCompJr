// src/pages/HomePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm.jsx';
import { initializeBooks, getBooks, deleteBook } from '../services/bookService'; 
import { logout } from '../services/authService'; 
import '../styles/HomePage.css';

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
            <div className="container" style={{ textAlign: 'center' }}>
                <h2>Carregando Livros...</h2>
            </div>
        );
    }
    
    if (isFormOpen) {
        return (
            <div className="container">
                <BookForm 
                    bookToEdit={editingBook} 
                    onSuccess={() => { loadBooks(); }} 
                    onClose={() => setIsFormOpen(false)} 
                />
            </div>
        );
    }

    return (
        <div className="container">
            <header className="header">
                <h2>Minha Biblioteca ({books.length} Livros)</h2>
                <div className="button-group">
                    <button 
                        onClick={handleCreate}
                        style={{ backgroundColor: '#28a745', color: 'white' }}
                    >
                        + Adicionar Livro
                    </button>
                    <button 
                        onClick={handleLogout}
                        style={{ backgroundColor: '#dc3545', color: 'white' }}
                    >
                        Sair
                    </button>
                </div>
            </header>

            <div className="book-grid">
                {books.map(book => (
                    <div 
                        key={book.id} 
                        className={`book-card ${book.status === 'LOCAL' ? 'local' : ''}`}
                    >
                        <span className="book-status">
                            {book.status === 'LOCAL' ? 'Local' : 'API'}
                        </span>
                        
                        {book.thumbnail && <img src={book.thumbnail} alt={`Capa de ${book.title}`} style={{ width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover', marginBottom: '10px' }} />}
                        
                        <h3>{book.title}</h3>
                        <p><strong>Autor:</strong> {book.author}</p>
                        <p><strong>Publicação:</strong> {book.publishedDate}</p>
                        
                        <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                            <button 
                                onClick={() => handleEdit(book)}
                                style={{ backgroundColor: '#ffc107', color: 'black', flexGrow: 1 }}
                            >
                                Editar
                            </button>
                            <button 
                                onClick={() => handleDelete(book.id)}
                                style={{ backgroundColor: '#dc3545', color: 'white', flexGrow: 1 }}
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