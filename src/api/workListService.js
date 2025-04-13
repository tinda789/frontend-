import api from './axiosConfig';

const getAllWorkLists = async () => {
  try {
    const response = await api.get('/worklists');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getWorkListsByWorkspace = async (workspaceId) => {
  try {
    const response = await api.get(`/worklists/workspace/${workspaceId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getWorkListById = async (id) => {
  try {
    const response = await api.get(`/worklists/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createWorkList = async (workListData) => {
  try {
    const response = await api.post('/worklists', workListData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateWorkList = async (id, workListData) => {
  try {
    const response = await api.put(`/worklists/${id}`, workListData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteWorkList = async (id) => {
  try {
    const response = await api.delete(`/worklists/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addMember = async (workListId, userId) => {
  try {
    const response = await api.post(`/worklists/${workListId}/members/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const removeMember = async (workListId, userId) => {
  try {
    const response = await api.delete(`/worklists/${workListId}/members/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const workListService = {
  getAllWorkLists,
  getWorkListsByWorkspace,
  getWorkListById,
  createWorkList,
  updateWorkList,
  deleteWorkList,
  addMember,
  removeMember
};

export default workListService;