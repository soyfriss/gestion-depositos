import axios from 'axios';
import decodeJwt from 'jwt-decode';

const apiUrl = process.env.REACT_APP_BASE_URL;

const authProvider = {
  // Método para iniciar sesión
  login: ({ username, password }) => {
    return axios.post(`${apiUrl}/login`, { username, password })
      .then(response => {
        const { token } = response.data;        
        localStorage.setItem('token', token);
      });
  },
  
  // Método para cerrar sesión
  logout: () => {
    return axios.post(`${apiUrl}/logout`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(() => {
        localStorage.removeItem('token');
      });
  },

  // logout: () => {
  //   localStorage.removeItem('token');
  //   return Promise.resolve();
  // },

  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      // localStorage.removeItem('token');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  
  // Método para comprobar si el usuario está autenticado
  checkAuth: () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return Promise.reject(new Error('No token found'));
    }
    const { exp } = decodeJwt(token);
    if (Date.now() >= exp * 1000) {
      return Promise.reject(new Error('Token expired'));
    }
    return Promise.resolve();
  },
  
  // Método para obtener el token de autenticación
  getIdentity: () => {
    try {
      const token = localStorage.getItem('token');
      const { id, username } = decodeJwt(token);
      return Promise.resolve({ id, fullName: username });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  
  // Método para obtener la información del usuario
  getPermissions: () => {
    return Promise.resolve();
  },
};

export default authProvider;