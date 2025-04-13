import React, { useState, useEffect } from 'react';
import { List, Typography, Tag, Avatar, Space, Empty, Skeleton } from 'antd';
import { UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Text } = Typography;

// Mock activity data
const mockActivities = [
  {
    id: 1,
    type: 'ISSUE_CREATED',
    title: 'Created issue "Add login functionality"',
    timestamp: '2023-10-18T14:30:00',
    project: 'Frontend Development'
  },
  {
    id: 2,
    type: 'COMMENT_ADDED',
    title: 'Commented on "Database optimization"',
    timestamp: '2023-10-17T10:15:00',
    project: 'Backend API'
  },
  {
    id: 3,
    type: 'ISSUE_ASSIGNED',
    title: 'Assigned to issue "Fix navigation bug"',
    timestamp: '2023-10-16T09:45:00',
    project: 'Frontend Development'
  },
  {
    id: 4,
    type: 'WORKLIST_JOINED',
    title: 'Joined worklist "Marketing Campaign"',
    timestamp: '2023-10-14T16:20:00',
    project: 'Marketing'
  },
  {
    id: 5,
    type: 'SPRINT_COMPLETED',
    title: 'Completed Sprint "October Release"',
    timestamp: '2023-10-10T11:00:00',
    project: 'Product Development'
  }
];

const activityTypeColors = {
  ISSUE_CREATED: 'green',
  COMMENT_ADDED: 'blue',
  ISSUE_ASSIGNED: 'orange',
  WORKLIST_JOINED: 'purple',
  SPRINT_COMPLETED: 'cyan'
};

const ActivityHistory = ({ userId }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      
      try {
        // Replace with actual API call when available
        // const response = await activityService.getUserActivities(userId);
        // setActivities(response.data);
        
        // Mock data for now
        setTimeout(() => {
          setActivities(mockActivities);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
        setLoading(false);
      }
    };

    fetchActivities();
  }, [userId]);

  if (loading) {
    return (
      <div>
        <Skeleton active paragraph={{ rows: 5 }} />
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <Empty description="No recent activities found" />
    );
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={activities}
      renderItem={activity => (
        <List.Item className="activity-item">
          <List.Item.Meta
            title={
              <Space>
                <Tag color={activityTypeColors[activity.type] || 'default'}>
                  {activity.type.replace('_', ' ')}
                </Tag>
                <Text>{activity.title}</Text>
              </Space>
            }
            description={
              <Space>
                <ClockCircleOutlined />
                <Text type="secondary">{moment(activity.timestamp).fromNow()}</Text>
                <Text type="secondary">in</Text>
                <Text strong>{activity.project}</Text>
              </Space>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default ActivityHistory;