// src/components/Layout/AppHeader.jsx
import React from 'react';
import { Layout, Button, Menu, Input, Avatar, Dropdown, Badge, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';

const { Header } = Layout;
const { Search } = Input;

const AppHeader = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate('/profile')}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />} onClick={() => navigate('/settings')}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const createMenu = (
    <Menu>
      <Menu.Item key="project">Create Project</Menu.Item>
      <Menu.Item key="task">Create Task</Menu.Item>
      <Menu.Item key="workspace">Create Workspace</Menu.Item>
    </Menu>
  );

  return (
    <Header className="app-header">
      <div className="header-left">
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="Project Management" height="30" />
          </Link>
        </div>
        
        <Button 
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="trigger-button"
        />
        
        <Menu mode="horizontal" className="header-menu">
          <Menu.Item key="your-work" onClick={() => navigate('/dashboard')}>
            Your Work
          </Menu.Item>
          <Menu.Item key="projects" onClick={() => navigate('/projects')}>
            Projects
          </Menu.Item>
          <Menu.Item key="recent">
            Recent
          </Menu.Item>
          <Menu.Item key="starred">
            Starred
          </Menu.Item>
        </Menu>
      </div>
      
      <div className="header-right">
        <div className="search-box">
          <Search
            placeholder="Search"
            onSearch={value => console.log(value)}
            style={{ width: 220 }}
            prefix={<SearchOutlined />}
          />
        </div>
        
        <Space size="large">
          <Dropdown overlay={createMenu} placement="bottomRight">
            <Button type="primary" icon={<PlusOutlined />}>Create</Button>
          </Dropdown>
          
          <Badge count={5} size="small">
            <BellOutlined className="header-icon" />
          </Badge>
          
          <QuestionCircleOutlined className="header-icon" />
          
          <Dropdown overlay={userMenu} placement="bottomRight">
            <Avatar className="user-avatar" icon={<UserOutlined />}>
              {currentUser?.username?.charAt(0)?.toUpperCase()}
            </Avatar>
          </Dropdown>
        </Space>
      </div>
    </Header>
  );
};

export default AppHeader;