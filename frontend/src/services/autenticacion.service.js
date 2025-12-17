import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

export const registro = async (nombre, email, password, confirmPassword) => {
  try {
    const { data } = await axios.post(`${API_URL}/registro`, {
      nombre,
      email,
      password,
      confirmPassword
    });

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
    }

    return data;
  } catch (error) {
    return { 
      success: false, 
      mensaje: error.response?.data?.mensaje || error.message 
    };
  }
};

export const login = async (email, password) => {
  try {
    const { data } = await axios.post(`${API_URL}/login`, { email, password });

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
    }

    return data;
  } catch (error) {
    return { 
      success: false, 
      mensaje: error.response?.data?.mensaje || error.message 
    };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
};

export const obtenerToken = () => localStorage.getItem('token');

export const obtenerUsuario = () => {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
};

export const Authenticado = () => !!localStorage.getItem('token');

export const obtenerPerfil = async () => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.get(`${API_URL}/perfil`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  } catch (error) {
    return { 
      success: false, 
      mensaje: error.response?.data?.mensaje || error.message 
    };
  }
};