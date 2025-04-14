// src/components/board/BoardModal.js
import React from 'react';
import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

const BoardModal = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{initialData.id ? 'Chỉnh sửa' : 'Tạo mới'} Bảng</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>
        
        <Form
          form={form}
          layout="vertical"
          initialValues={initialData}
          onFinish={handleSubmit}
        >
          <div style={{ padding: '0 20px' }}>
            <Form.Item
              name="name"
              label="Tên Bảng"
              rules={[{ required: true, message: 'Vui lòng nhập tên bảng' }]}
            >
              <Input placeholder="Nhập tên bảng" />
            </Form.Item>
            
            <Form.Item
              name="description"
              label="Mô tả"
            >
              <TextArea rows={3} placeholder="Mô tả về bảng" />
            </Form.Item>
          </div>
          
          <div className="modal-footer">
            <Button onClick={onClose}>
              Hủy bỏ
            </Button>
            <Button type="primary" htmlType="submit">
              {initialData.id ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BoardModal;