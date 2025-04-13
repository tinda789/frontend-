import api from './axiosConfig';

const getAll = async () => {
  return api.get('/roles');
};

const getById = async (id) => {
  return api.get(`/roles/${id}`);
};

const assignRole = async (userRoleData) => {
  return api.post('/roles/assign', userRoleData);
};

const removeRole = async (userRoleData) => {
  return api.post('/roles/remove', userRoleData);
};

const roleService = {
  getAll,
  getById,
  assignRole,
  removeRole
};

export default roleService;