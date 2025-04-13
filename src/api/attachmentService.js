import api from './axiosConfig';

const getAttachmentsByIssue = async (issueId) => {
  try {
    const response = await api.get(`/attachments/issue/${issueId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const uploadAttachment = async (file, issueId) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('issueId', issueId);
    
    const response = await api.post('/attachments/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteAttachment = async (id) => {
  try {
    const response = await api.delete(`/attachments/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const attachmentService = {
  getAttachmentsByIssue,
  uploadAttachment,
  deleteAttachment
};

export default attachmentService;