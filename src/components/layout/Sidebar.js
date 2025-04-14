// src/components/layout/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ collapsed }) => {
  const { user } = useAuth();

  return (
    <aside className={`app-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-user">
        <div className="user-avatar">{user?.fullName?.charAt(0)}</div>
        {!collapsed && <div className="user-name">{user?.fullName}</div>}
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/home" className={({isActive}) => isActive ? 'active' : ''}>
          <i className="bi bi-house"></i>
          {!collapsed && <span>Trang chủ</span>}
        </NavLink>
        
        <NavLink to="/workspaces" className={({isActive}) => isActive ? 'active' : ''}>
          <i className="bi bi-grid"></i>
          {!collapsed && <span>Không gian làm việc</span>}
        </NavLink>
        
        <NavLink to="/profile" className={({isActive}) => isActive ? 'active' : ''}>
          <i className="bi bi-person"></i>
          {!collapsed && <span>Hồ sơ</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;