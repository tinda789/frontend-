import React from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker, Typography, Divider } from 'antd';
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;

const ProfileInfo = ({ user, onUpdate }) => {
  const [form] = Form.useForm();

  // Đặt giá trị ban đầu cho form
  React.useEffect(() => {
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      department: user.department || '',
      role: user.role || '',
      // Các trường khác nếu cần
    });
  }, [user, form]);

  const handleSubmit = (values) => {
    onUpdate(values);
  };

  return (
    <div className="profile-info">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Title level={4}>Personal Information</Title>
          <Text type="secondary">Update your personal information and contact details</Text>
          <Divider />
        </Col>
        
        <Col span={24}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              username: user.username,
              email: user.email,
              fullName: user.fullName,
              department: user.department || '',
              role: user.role || '',
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true, message: 'Username is required' }]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Email is required' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="fullName"
                  label="Full Name"
                  rules={[{ required: true, message: 'Full name is required' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="department"
                  label="Department"
                >
                  <Select placeholder="Select department">
                    <Option value="engineering">Engineering</Option>
                    <Option value="marketing">Marketing</Option>
                    <Option value="sales">Sales</Option>
                    <Option value="hr">Human Resources</Option>
                    <Option value="finance">Finance</Option>
                  </Select>
                </Form.Item>
              </Col>
              
              <Col span={12}>
                <Form.Item
                  name="role"
                  label="Role"
                >
                  <Select placeholder="Select role">
                    <Option value="developer">Developer</Option>
                    <Option value="designer">Designer</Option>
                    <Option value="manager">Manager</Option>
                    <Option value="admin">Administrator</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            <Row>
              <Col span={24}>
                <div className="profile-info-subscription">
                  <Title level={5}>Subscription Information</Title>
                  <Text>Current Plan: <strong>{user.subscription?.name || 'Free'}</strong></Text>
                  {user.subscription?.expiryDate && (
                    <Text> (Expires: {moment(user.subscription.expiryDate).format('MMMM D, YYYY')})</Text>
                  )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={24} style={{ textAlign: 'right', marginTop: 24 }}>
                <Button type="primary" htmlType="submit">
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileInfo;