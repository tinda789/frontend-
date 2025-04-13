import React from 'react';
import { Card, Typography, Row, Col, Empty, Tag } from 'antd';
import { StarOutlined, ProjectOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const StarredProjects = ({ projects, navigate }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="empty-list">
        <Empty description="Không có dự án được đánh dấu sao" />
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Title level={5} style={{ margin: 0 }}>{project.name}</Title>
                  <StarOutlined style={{ color: '#faad14', fontSize: 16 }} />
                </div>
                <Text type="secondary">{project.description || 'Không có mô tả'}</Text>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StarredProjects;