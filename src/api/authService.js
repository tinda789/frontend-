import api from './axiosConfig';

const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const register = async (username, email, password, fullName) => {
  try {
    const response = await api.post('/auth/register', {
      username,
      email,
      password,
      fullName
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('token');
};

const getCurrentUser = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const authService = {
  login,
  register,
  logout,
  getCurrentUser
};

export default authService;