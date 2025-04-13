// src/components/Layout/AppSidebar.jsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  ProjectOutlined,
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  CalendarOutlined,
  FileTextOutlined,
  AppstoreOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

const AppSidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine which menu item is active
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/home') return ['home'];
    if (path === '/dashboard') return ['dashboard'];
    if (path.includes('/projects')) return ['projects'];
    if (path.includes('/profile')) return ['profile'];
    return ['home'];
  };

  return (
    <Sider 
      width={250} 
      collapsible 
      collapsed={collapsed}
      className="app-sidebar"
      theme="light"
    >
      <Menu
        mode="inline"
        selectedKeys={getSelectedKey()}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="home" icon={<HomeOutlined />} onClick={() => navigate('/home')}>
          Home
        </Menu.Item>
        <Menu.Item key="dashboard" icon={<DashboardOutlined />} onClick={() => navigate('/dashboard')}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="projects" icon={<ProjectOutlined />} onClick={() => navigate('/projects')}>
          Projects
        </Menu.Item>
        <Menu.Item key="calendar" icon={<CalendarOutlined />} onClick={() => navigate('/calendar')}>
          Calendar
        </Menu.Item>
        <Menu.Item key="tasks" icon={<FileTextOutlined />} onClick={() => navigate('/tasks')}>
          Tasks
        </Menu.Item>
        
        <SubMenu key="workspaces" icon={<AppstoreOutlined />} title="Workspaces">
          <Menu.Item key="workspace1">Workspace 1</Menu.Item>
          <Menu.Item key="workspace2">Workspace 2</Menu.Item>
          <Menu.Item key="create-workspace">+ Create Workspace</Menu.Item>
        </SubMenu>
        
        <Menu.Item key="team" icon={<TeamOutlined />} onClick={() => navigate('/team')}>
          Team
        </Menu.Item>
        
        <Menu.Item key="settings" icon={<SettingOutlined />} onClick={() => navigate('/settings')}>
          Settings
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AppSidebar;