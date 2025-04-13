import React, { useState } from 'react';
import { Avatar, Upload, Button, Typography, Badge, Row, Col, Card } from 'antd';
import { UserOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;

const ProfileAvatar = ({ user, onAvatarUpdate }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = ({ file }) => {
    if (file.status === 'done' || file.status === 'uploading') {
      // Đây là nơi xử lý upload file thực tế
      onAvatarUpdate(file.originFileObj);
    }
  };

  const customUploadRequest = ({ file, onSuccess }) => {
    // Tạo preview URL
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    
    // Mock successful upload
    setTimeout(() => {
      onSuccess("ok");
    }, 500);
  };

  return (
    <Card className="profile-avatar-card">
      <Row gutter={24} align="middle">
        <Col xs={24} sm={6} md={4} className="avatar-column">
          <Badge
            count={
              <Upload
                customRequest={customUploadRequest}
                onChange={handleFileChange}
                showUploadList={false}
              >
                <Button 
                  shape="circle" 
                  icon={<EditOutlined />} 
                  size="small"
                  className="avatar-edit-button"
                />
              </Upload>
            }
          >
            <Avatar 
              size={100} 
              src={previewUrl || user.avatarUrl} 
              icon={<UserOutlined />}
              className="profile-avatar"
            />
          </Badge>
        </Col>
        
        <Col xs={24} sm={18} md={20}>
          <div className="profile-header-info">
            <Title level={3}>{user.fullName}</Title>
            <Text>@{user.username}</Text>
            <div className="profile-meta">
              <Text type="secondary">Member since: {moment(user.joinDate).format('MMMM YYYY')}</Text>
              <Text type="secondary"> • Last login: {moment(user.lastLogin).fromNow()}</Text>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ProfileAvatar;