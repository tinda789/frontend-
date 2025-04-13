import React from 'react';
import { List, Typography, Tag, Avatar, Space, Empty } from 'antd';
import { ClockCircleOutlined, FlagOutlined, UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

const issueTypeColors = {
  TASK: '#4caf50',
  BUG: '#f44336',
  STORY: '#2196f3',
  EPIC: '#9c27b0'
};

const issuePriorityIcons = {
  LOW: <FlagOutlined style={{ color: '#8c8c8c' }} />,
  MEDIUM: <FlagOutlined style={{ color: '#faad14' }} />,
  HIGH: <FlagOutlined style={{ color: '#fa8c16' }} />,
  CRITICAL: <FlagOutlined style={{ color: '#f5222d' }} />
};

const AssignedToMe = ({ issues, navigate }) => {
  if (!issues || issues.length === 0) {
    return (
      <div className="empty-list">
        <Empty description="Không có công việc được gán cho bạn" />
      </div>
    );
  }

  return (
    <List
      dataSource={issues}
      renderItem={issue => (
        <div 
          className="issue-item"
          onClick={() => navigate(`/issues/${issue.id}`)}
        >
          <div>
            <Space>
              <Tag color={issueTypeColors[issue.type] || '#1890ff'}>
                {issue.type}
              </Tag>
              <Text strong>{issue.title}</Text>
            </Space>
          </div>
          <div className="issue-item-meta">
            <Space>
              <Tag color={issue.status === 'DONE' ? 'green' : issue.status === 'IN_PROGRESS' ? 'blue' : issue.status === 'REVIEW' ? 'orange' : 'default'}>
                {issue.status}
              </Tag>
              {issuePriorityIcons[issue.priority]}
              <Text type="secondary">
                <ClockCircleOutlined /> {new Date(issue.createdDate).toLocaleDateString()}
              </Text>
            </Space>
            <Space>
              <Text type="secondary">{issue.workListId}</Text>
              <Avatar size="small" icon={<UserOutlined />} />
            </Space>
          </div>
        </div>
      )}
    />
  );
};

export default AssignedToMe;