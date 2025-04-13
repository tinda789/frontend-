import api from './axiosConfig';

const getByWorkList = async (workListId) => {
  return api.get(`/automation-rules/worklist/${workListId}`);
};

const getById = async (id) => {
  return api.get(`/automation-rules/${id}`);
};

const create = async (ruleData) => {
  return api.post('/automation-rules', ruleData);
};

const update = async (id, ruleData) => {
  return api.put(`/automation-rules/${id}`, ruleData);
};

const toggleActive = async (id) => {
  return api.patch(`/automation-rules/${id}/toggle-active`);
};

const deleteRule = async (id) => {
  return api.delete(`/automation-rules/${id}`);
};

const automationService = {
  getByWorkList,
  getById,
  create,
  update,
  toggleActive,
  delete: deleteRule
};

export default automationService;