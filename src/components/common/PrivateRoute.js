import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = () => {
  const { isLoggedIn, loading, user } = useAuth();
  
  
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>
          <h2>Đang tải...</h2>
          <p>Kiểm tra phiên đăng nhập</p>
        </div>
      </div>
    );
  }
  
  // Debug info nếu không đăng nhập
  
  
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;