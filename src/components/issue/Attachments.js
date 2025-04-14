// src/components/issue/Attachments.js
import React, { useState } from 'react';
import { Upload, Button, List, Popconfirm } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { attachmentService } from '../../api';

const Attachments = ({ attachments, issueId, onAttachmentAdded, onAttachmentDeleted }) => {
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleUpload = async () => {
    if (fileList.length === 0) return;
    
    try {
      setUploading(true);
      const file = fileList[0];
      await attachmentService.upload(file, issueId);
      setFileList([]);
      if (onAttachmentAdded) onAttachmentAdded();
    } catch (error) {
      console.error('Lỗi khi tải tệp lên:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (attachmentId) => {
    try {
      await attachmentService.delete(attachmentId);
      if (onAttachmentDeleted) onAttachmentDeleted();
    } catch (error) {
      console.error('Lỗi khi xóa tệp đính kèm:', error);
    }
  };

  const props = {
    onRemove: file => {
      setFileList([]);
    },
    beforeUpload: file => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  return (
    <div className="attachments-section">
      <div className="upload-section">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Chọn tệp</Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginLeft: 10 }}
        >
          {uploading ? 'Đang tải lên' : 'Tải lên'}
        </Button>
      </div>

      <List
        className="attachment-list"
        itemLayout="horizontal"
        dataSource={attachments}
        renderItem={attachment => (
          <List.Item
            actions={[
              <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                <Button type="link">
                  <i className="bi bi-download"></i>
                </Button>
              </a>,
              <Popconfirm
                title="Bạn có chắc chắn muốn xóa tệp đính kèm này?"
                onConfirm={() => handleDelete(attachment.id)}
                okText="Đồng ý"
                cancelText="Hủy"
              >
                <Button type="link" danger>
                  <i className="bi bi-trash"></i>
                </Button>
              </Popconfirm>
            ]}
          >
            <List.Item.Meta
              avatar={<i className="bi bi-file-earmark" style={{ fontSize: '24px' }}></i>}
              title={attachment.fileName}
              description={
                <div>
                  <span>Kích thước: {formatFileSize(attachment.fileSize)}</span>
                  <span style={{ marginLeft: '15px' }}>
                    Ngày tải lên: {new Date(attachment.createdAt).toLocaleString()}
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / 1048576).toFixed(2) + ' MB';
};

export default Attachments;