import api from './axiosConfig';

const getAllWorkspaces = async () => {
  try {
    const response = await api.get('/workspaces');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getOwnedWorkspaces = async () => {
  try {
    const response = await api.get('/workspaces/owned');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getWorkspaceById = async (id) => {
  try {
    const response = await api.get(`/workspaces/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createWorkspace = async (workspaceData) => {
  try {
    const response = await api.post('/workspaces', workspaceData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateWorkspace = async (id, workspaceData) => {
  try {
    const response = await api.put(`/workspaces/${id}`, workspaceData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteWorkspace = async (id) => {
  try {
    const response = await api.delete(`/workspaces/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addMember = async (workspaceId, userId) => {
  try {
    const response = await api.post(`/workspaces/${workspaceId}/members/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const removeMember = async (workspaceId, userId) => {
  try {
    const response = await api.delete(`/workspaces/${workspaceId}/members/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const workspaceService = {
  getAllWorkspaces,
  getOwnedWorkspaces,
  getWorkspaceById,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  addMember,
  removeMember
};

export default workspaceService;