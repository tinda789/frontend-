import api from './axiosConfig';

const getAllSubscriptions = async () => {
  try {
    const response = await api.get('/subscriptions');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCurrentSubscription = async () => {
  try {
    const response = await api.get('/subscriptions/current');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getSubscriptionHistory = async () => {
  try {
    const response = await api.get('/subscriptions/history');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const upgradeSubscription = async (subscriptionData) => {
  try {
    const response = await api.post('/subscriptions/upgrade', subscriptionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const subscriptionService = {
  getAllSubscriptions,
  getCurrentSubscription,
  getSubscriptionHistory,
  upgradeSubscription
};

export default subscriptionService;