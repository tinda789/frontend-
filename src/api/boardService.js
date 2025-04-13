import api from './axiosConfig';

const getByWorkList = async (workListId) => {
  return api.get(`/boards/worklist/${workListId}`);
};

const getById = async (id) => {
  return api.get(`/boards/${id}`);
};

const create = async (boardData) => {
  return api.post('/boards', boardData);
};

const update = async (id, boardData) => {
  return api.put(`/boards/${id}`, boardData);
};

const deleteBoard = async (id) => {
  return api.delete(`/boards/${id}`);
};

const getColumns = async (boardId) => {
  return api.get(`/board-columns/board/${boardId}`);
};

const createColumn = async (columnData) => {
  return api.post('/board-columns', columnData);
};

const updateColumn = async (id, columnData) => {
  return api.put(`/board-columns/${id}`, columnData);
};

const deleteColumn = async (id, boardId) => {
  return api.delete(`/board-columns/${id}?boardId=${boardId}`);
};

const reorderColumns = async (boardId, columnIds) => {
  return api.post(`/board-columns/reorder?boardId=${boardId}`, columnIds);
};

const addIssueToColumn = async (columnId, issueId, boardId) => {
  return api.post(`/board-columns/${columnId}/issues/${issueId}?boardId=${boardId}`);
};

const removeIssueFromColumn = async (columnId, issueId, boardId) => {
  return api.delete(`/board-columns/${columnId}/issues/${issueId}?boardId=${boardId}`);
};

const boardService = {
  getByWorkList,
  getById,
  create,
  update,
  delete: deleteBoard,
  getColumns,
  createColumn,
  updateColumn,
  deleteColumn,
  reorderColumns,
  addIssueToColumn,
  removeIssueFromColumn
};

export default boardService;