import api from './axiosConfig';

const getAll = async () => {
  return api.get('/custom-fields');
};

const getById = async (id) => {
  return api.get(`/custom-fields/${id}`);
};

const getByIssue = async (issueId) => {
  return api.get(`/custom-fields/issue/${issueId}`);
};

const create = async (fieldData) => {
  return api.post('/custom-fields', fieldData);
};

const update = async (id, fieldData) => {
  return api.put(`/custom-fields/${id}`, fieldData);
};

const deleteField = async (id) => {
  return api.delete(`/custom-fields/${id}`);
};

const setValue = async (valueData) => {
  return api.post('/custom-fields/values', valueData);
};

const deleteValue = async (id) => {
  return api.delete(`/custom-fields/values/${id}`);
};

const customFieldService = {
  getAll,
  getById,
  getByIssue,
  create,
  update,
  delete: deleteField,
  setValue,
  deleteValue
};

export default customFieldService;