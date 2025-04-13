import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const { TextArea } = Input;

const CreateWorkspaceModal = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        form.resetFields();
        onCreate(values);
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
  open={visible}
  title="Tạo không gian làm việc mới"
  okText="Tạo"
  cancelText="Hủy"
  onCancel={onCancel}
  onOk={handleOk}
>
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Tên không gian làm việc"
          rules={[
            { required: true, message: 'Vui lòng nhập tên không gian làm việc!' },
            { min: 3, message: 'Tên phải có ít nhất 3 ký tự!' },
            { max: 50, message: 'Tên không được quá 50 ký tự!' }
          ]}
        >
          <Input placeholder="Nhập tên không gian làm việc" />
        </Form.Item>
        
        <Form.Item
          name="description"
          label="Mô tả"
        >
          <TextArea 
            placeholder="Mô tả ngắn gọn về không gian làm việc này"
            rows={4}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateWorkspaceModal;