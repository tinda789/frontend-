import api from './axiosConfig';

const getByIssue = async (issueId) => {
  return api.get(`/comments/issue/${issueId}`);
};

const create = async (commentData) => {
  return api.post('/comments', commentData);
};

const update = async (id, commentData) => {
  return api.put(`/comments/${id}`, commentData);
};

const deleteComment = async (id) => {
  return api.delete(`/comments/${id}`);
};

const commentService = {
  getByIssue,
  create,
  update,
  delete: deleteComment
};

export default commentService;