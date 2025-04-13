import React from 'react';
import { Card, Typography, Row, Col, Empty } from 'antd';
import { ProjectOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const RecentProjects = ({ projects, navigate }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="empty-list">
        <Empty description="Không có dự án gần đây" />
      </div>
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {projects.map(project => (
        <Col xs={24} sm={12} md={8} key={project.id}>
          <Card 
            className="project-card"
            onClick={() => navigate(`/worklists/workspace/${project.id}`)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ProjectOutlined style={{ fontSize: 24, marginRight: 12, color: '#1890ff' }} />
              <div>
                <Title level={5} style={{ margin: 0 }}>{project.name}</Title>
                <Text type="secondary">{project.description || 'Không có mô tả'}</Text>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default RecentProjects;