import React from 'react';
import { Form, Input, Button, Typography, Divider } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ChangePasswordForm = ({ onChangePassword }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    onChangePassword(values);
    form.resetFields();
  };

  return (
    <div className="change-password-form">
      <Title level={4}>Change Password</Title>
      <Text type="secondary">Update your password regularly to keep your account secure</Text>
      <Divider />

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[
            { required: true, message: 'Please enter your current password' }
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Enter your current password" 
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            { required: true, message: 'Please enter your new password' },
            { min: 8, message: 'Password must be at least 8 characters' }
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Enter your new password" 
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm New Password"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm your new password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Confirm your new password" 
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;