// src/components/sprint/SprintDetail.js
import React, { useState } from 'react';
import { Button, Card, List, Tag, Modal, DatePicker, Form } from 'antd';
import { sprintService, issueService } from '../../api';
import SprintModal from './SprintModal';
import moment from 'moment';

const { RangePicker } = DatePicker;

const SprintDetail = ({ sprint, issues, onBack, onSprintUpdated, onSprintDeleted }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStartSprintModalOpen, setIsStartSprintModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const sprintIssues = issues.filter(issue => issue.sprintId === sprint.id);
  const backlogIssues = issues.filter(issue => !issue.sprintId);

  const handleUpdateSprint = async (sprintData) => {
    try {
      await sprintService.update(sprint.id, sprintData);
      setIsEditModalOpen(false);
      if (onSprintUpdated) onSprintUpdated();
    } catch (error) {
      console.error('Lỗi khi cập nhật sprint:', error);
    }
  };

  const handleDeleteSprint = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sprint này?')) {
      try {
        await sprintService.delete(sprint.id);
        if (onSprintDeleted) onSprintDeleted();
        onBack();
      } catch (error) {
        console.error('Lỗi khi xóa sprint:', error);
      }
    }
  };

  const handleStartSprint = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const startDate = values.dateRange[0].format('YYYY-MM-DD');
      const endDate = values.dateRange[1].format('YYYY-MM-DD');
      
      await sprintService.startSprint(sprint.id, startDate, endDate);
      setIsStartSprintModalOpen(false);
      if (onSprintUpdated) onSprintUpdated();
    } catch (error) {
      console.error('Lỗi khi bắt đầu sprint:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteSprint = async () => {
    if (window.confirm('Bạn có chắc chắn muốn hoàn thành sprint này?')) {
      try {
        await sprintService.completeSprint(sprint.id);
        if (onSprintUpdated) onSprintUpdated();
      } catch (error) {
        console.error('Lỗi khi hoàn thành sprint:', error);
      }
    }
  };

  const handleAddIssueToSprint = async (issueId) => {
    try {
      await sprintService.addIssue(sprint.id, issueId);
      if (onSprintUpdated) onSprintUpdated();
    } catch (error) {
      console.error('Lỗi khi thêm issue vào sprint:', error);
    }
  };

  const handleRemoveIssueFromSprint = async (issueId) => {
    try {
      await sprintService.removeIssue(sprint.id, issueId);
      if (onSprintUpdated) onSprintUpdated();
    } catch (error) {
      console.error('Lỗi khi xóa issue khỏi sprint:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'TODO': return 'blue';
      case 'IN_PROGRESS': return 'orange';
      case 'REVIEW': return 'purple';
      case 'DONE': return 'green';
      default: return 'default';
    }
  };

  const getFormattedDateRange = () => {
    if (!sprint.startDate && !sprint.endDate) return 'Chưa bắt đầu';
    
    const startDate = sprint.startDate ? new Date(sprint.startDate).toLocaleDateString() : '';
    const endDate = sprint.endDate ? new Date(sprint.endDate).toLocaleDateString() : '';
    
    return `${startDate} - ${endDate}`;
  };

  return (
    <div className="sprint-detail">
      <div className="page-header">
        <Button onClick={onBack}>
          <i className="bi bi-arrow-left"></i> Quay lại
        </Button>
        <h1>Sprint: {sprint.name}</h1>
      </div>

      <div className="sprint-info-card">
        <Card>
          <div className="sprint-info-header">
            <div>
              <h2>{sprint.name}</h2>
              <Tag color={sprint.status === 'ACTIVE' ? 'green' : sprint.status === 'COMPLETED' ? 'gray' : 'blue'}>
                {sprint.status === 'ACTIVE' ? 'Đang hoạt động' : 
                 sprint.status === 'COMPLETED' ? 'Đã hoàn thành' : 'Backlog'}
              </Tag>
              <div className="sprint-dates">{getFormattedDateRange()}</div>
            </div>
            <div className="sprint-actions">
              <Button onClick={() => setIsEditModalOpen(true)}>
                <i className="bi bi-pencil"></i> Chỉnh sửa
              </Button>
              {sprint.status === 'BACKLOG' && (
                <>
                  <Button type="primary" onClick={() => setIsStartSprintModalOpen(true)}>
                    <i className="bi bi-play"></i> Bắt đầu Sprint
                  </Button>
                  <Button danger onClick={handleDeleteSprint}>
                    <i className="bi bi-trash"></i> Xóa
                  </Button>
                </>
              )}
              {sprint.status === 'ACTIVE' && (
                <Button type="primary" onClick={handleCompleteSprint}>
                  <i className="bi bi-check-circle"></i> Hoàn thành Sprint
                </Button>
              )}
            </div>
          </div>
          
          <div className="sprint-goal">
            <h3>Mục tiêu</h3>
            <p>{sprint.goal || <em>Không có mục tiêu</em>}</p>
          </div>
        </Card>
      </div>

      <div className="sprint-content">
        <div className="sprint-issues">
          <h3>Công việc trong Sprint</h3>
          <List
            dataSource={sprintIssues}
            renderItem={issue => (
              <List.Item
                actions={[
                  sprint.status === 'BACKLOG' && (
                    <Button 
                      onClick={() => handleRemoveIssueFromSprint(issue.id)}
                      size="small"
                    >
                      <i className="bi bi-x"></i> Xóa khỏi Sprint
                    </Button>
                  )
                ].filter(Boolean)}
              >
                <List.Item.Meta
                  title={
                    <div>
                      <span className="issue-key">{issue.key}</span>
                      <a href={`/issues/${issue.id}`}>{issue.title}</a>
                    </div>
                  }
                  description={
                    <div className="issue-info">
                      <Tag color={getStatusColor(issue.status)}>
                        {issue.status === 'TODO' ? 'Cần làm' : 
                         issue.status === 'IN_PROGRESS' ? 'Đang làm' :
                         issue.status === 'REVIEW' ? 'Đang review' :
                         issue.status === 'DONE' ? 'Hoàn thành' : issue.status}
                      </Tag>
                      <span className="issue-assignee">
                        {issue.assigneeName || 'Chưa giao'}
                      </span>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>

        {sprint.status === 'BACKLOG' && (
          <div className="backlog-issues">
            <h3>Backlog</h3>
            <List
              dataSource={backlogIssues}
              renderItem={issue => (
                <List.Item
                  actions={[
                    <Button 
                      onClick={() => handleAddIssueToSprint(issue.id)}
                      size="small"
                      type="primary"
                    >
                      <i className="bi bi-plus"></i> Thêm vào Sprint
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <div>
                        <span className="issue-key">{issue.key}</span>
                        <a href={`/issues/${issue.id}`}>{issue.title}</a>
                      </div>
                    }
                    description={
                      <div className="issue-info">
                        <Tag color={getStatusColor(issue.status)}>
                          {issue.status === 'TODO' ? 'Cần làm' : 
                           issue.status === 'IN_PROGRESS' ? 'Đang làm' :
                           issue.status === 'REVIEW' ? 'Đang review' :
                           issue.status === 'DONE' ? 'Hoàn thành' : issue.status}
                        </Tag>
                        <span className="issue-assignee">
                          {issue.assigneeName || 'Chưa giao'}
                        </span>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </div>

      {isEditModalOpen && (
        <SprintModal 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateSprint}
          initialData={sprint}
        />
      )}

      <Modal
        title="Bắt đầu Sprint"
        visible={isStartSprintModalOpen}
        onCancel={() => setIsStartSprintModalOpen(false)}
        onOk={handleStartSprint}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            dateRange: [moment(), moment().add(2, 'weeks')]
          }}
        >
          <Form.Item
            name="dateRange"
            label="Thời gian Sprint"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
          >
            <RangePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SprintDetail;