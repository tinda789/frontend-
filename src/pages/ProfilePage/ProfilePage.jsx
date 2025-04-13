import React, { useState, useEffect } from 'react';
import { Tabs, Card, Spin, message } from 'antd';
import { MainLayout } from '../../components/Layout';
import ProfileInfo from './components/ProfileInfo';
import ChangePasswordForm from './components/ChangePasswordForm';
import ProfileAvatar from './components/ProfileAvatar';
import ActivityHistory from './components/ActivityHistory';
import { authService } from '../../api';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data để phát triển UI khi chưa có API
  const mockUser = {
    id: 1,
    username: 'johndoe',
    email: 'john.doe@example.com',
    fullName: 'John Doe',
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    role: 'Developer',
    department: 'Engineering',
    joinDate: '2023-01-15',
    lastLogin: '2023-10-20T10:30:45',
    subscription: {
      name: 'Pro',
      expiryDate: '2024-01-15'
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        // Thử lấy dữ liệu từ API thực tế
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          // Fallback to mock data during development
          console.log('Using mock data for profile page');
          setUser(mockUser);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        message.error('Failed to load user profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async (values) => {
    try {
      setLoading(true);
      
      // Thử cập nhật qua API thực tế
      try {
        await authService.updateProfile(values);
        setUser(prev => ({ ...prev, ...values }));
        message.success('Profile updated successfully');
      } catch (error) {
        // Mock update during development
        setUser(prev => ({ ...prev, ...values }));
        message.success('Profile updated successfully (mock)');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      message.error('Failed to update profile');
      setLoading(false);
    }
  };

  const handleChangePassword = async (values) => {
    try {
      setLoading(true);
      
      try {
        await authService.changePassword(values.currentPassword, values.newPassword);
        message.success('Password changed successfully');
      } catch (error) {
        // Mock during development
        message.success('Password changed successfully (mock)');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to change password:', error);
      message.error('Failed to change password');
      setLoading(false);
    }
  };

  const handleAvatarUpdate = async (file) => {
    try {
      setLoading(true);
      
      // Thử upload qua API thực tế (giả định có uploadAvatar trong authService)
      try {
        const avatarUrl = await authService.uploadAvatar(file);
        setUser(prev => ({ ...prev, avatarUrl }));
        message.success('Avatar updated successfully');
      } catch (error) {
        // Mock during development
        const mockUrl = URL.createObjectURL(file);
        setUser(prev => ({ ...prev, avatarUrl: mockUrl }));
        message.success('Avatar updated successfully (mock)');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to update avatar:', error);
      message.error('Failed to update avatar');
      setLoading(false);
    }
  };

  const items = [
    {
      key: 'profile',
      label: 'Personal Information',
      children: user && (
        <ProfileInfo user={user} onUpdate={handleUpdateProfile} />
      )
    },
    {
      key: 'password',
      label: 'Change Password',
      children: <ChangePasswordForm onChangePassword={handleChangePassword} />
    },
    {
      key: 'activity',
      label: 'Recent Activity',
      children: <ActivityHistory userId={user?.id} />
    }
  ];

  if (loading && !user) {
    return (
      <MainLayout>
        <div className="profile-loading">
          <Spin size="large" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="profile-page-container">
        <div className="profile-header">
          <ProfileAvatar user={user} onAvatarUpdate={handleAvatarUpdate} />
        </div>
        
        <Card className="profile-content">
          <Tabs items={items} />
        </Card>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;