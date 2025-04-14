// src/components/issue/IssueModal.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { userService } from '../../api';

const { Option } = Select;
const { TextArea } = Input;

const IssueModal = ({ isOpen, onClose, onSubmit, initialData = {}, workListId }) => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
    
    if (initialData.id) {
      form.setFieldsValue({
        title: initialData.title,
        description: initialData.description,
        type: initialData.type || 'TASK',
        priority: initialData.priority || 'MEDIUM',
        assigneeId: initialData.assigneeId,
        status: initialData.status || 'TODO'
      });
    }
  }, [initialData, form]);

  const fetchUsers = async () => {
    try {
      const response = await userService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách người dùng:', error);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await onSubmit({
        ...values,
        workListId
      });
      form.resetFields();
    } catch (error) {
      console.error('Lỗi khi lưu công việc:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{initialData.id ? 'Chỉnh sửa' : 'Tạo mới'} công việc</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            type: 'TASK',
            priority: 'MEDIUM',
            status: 'TODO'
          }}
        >
          <div style={{ padding: '0 20px' }}>
            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
            >
              <Input placeholder="Nhập tiêu đề công việc" />
            </Form.Item>
            
            <Form.Item
              name="description"
              label="Mô tả"
            >
              <TextArea rows={4} placeholder="Mô tả chi tiết công việc" />
            </Form.Item>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Form.Item
                name="type"
                label="Loại"
              >
                <Select>
                  <Option value="TASK">Công việc</Option>
                  <Option value="BUG">Lỗi</Option>
                  <Option value="STORY">Story</Option>
                  <Option value="EPIC">Epic</Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                name="priority"
                label="Độ ưu tiên"
              >
                <Select>
                  <Option value="HIGH">Cao</Option>
                  <Option value="MEDIUM">Trung bình</Option>
                  <Option value="LOW">Thấp</Option>
                </Select>
              </Form.Item>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Form.Item
                name="assigneeId"
                label="Người được giao"
              >
                <Select
                  placeholder="Chọn người được giao"
                  allowClear
                >
                  {users.map(user => (
                    <Option key={user.id} value={user.id}>{user.fullName}</Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Form.Item
                name="status"
                label="Trạng thái"
              >
                <Select>
                  <Option value="TODO">Cần làm</Option>
                  <Option value="IN_PROGRESS">Đang làm</Option>
                  <Option value="REVIEW">Đang review</Option>
                  <Option value="DONE">Hoàn thành</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          
          <div className="modal-footer">
            <Button onClick={onClose}>
              Hủy bỏ
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {initialData.id ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default IssueModal;