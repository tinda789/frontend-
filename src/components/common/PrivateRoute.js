import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = () => {
  const { isLoggedIn, loading, user } = useAuth();
  
  console.log('[PrivateRoute] isLoggedIn:', isLoggedIn);
  console.log('[PrivateRoute] loading:', loading);
  console.log('[PrivateRoute] user:', user);
  console.log('[PrivateRoute] Token trong localStorage:', localStorage.getItem('token'));
  console.log('[PrivateRoute] User trong localStorage:', localStorage.getItem('user'));
  
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
  if (!isLoggedIn) {
    console.log('[PrivateRoute] Chuyển hướng tới login vì không đăng nhập');
  }
  
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;