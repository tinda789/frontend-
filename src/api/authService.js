import api from './axiosConfig';

const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const register = async (userData) => {
  return api.post('/auth/register', userData);
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const test = async () => {
  return api.get('/auth/test');
};

const authService = {
  login,
  register,
  logout,
  getCurrentUser,
  test
};

export default authService;