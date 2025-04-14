import api from './axiosConfig';

const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  
  if (!userStr) {
    return null;
  }
  
  try {
    const user = JSON.parse(userStr);
    return user;
  } catch (err) {
    return null;
  }
};

const test = async () => {
  try {
    const response = await api.get('/auth/test');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const authService = {
  login,
  register,
  logout,
  getCurrentUser,
  test
};

export default authService;