import api from './axiosConfig';

const getBoardsByWorkList = async (workListId) => {
  try {
    const response = await api.get(`/boards/worklist/${workListId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getBoardById = async (id) => {
  try {
    const response = await api.get(`/boards/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createBoard = async (boardData) => {
  try {
    const response = await api.post('/boards', boardData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateBoard = async (id, boardData) => {
  try {
    const response = await api.put(`/boards/${id}`, boardData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteBoard = async (id) => {
  try {
    const response = await api.delete(`/boards/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getColumnsByBoard = async (boardId) => {
  try {
    const response = await api.get(`/board-columns/board/${boardId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createColumn = async (columnData) => {
  try {
    const response = await api.post('/board-columns', columnData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateColumn = async (id, columnData) => {
  try {
    const response = await api.put(`/board-columns/${id}`, columnData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteColumn = async (id, boardId) => {
  try {
    const response = await api.delete(`/board-columns/${id}?boardId=${boardId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const reorderColumns = async (boardId, columnIds) => {
  try {
    const response = await api.post(`/board-columns/reorder?boardId=${boardId}`, columnIds);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addIssueToColumn = async (columnId, issueId, boardId) => {
  try {
    const response = await api.post(`/board-columns/${columnId}/issues/${issueId}?boardId=${boardId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const removeIssueFromColumn = async (columnId, issueId, boardId) => {
  try {
    const response = await api.delete(`/board-columns/${columnId}/issues/${issueId}?boardId=${boardId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const boardService = {
  getBoardsByWorkList,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  getColumnsByBoard,
  createColumn,
  updateColumn,
  deleteColumn,
  reorderColumns,
  addIssueToColumn,
  removeIssueFromColumn
};

export default boardService;