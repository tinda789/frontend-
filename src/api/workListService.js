import api from './axiosConfig';

const getAll = async () => {
  return api.get('/worklists');
};

const getByWorkspace = async (workspaceId) => {
  return api.get(`/worklists/workspace/${workspaceId}`);
};

const getById = async (id) => {
  return api.get(`/worklists/${id}`);
};

const create = async (workListData) => {
  return api.post('/worklists', workListData);
};

const update = async (id, workListData) => {
  return api.put(`/worklists/${id}`, workListData);
};

const deleteWorkList = async (id) => {
  return api.delete(`/worklists/${id}`);
};

const addMember = async (workListId, userId) => {
  return api.post(`/worklists/${workListId}/members/${userId}`);
};

const removeMember = async (workListId, userId) => {
  return api.delete(`/worklists/${workListId}/members/${userId}`);
};

const workListService = {
  getAll,
  getByWorkspace,
  getById,
  create,
  update,
  delete: deleteWorkList,
  addMember,
  removeMember
};

export default workListService;