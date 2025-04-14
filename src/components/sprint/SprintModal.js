// src/components/sprint/SprintModal.js
import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd';
import moment from 'moment';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const SprintModal = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const dateRange = values.dateRange;
    const formattedData = {
      ...values,
      startDate: dateRange ? dateRange[0].format('YYYY-MM-DD') : null,
      endDate: dateRange ? dateRange[1].format('YYYY-MM-DD') : null
    };
    delete formattedData.dateRange;
    
    onSubmit(formattedData);
  };

  if (!isOpen) return null;

  // Set initial form values
  let initialValues = { ...initialData };
  if (initialData.startDate && initialData.endDate) {
    initialValues.dateRange = [
      moment(initialData.startDate),
      moment(initialData.endDate)
    ];
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{initialData.id ? 'Chỉnh sửa' : 'Tạo mới'} Sprint</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>
        
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={handleSubmit}
        >
          <div style={{ padding: '0 20px' }}>
            <Form.Item
              name="name"
              label="Tên Sprint"
              rules={[{ required: true, message: 'Vui lòng nhập tên sprint' }]}
            >
              <Input placeholder="Nhập tên sprint" />
            </Form.Item>
            
            <Form.Item
              name="goal"
              label="Mục tiêu"
            >
              <TextArea rows={3} placeholder="Mục tiêu của sprint này" />
            </Form.Item>
            
            <Form.Item
              name="dateRange"
              label="Thời gian"
            >
              <RangePicker 
                style={{ width: '100%' }} 
                format="DD/MM/YYYY" 
              />
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

export default SprintModal;