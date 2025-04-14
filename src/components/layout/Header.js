// src/components/layout/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = ({ toggleSidebar, user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="header-left">
        <button onClick={toggleSidebar} className="menu-toggle">
          <i className="bi bi-list"></i>
        </button>
        <div className="app-logo" onClick={() => navigate('/home')}>TaskManager</div>
      </div>
      
      <div className="header-right">
        <div className="user-info">
          <span>{user?.fullName}</span>
          <button onClick={logout} className="logout-btn">
            <i className="bi bi-box-arrow-right"></i> Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;