import api from './axiosConfig';

const getByWorkList = async (workListId) => {
  return api.get(`/sprints/worklist/${workListId}`);
};

const getActiveByWorkList = async (workListId) => {
  return api.get(`/sprints/active/worklist/${workListId}`);
};

const getById = async (id) => {
  return api.get(`/sprints/${id}`);
};

const create = async (sprintData) => {
  return api.post('/sprints', sprintData);
};

const update = async (id, sprintData) => {
  return api.put(`/sprints/${id}`, sprintData);
};

const startSprint = async (id, startDate, endDate) => {
  return api.post(`/sprints/${id}/start?startDate=${startDate}&endDate=${endDate}`);
};

const completeSprint = async (id) => {
  return api.post(`/sprints/${id}/complete`);
};

const addIssue = async (sprintId, issueId) => {
  return api.post(`/sprints/${sprintId}/issues/${issueId}`);
};

const removeIssue = async (sprintId, issueId) => {
  return api.delete(`/sprints/${sprintId}/issues/${issueId}`);
};

const deleteSprint = async (id) => {
  return api.delete(`/sprints/${id}`);
};

const sprintService = {
  getByWorkList,
  getActiveByWorkList,
  getById,
  create,
  update,
  startSprint,
  completeSprint,
  addIssue,
  removeIssue,
  delete: deleteSprint
};

export default sprintService;