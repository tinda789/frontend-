import api from './axiosConfig';

const getStats = async () => {
  return api.get('/dashboard/stats');
};

const getWorkListReport = async (workListId) => {
  return api.get(`/dashboard/worklist/${workListId}/report`);
};

const getUserProductivity = async (workListId) => {
  return api.get(`/dashboard/worklist/${workListId}/productivity`);
};

const dashboardService = {
  getStats,
  getWorkListReport,
  getUserProductivity
};

export default dashboardService;