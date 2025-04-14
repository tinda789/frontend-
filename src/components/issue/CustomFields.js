// src/components/issue/CustomFields.js
import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, List } from 'antd';
import { customFieldService } from '../../api';
import moment from 'moment';

const CustomFields = ({ fields, issueId, onFieldUpdated }) => {
  const [editingField, setEditingField] = useState(null);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleEdit = (field) => {
    setEditingField(field);
    let value = field.value;
    
    // Convert datetime string to moment object for DatePicker
    if (field.fieldType === 'DATE' && value) {
      value = moment(value);
    }
    
    form.setFieldsValue({ value });
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const values = await form.validateFields();
      
      let value = values.value;
      // Convert moment object to string for date fields
      if (editingField.fieldType === 'DATE' && value) {
        value = value.format('YYYY-MM-DD');
      }
      
      await customFieldService.setValue({
        fieldId: editingField.fieldId,
        issueId,
        value
      });
      
      setEditingField(null);
      if (onFieldUpdated) onFieldUpdated();
    } catch (error) {
      console.error('Lỗi khi cập nhật trường tùy chỉnh:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderFieldValue = (field) => {
    if (editingField && editingField.fieldId === field.fieldId) {
      return (
        <Form
          form={form}
          layout="inline"
          onFinish={handleSubmit}
        >
          {renderFieldEditor(field)}
        </Form>
      );
    }
    
    return (
      <div className="field-value" onClick={() => handleEdit(field)}>
        {renderDisplayValue(field)}
      </div>
    );
  };

  const renderFieldEditor = (field) => {
    const fieldType = field.fieldType;
    
    switch (fieldType) {
      case 'TEXT':
        return (
          <>
            <Form.Item
              name="value"
              style={{ marginBottom: 0, marginRight: 8 }}
            >
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting} size="small">
              Lưu
            </Button>
            <Button 
              onClick={() => setEditingField(null)} 
              size="small" 
              style={{ marginLeft: 8 }}
            >
              Hủy
            </Button>
          </>
        );
      
      case 'NUMBER':
        return (
          <>
            <Form.Item
              name="value"
              style={{ marginBottom: 0, marginRight: 8 }}
            >
              <Input type="number" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting} size="small">
              Lưu
            </Button>
            <Button 
              onClick={() => setEditingField(null)} 
              size="small" 
              style={{ marginLeft: 8 }}
            >
              Hủy
            </Button>
          </>
        );
      
      case 'DATE':
        return (
          <>
            <Form.Item
              name="value"
              style={{ marginBottom: 0, marginRight: 8 }}
            >
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting} size="small">
              Lưu
            </Button>
            <Button 
              onClick={() => setEditingField(null)} 
              size="small" 
              style={{ marginLeft: 8 }}
            >
              Hủy
            </Button>
          </>
        );
      
      case 'SELECT':
        return (
          <>
            <Form.Item
              name="value"
              style={{ marginBottom: 0, marginRight: 8 }}
            >
              <Select style={{ width: 200 }}>
                {field.options?.split(',').map(option => (
                  <Select.Option key={option.trim()} value={option.trim()}>
                    {option.trim()}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting} size="small">
              Lưu
            </Button>
            <Button 
              onClick={() => setEditingField(null)} 
              size="small" 
              style={{ marginLeft: 8 }}
            >
              Hủy
            </Button>
          </>
        );
      
      default:
        return (
          <>
            <Form.Item
              name="value"
              style={{ marginBottom: 0, marginRight: 8 }}
            >
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting} size="small">
              Lưu
            </Button>
            <Button 
              onClick={() => setEditingField(null)} 
              size="small" 
              style={{ marginLeft: 8 }}
            >
              Hủy
            </Button>
          </>
        );
    }
  };

  const renderDisplayValue = (field) => {
    const value = field.value;
    const fieldType = field.fieldType;
    
    if (!value) return <em>Chưa có giá trị</em>;
    
    switch (fieldType) {
      case 'DATE':
        return new Date(value).toLocaleDateString();
      default:
        return value;
    }
  };

  return (
    <div className="custom-fields-section">
      <List
        className="custom-field-list"
        itemLayout="horizontal"
        dataSource={fields}
        renderItem={field => (
          <List.Item>
            <List.Item.Meta
              title={field.fieldName}
              description={renderFieldValue(field)}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default CustomFields;