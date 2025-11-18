const AUTH_KEY = 'isAuthenticated';

/**
 * Simula a verificação de credenciais e "loga" o usuário
 * @param {string} email
 * @param {string} password
 * @returns {boolean} 
 */
export const login = (email, password) => {
  // Simulacao de credenciais validas
  if (email && password) {
    localStorage.setItem(AUTH_KEY, 'true'); 
    return true;
  }
  return false;
};

/**
 * Remove o status de logado
 */
export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

/**
 * Verifica se o usuário está logado
 * @returns {boolean} 
 */
export const isAuthenticated = () => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};

/**
 * Simula o registro de um novo usuário
 * @param {string} email
 * @param {string} password
 * @returns {boolean} 
 */
export const register = (email, password) => {
  if (email && password) {
    localStorage.setItem(AUTH_KEY, 'true'); 
    return true;
  }
  return false;
};