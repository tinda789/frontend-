import api from './axiosConfig';

const getAll = async () => {
  return api.get('/subscriptions');
};

const getCurrent = async () => {
  return api.get('/subscriptions/current');
};

const getHistory = async () => {
  return api.get('/subscriptions/history');
};

const upgrade = async (upgradeData) => {
  return api.post('/subscriptions/upgrade', upgradeData);
};

const subscriptionService = {
  getAll,
  getCurrent,
  getHistory,
  upgrade
};

export default subscriptionService;