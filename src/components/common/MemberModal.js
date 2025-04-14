// src/components/common/MemberModal.js
import React, { useState, useEffect } from 'react';
import { Form, Select, Button } from 'antd';
import { userService } from '../../api';

const { Option } = Select;

const MemberModal = ({ isOpen, onClose, onSubmit, existingMemberIds = [] }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUsers();
      setUsers(response.data || []);
    } catch (error) {
      console.error('Lỗi khi tải danh sách người dùng:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedUserId) return;
    await onSubmit(selectedUserId);
    setSelectedUserId(null);
  };

  const filteredUsers = users.filter(user => !existingMemberIds.includes(user.id));

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Thêm thành viên</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>
        
        <div style={{ padding: '0 20px 20px' }}>
          <Form layout="vertical">
            <Form.Item
              label="Chọn người dùng"
              required
            >
              <Select
                placeholder="Tìm kiếm người dùng"
                value={selectedUserId}
                onChange={setSelectedUserId}
                loading={loading}
                notFoundContent={loading ? 'Đang tải...' : 'Không tìm thấy người dùng'}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {filteredUsers.map(user => (
                  <Option key={user.id} value={user.id}>
                    {user.fullName} ({user.email})
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </div>
        
        <div className="modal-footer">
          <Button onClick={onClose}>
            Hủy bỏ
          </Button>
          <Button 
            type="primary" 
            onClick={handleSubmit}
            disabled={!selectedUserId}
          >
            Thêm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemberModal;