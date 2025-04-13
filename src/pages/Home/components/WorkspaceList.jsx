import React from 'react';
import { List, Typography, Avatar, Space, Button, Empty } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const WorkspaceList = ({ workspaces, navigate }) => {
  if (!workspaces || workspaces.length === 0) {
    return (
      <div className="empty-list">
        <Empty description="Không có không gian làm việc" />
      </div>
    );
  }

  return (
    <List
      dataSource={workspaces}
      renderItem={workspace => (
        <div 
          className="workspace-item"
          onClick={() => navigate(`/workspaces/${workspace.id}`)}
        >
          <Space size="middle">
            <Avatar 
              className="workspace-avatar"
              size={40}
            >
              {getInitials(workspace.name)}
            </Avatar>
            <div className="workspace-item-content">
              <Title level={5} style={{ margin: 0 }}>{workspace.name}</Title>
              <Text type="secondary">{workspace.description || 'Không có mô tả'}</Text>
            </div>
          </Space>
          <RightOutlined style={{ color: '#bfbfbf' }} />
        </div>
      )}
    />
  );
};

export default WorkspaceList;