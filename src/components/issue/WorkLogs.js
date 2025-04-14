// src/components/issue/WorkLogs.js
import React, { useState } from 'react';
import { Form, InputNumber, DatePicker, Button, List, Popconfirm } from 'antd';
import { workLogService } from '../../api';
import moment from 'moment';

const WorkLogs = ({ workLogs, issueId, onWorkLogAdded, onWorkLogDeleted }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      await workLogService.create({
        issueId,
        timeSpent: values.timeSpent,
        logDate: values.logDate.format('YYYY-MM-DD'),
        description: values.description
      });
      form.resetFields();
      if (onWorkLogAdded) onWorkLogAdded();
    } catch (error) {
      console.error('Lỗi khi thêm worklog:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (workLogId) => {
    try {
      await workLogService.delete(workLogId);
      if (onWorkLogDeleted) onWorkLogDeleted();
    } catch (error) {
      console.error('Lỗi khi xóa worklog:', error);
    }
  };

  return (
    <div className="worklogs-section">
      <div className="worklog-form">
        <Form
          form={form}
          layout="inline"
          onFinish={handleSubmit}
          initialValues={{
            logDate: moment(),
            timeSpent: 1
          }}
        >
          <Form.Item
            name="timeSpent"
            label="Thời gian (giờ)"
            rules={[{ required: true, message: 'Vui lòng nhập thời gian' }]}
          >
            <InputNumber min={0.25} step={0.25} style={{ width: '100px' }} />
          </Form.Item>
          
          <Form.Item
            name="logDate"
            label="Ngày"
            rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Mô tả"
          >
            <input type="text" placeholder="Mô tả về công việc đã làm" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Thêm worklog
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="worklog-total">
        Tổng thời gian: {calculateTotalTime(workLogs)} giờ
      </div>

      <List
        className="worklog-list"
        itemLayout="horizontal"
        dataSource={workLogs}
        renderItem={workLog => (
          <List.Item
            actions={[
              <Popconfirm
                title="Bạn có chắc chắn muốn xóa worklog này?"
                onConfirm={() => handleDelete(workLog.id)}
                okText="Đồng ý"
                cancelText="Hủy"
              >
                <Button type="link" danger>
                  <i className="bi bi-trash"></i>
                </Button>
              </Popconfirm>
            ]}
          >
            <List.Item.Meta
              title={
                <div className="worklog-header">
                  <span className="worklog-time">{workLog.timeSpent} giờ</span>
                  <span className="worklog-date">
                    {new Date(workLog.logDate).toLocaleDateString()}
                  </span>
                  <span className="worklog-author">{workLog.userName}</span>
                </div>
              }
              description={workLog.description || <em>Không có mô tả</em>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

const calculateTotalTime = (workLogs) => {
  return workLogs.reduce((total, log) => total + log.timeSpent, 0);
};

export default WorkLogs;