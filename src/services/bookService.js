// src/services/bookService.js

const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=javascript+programming&maxResults=10';
const LOCAL_STORAGE_KEY = 'libraryBooks';

/**
 * Busca livros da Google Books API.
 * @returns {Array} 
 */
export const fetchBooksFromAPI = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados da API');
    }
    const data = await response.json();
    
    const books = data.items.map(item => ({
      id: item.id,
      title: item.volumeInfo.title || 'Título Desconhecido',
      author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Autor Desconhecido',
      publishedDate: item.volumeInfo.publishedDate || 'Data Desconhecida',
      description: item.volumeInfo.description || 'Sem descrição.',
      thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : null,
      status: 'API' 
    }));

    return books;
  } catch (error) {
    console.error('Erro na requisição da API:', error);
    return [];
  }
};

/**
 * 
 */
export const initializeBooks = async () => {
  const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  if (!localData || localData.length === 0) {
    console.log('Dados locais vazios, buscando na API...');
    const apiBooks = await fetchBooksFromAPI();
    
    const initialBooks = apiBooks.map((book, index) => ({
      ...book,
      id: `api-${index + 1}` 
    }));
    
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialBooks));
    return initialBooks;
  }

  return localData;
};

/**
 * Retorna a lista atual de livros.
 * @returns {Array} 
 */
export const getBooks = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
};

/**
 * Função para salvar a lista de livros no localStorage (Usada por Create, Update, Delete).
 * @param {Array} books
 */
export const saveBooks = (books) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
};

/**
 * Função CREATE
 * @param {Object} newBook
 * @returns {Array}
 */
export const addBook = (newBook) => {
  const books = getBooks();
  
  const bookWithId = { 
    ...newBook, 
    id: `local-${Date.now()}`, 
    status: 'LOCAL' 
  };
  
  const newBooks = [bookWithId, ...books];
  saveBooks(newBooks);
  return newBooks;
};

/**
 * Função UPDATE 
 * @param {Object} updatedBook 
 * @returns {Array} 
 */
export const updateBook = (updatedBook) => {
  const books = getBooks();
  
  const newBooks = books.map(book => 
    book.id === updatedBook.id ? updatedBook : book
  );
  
  saveBooks(newBooks);
  return newBooks;
};

/**
 * Função DELETE 
 * @param {string} id 
 * @returns {Array} 
 */
export const deleteBook = (id) => {
  const books = getBooks();
  
  const newBooks = books.filter(book => book.id !== id);
  
  saveBooks(newBooks);
  return newBooks;
};