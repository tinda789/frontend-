import api from './axiosConfig';

const getByIssue = async (issueId) => {
  return api.get(`/attachments/issue/${issueId}`);
};

const upload = async (file, issueId) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('issueId', issueId);
  
  return api.post('/attachments/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const deleteAttachment = async (id) => {
  return api.delete(`/attachments/${id}`);
};

const attachmentService = {
  getByIssue,
  upload,
  delete: deleteAttachment
};

export default attachmentService;