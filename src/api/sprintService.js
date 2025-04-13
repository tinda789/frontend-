import api from './axiosConfig';

const getSprintsByWorkList = async (workListId) => {
  try {
    const response = await api.get(`/sprints/worklist/${workListId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getActiveSprintsByWorkList = async (workListId) => {
  try {
    const response = await api.get(`/sprints/active/worklist/${workListId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getSprintById = async (id) => {
  try {
    const response = await api.get(`/sprints/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createSprint = async (sprintData) => {
  try {
    const response = await api.post('/sprints', sprintData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateSprint = async (id, sprintData) => {
  try {
    const response = await api.put(`/sprints/${id}`, sprintData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const startSprint = async (id, startDate, endDate) => {
  try {
    const response = await api.post(`/sprints/${id}/start?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const completeSprint = async (id) => {
  try {
    const response = await api.post(`/sprints/${id}/complete`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addIssueToSprint = async (sprintId, issueId) => {
  try {
    const response = await api.post(`/sprints/${sprintId}/issues/${issueId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const removeIssueFromSprint = async (sprintId, issueId) => {
  try {
    const response = await api.delete(`/sprints/${sprintId}/issues/${issueId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteSprint = async (id) => {
  try {
    const response = await api.delete(`/sprints/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const sprintService = {
  getSprintsByWorkList,
  getActiveSprintsByWorkList,
  getSprintById,
  createSprint,
  updateSprint,
  startSprint,
  completeSprint,
  addIssueToSprint,
  removeIssueFromSprint,
  deleteSprint
};

export default sprintService;