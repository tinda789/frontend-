import api from './axiosConfig';

const getAllIssues = async () => {
  try {
    const response = await api.get('/issues');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getIssueById = async (id) => {
  try {
    const response = await api.get(`/issues/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getIssuesByWorkList = async (workListId) => {
  try {
    const response = await api.get(`/issues/worklist/${workListId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getIssuesBySprint = async (sprintId) => {
  try {
    const response = await api.get(`/issues/sprint/${sprintId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAssignedIssues = async () => {
  try {
    const response = await api.get('/issues/assigned');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getReportedIssues = async () => {
  try {
    const response = await api.get('/issues/reported');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getSubIssues = async (parentIssueId) => {
  try {
    const response = await api.get(`/issues/${parentIssueId}/sub-issues`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createIssue = async (issueData) => {
  try {
    const response = await api.post('/issues', issueData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateIssue = async (id, issueData) => {
  try {
    const response = await api.put(`/issues/${id}`, issueData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateIssueStatus = async (id, status) => {
  try {
    const response = await api.patch(`/issues/${id}/status?status=${status}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateIssueAssignee = async (id, assigneeId) => {
  try {
    const url = assigneeId 
      ? `/issues/${id}/assignee?assigneeId=${assigneeId}`
      : `/issues/${id}/assignee`;
    const response = await api.patch(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateIssueSprint = async (id, sprintId) => {
  try {
    const url = sprintId 
      ? `/issues/${id}/sprint?sprintId=${sprintId}`
      : `/issues/${id}/sprint`;
    const response = await api.patch(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteIssue = async (id) => {
  try {
    const response = await api.delete(`/issues/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const issueService = {
  getAllIssues,
  getIssueById,
  getIssuesByWorkList,
  getIssuesBySprint,
  getAssignedIssues,
  getReportedIssues,
  getSubIssues,
  createIssue,
  updateIssue,
  updateIssueStatus,
  updateIssueAssignee,
  updateIssueSprint,
  deleteIssue
};

export default issueService;