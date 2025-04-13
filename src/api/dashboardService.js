import api from './axiosConfig';

const getDashboardStats = async () => {
  try {
    const response = await api.get('/dashboard/stats');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getWorkListReport = async (workListId) => {
  try {
    const response = await api.get(`/dashboard/worklist/${workListId}/report`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserProductivity = async (workListId) => {
  try {
    const response = await api.get(`/dashboard/worklist/${workListId}/productivity`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const dashboardService = {
  getDashboardStats,
  getWorkListReport,
  getUserProductivity
};

export default dashboardService;