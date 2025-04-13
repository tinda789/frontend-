import api from './axiosConfig';

const getByIssue = async (issueId) => {
  return api.get(`/worklogs/issue/${issueId}`);
};

const getByUser = async () => {
  return api.get('/worklogs/user');
};

const getById = async (id) => {
  return api.get(`/worklogs/${id}`);
};

const create = async (workLogData) => {
  return api.post('/worklogs', workLogData);
};

const update = async (id, workLogData) => {
  return api.put(`/worklogs/${id}`, workLogData);
};

const deleteWorkLog = async (id) => {
  return api.delete(`/worklogs/${id}`);
};

const getTotalForIssue = async (issueId) => {
  return api.get(`/worklogs/total/issue/${issueId}`);
};

const getUserTimeInPeriod = async (startDate, endDate) => {
  return api.get(`/worklogs/total/user?startDate=${startDate}&endDate=${endDate}`);
};

const workLogService = {
  getByIssue,
  getByUser,
  getById,
  create,
  update,
  delete: deleteWorkLog,
  getTotalForIssue,
  getUserTimeInPeriod
};

export default workLogService;