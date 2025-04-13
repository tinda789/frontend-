import api from './axiosConfig';

const getUserNotifications = async () => {
  try {
    const response = await api.get('/notifications');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUnreadNotifications = async () => {
  try {
    const response = await api.get('/notifications/unread');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const markAsRead = async (id) => {
  try {
    const response = await api.post(`/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const markAllAsRead = async () => {
  try {
    const response = await api.post('/notifications/read-all');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteNotification = async (id) => {
  try {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const notificationService = {
  getUserNotifications,
  getUnreadNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
};

export default notificationService;