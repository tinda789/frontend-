// src/components/Layout/MainLayout.jsx
import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Button } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  ProjectOutlined,
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  SearchOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import './Layout.css';

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy path hiện tại để tạo breadcrumb
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const title = snippet.charAt(0).toUpperCase() + snippet.slice(1);
    return (
      <Breadcrumb.Item key={url}>
        <a onClick={() => navigate(url)}>{title}</a>
      </Breadcrumb.Item>
    );
  });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <Layout>
        <AppSidebar collapsed={collapsed} />
        
        <Layout className="site-layout">
          <div className="breadcrumb-container">
            <Breadcrumb style={{ margin: '16px 24px' }}>
              <Breadcrumb.Item>
                <a onClick={() => navigate('/')}>Home</a>
              </Breadcrumb.Item>
              {breadcrumbItems}
            </Breadcrumb>
          </div>
          
          <Content className="site-layout-content">
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;