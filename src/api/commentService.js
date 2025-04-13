import api from './axiosConfig';

const getCommentsByIssue = async (issueId) => {
  try {
    const response = await api.get(`/comments/issue/${issueId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createComment = async (commentData) => {
  try {
    const response = await api.post('/comments', commentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateComment = async (id, commentData) => {
  try {
    const response = await api.put(`/comments/${id}`, commentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteComment = async (id) => {
  try {
    const response = await api.delete(`/comments/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const commentService = {
  getCommentsByIssue,
  createComment,
  updateComment,
  deleteComment
};

export default commentService;