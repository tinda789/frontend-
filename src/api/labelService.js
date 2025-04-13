import api from './axiosConfig';

const getAll = async () => {
  return api.get('/labels');
};

const getById = async (id) => {
  return api.get(`/labels/${id}`);
};

const create = async (labelData) => {
  return api.post('/labels', labelData);
};

const update = async (id, labelData) => {
  return api.put(`/labels/${id}`, labelData);
};

const deleteLabel = async (id) => {
  return api.delete(`/labels/${id}`);
};

const labelService = {
  getAll,
  getById,
  create,
  update,
  delete: deleteLabel
};

export default labelService;