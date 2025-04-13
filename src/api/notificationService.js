import api from './axiosConfig';

const getAll = async () => {
  return api.get('/notifications');
};

const getUnread = async () => {
  return api.get('/notifications/unread');
};

const markAsRead = async (id) => {
  return api.post(`/notifications/${id}/read`);
};

const markAllAsRead = async () => {
  return api.post('/notifications/read-all');
};

const deleteNotification = async (id) => {
  return api.delete(`/notifications/${id}`);
};

const notificationService = {
  getAll,
  getUnread,
  markAsRead,
  markAllAsRead,
  delete: deleteNotification
};

export default notificationService;