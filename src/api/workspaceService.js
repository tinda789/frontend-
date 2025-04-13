import api from './axiosConfig';

const getAll = async () => {
  return api.get('/workspaces');
};

const getOwned = async () => {
  return api.get('/workspaces/owned');
};

const getById = async (id) => {
  return api.get(`/workspaces/${id}`);
};

const create = async (workspaceData) => {
  return api.post('/workspaces', workspaceData);
};

const update = async (id, workspaceData) => {
  return api.put(`/workspaces/${id}`, workspaceData);
};

const deleteWorkspace = async (id) => {
  return api.delete(`/workspaces/${id}`);
};

const addMember = async (workspaceId, userId) => {
  return api.post(`/workspaces/${workspaceId}/members/${userId}`);
};

const removeMember = async (workspaceId, userId) => {
  return api.delete(`/workspaces/${workspaceId}/members/${userId}`);
};

const workspaceService = {
  getAll,
  getOwned,
  getById,
  create,
  update,
  delete: deleteWorkspace,
  addMember,
  removeMember
};

export default workspaceService;