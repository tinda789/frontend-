import api from './axiosConfig';

const getAllUsers = async () => {
  return api.get('/users');
};

const getUserById = async (id) => {
  return api.get(`/users/${id}`);
};

const getProfile = async () => {
  return api.get('/users/profile');
};

const updateProfile = async (profileData) => {
  return api.put('/users/profile', profileData);
};

const changePassword = async (passwordData) => {
  return api.post('/users/change-password', passwordData);
};

const updateUser = async (id, userData) => {
  return api.put(`/users/${id}`, userData);
};

const deleteUser = async (id) => {
  return api.delete(`/users/${id}`);
};

const userService = {
  getAllUsers,
  getUserById,
  getProfile,
  updateProfile,
  changePassword,
  updateUser,
  deleteUser
};

export default userService;