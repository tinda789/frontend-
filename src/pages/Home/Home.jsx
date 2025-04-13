// src/pages/Home/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Spin, Row, Col, Tabs, Card, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { authService, workspaceService, issueService, workListService,sprintService } from '../../api';
import RecentProjects from './components/RecentProjects';
import AssignedToMe from './components/AssignedToMe';
import StarredProjects from './components/StarredProjects';
import WorkspaceList from './components/WorkspaceList';
import CreateWorkspaceModal from './components/CreateWorkspaceModal';
import MainLayout from '../../components/Layout/MainLayout';
import './Home.css';

const { Title, Text } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);
  const [assignedIssues, setAssignedIssues] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [starredProjects, setStarredProjects] = useState([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  // MOCK DATA for development
  const mockUserInfo = { username: 'testuser', fullName: 'Test User' };
  const mockWorkspaces = [
    { id: 1, name: 'Marketing Project', description: 'All marketing related tasks' },
    { id: 2, name: 'Development Team', description: 'Software development projects' },
    { id: 3, name: 'HR Management', description: 'Human resources tasks and projects' }
  ];
  const mockIssues = [
    { id: 1, title: 'Update landing page', type: 'TASK', status: 'IN_PROGRESS', priority: 'HIGH', createdDate: new Date().toISOString(), workListId: 'WL-1' },
    { id: 2, title: 'Fix login bug', type: 'BUG', status: 'TODO', priority: 'CRITICAL', createdDate: new Date().toISOString(), workListId: 'WL-2' },
    { id: 3, title: 'Plan marketing campaign', type: 'STORY', status: 'REVIEW', priority: 'MEDIUM', createdDate: new Date().toISOString(), workListId: 'WL-1' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Use actual services or mock data if services aren't ready
        let userData, workspacesData, assignedIssuesData;
        
        try {
          userData = await authService.getCurrentUser();
        } catch (e) {
          userData = mockUserInfo;
        }
        
        try {
          workspacesData = await workspaceService.getAllWorkspaces();
        } catch (e) {
          workspacesData = mockWorkspaces;
        }
        
        try {
          assignedIssuesData = await issueService.getAssignedIssues();
        } catch (e) {
          assignedIssuesData = mockIssues;
        }
        
        setUserInfo(userData);
        setWorkspaces(workspacesData);
        setAssignedIssues(assignedIssuesData);
        
        setRecentProjects(workspacesData.slice(0, 3));
        setStarredProjects(workspacesData.slice(0, 2));
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching home data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleCreateWorkspace = async (values) => {
    try {
      setLoading(true);
      let newWorkspace;
      
      try {
        newWorkspace = await workspaceService.createWorkspace(values);
      } catch (e) {
        // Mock for development
        newWorkspace = { ...values, id: workspaces.length + 1 };
      }
      
      setWorkspaces(prev => [...prev, newWorkspace]);
      setCreateModalVisible(false);
      setLoading(false);
    } catch (error) {
      console.error('Error creating workspace:', error);
      setLoading(false);
    }
  };

  const tabItems = [
    {
      key: '1',
      label: 'Recent',
      children: <RecentProjects projects={recentProjects} navigate={navigate} />
    },
    {
      key: '2',
      label: 'Starred',
      children: <StarredProjects projects={starredProjects} navigate={navigate} />
    }
  ];

  const homeContent = (
    <div className="home-container">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div className="home-header">
            <Space direction="vertical" size={4}>
              <Title level={3}>Home</Title>
              <Text type="secondary">Welcome, {userInfo?.fullName || userInfo?.username}</Text>
            </Space>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setCreateModalVisible(true)}
            >
              Create Workspace
            </Button>
          </div>
        </Col>

        <Col xs={24} md={16}>
          <Card className="home-section" title="Projects">
            <Tabs items={tabItems} />
          </Card>

          <Card title="Assigned to me" className="home-section">
            <AssignedToMe issues={assignedIssues} navigate={navigate} />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card 
            title="My Workspaces" 
            className="home-section"
          >
            <WorkspaceList 
              workspaces={workspaces} 
              navigate={navigate} 
            />
          </Card>
        </Col>
      </Row>

      <CreateWorkspaceModal 
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onCreate={handleCreateWorkspace}
      />
    </div>
  );

  if (loading && !userInfo) {
    return (
      <MainLayout>
        <div className="home-loading">
          <Spin size="large" />
          <Text>Loading data...</Text>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {homeContent}
    </MainLayout>
  );
};

export default Home;