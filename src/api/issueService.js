import api from './axiosConfig';

const getAll = async () => {
  return api.get('/issues');
};

const getByWorkList = async (workListId) => {
  return api.get(`/issues/worklist/${workListId}`);
};

const getBySprint = async (sprintId) => {
  return api.get(`/issues/sprint/${sprintId}`);
};

const getAssigned = async () => {
  return api.get('/issues/assigned');
};

const getReported = async () => {
  return api.get('/issues/reported');
};

const getById = async (id) => {
  return api.get(`/issues/${id}`);
};

const getSubIssues = async (id) => {
  return api.get(`/issues/${id}/sub-issues`);
};

const create = async (issueData) => {
  return api.post('/issues', issueData);
};

const update = async (id, issueData) => {
  return api.put(`/issues/${id}`, issueData);
};

const updateStatus = async (id, status) => {
  return api.patch(`/issues/${id}/status?status=${status}`);
};

const updateAssignee = async (id, assigneeId) => {
  return api.patch(`/issues/${id}/assignee?assigneeId=${assigneeId || ''}`);
};

const updateSprint = async (id, sprintId) => {
  return api.patch(`/issues/${id}/sprint?sprintId=${sprintId || ''}`);
};

const deleteIssue = async (id) => {
  return api.delete(`/issues/${id}`);
};

const issueService = {
  getAll,
  getByWorkList,
  getBySprint,
  getAssigned,
  getReported,
  getById,
  getSubIssues,
  create,
  update,
  updateStatus,
  updateAssignee,
  updateSprint,
  delete: deleteIssue
};

export default issueService;