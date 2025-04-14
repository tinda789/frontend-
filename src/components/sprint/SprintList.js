// src/components/sprint/SprintList.js
import React, { useState } from 'react';
import { Button, Card, Tag, Empty, Tooltip } from 'antd';
import { sprintService } from '../../api';
import SprintModal from './SprintModal';
import SprintDetail from './SprintDetail';

const SprintList = ({ 
  sprints, 
  issues, 
  workListId, 
  onSprintCreated, 
  onSprintDeleted, 
  onSprintUpdated 
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedSprint, setSelectedSprint] = useState(null);

  const activeSprints = sprints.filter(sprint => sprint.status === 'ACTIVE');
  const backlogSprints = sprints.filter(sprint => sprint.status === 'BACKLOG');
  const completedSprints = sprints.filter(sprint => sprint.status === 'COMPLETED');

  const handleCreateSprint = async (sprintData) => {
    try {
      await sprintService.create({
        ...sprintData,
        workListId
      });
      setIsCreateModalOpen(false);
      if (onSprintCreated) onSprintCreated();
    } catch (error) {
      console.error('Lỗi khi tạo sprint:', error);
    }
  };

  const handleDeleteSprint = async (sprintId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sprint này?')) {
      try {
        await sprintService.delete(sprintId);
        if (onSprintDeleted) onSprintDeleted();
      } catch (error) {
        console.error('Lỗi khi xóa sprint:', error);
      }
    }
  };

  const getSprintStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'green';
      case 'BACKLOG': return 'blue';
      case 'COMPLETED': return 'gray';
      default: return 'default';
    }
  };

  const getFormattedDateRange = (sprint) => {
    if (!sprint.startDate && !sprint.endDate) return 'Chưa bắt đầu';
    
    const startDate = sprint.startDate ? new Date(sprint.startDate).toLocaleDateString() : '';
    const endDate = sprint.endDate ? new Date(sprint.endDate).toLocaleDateString() : '';
    
    return `${startDate} - ${endDate}`;
  };

  return (
    <div className="sprint-list">
      <div className="section-header">
        <h2>Sprints</h2>
        <Button 
          type="primary" 
          onClick={() => setIsCreateModalOpen(true)}
        >
          <i className="bi bi-plus"></i> Tạo Sprint
        </Button>
      </div>

      {selectedSprint ? (
        <SprintDetail 
          sprint={selectedSprint}
          issues={issues}
          onBack={() => setSelectedSprint(null)}
          onSprintUpdated={onSprintUpdated}
          onSprintDeleted={onSprintDeleted}
        />
      ) : (
        <div className="sprints-container">
          <div className="sprint-section">
            <h3>Active Sprint</h3>
            {activeSprints.length > 0 ? (
              activeSprints.map(sprint => (
                <Card 
                  key={sprint.id} 
                  className="sprint-card"
                  title={
                    <div className="sprint-card-header">
                      <span>{sprint.name}</span>
                      <Tag color={getSprintStatusColor(sprint.status)}>
                        Active
                      </Tag>
                    </div>
                  }
                  extra={
                    <Button 
                      type="link" 
                      onClick={() => setSelectedSprint(sprint)}
                    >
                      Xem chi tiết
                    </Button>
                  }
                >
                  <p className="sprint-goal">{sprint.goal || <em>Không có mục tiêu</em>}</p>
                  <div className="sprint-info">
                    <div className="sprint-dates">
                      <i className="bi bi-calendar"></i> {getFormattedDateRange(sprint)}
                    </div>
                    <div className="sprint-issues-count">
                      <Tooltip title="Số lượng công việc">
                        <span><i className="bi bi-card-checklist"></i> {sprint.issues?.length || 0}</span>
                      </Tooltip>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Empty description="Không có sprint đang hoạt động" />
            )}
          </div>

          <div className="sprint-section">
            <h3>Backlog</h3>
            {backlogSprints.length > 0 ? (
              backlogSprints.map(sprint => (
                <Card 
                  key={sprint.id} 
                  className="sprint-card"
                  title={
                    <div className="sprint-card-header">
                      <span>{sprint.name}</span>
                      <Tag color={getSprintStatusColor(sprint.status)}>
                        Backlog
                      </Tag>
                    </div>
                  }
                  extra={
                    <Button 
                      type="link" 
                      onClick={() => setSelectedSprint(sprint)}
                    >
                      Xem chi tiết
                    </Button>
                  }
                  actions={[
                    <Button 
                      danger 
                      onClick={() => handleDeleteSprint(sprint.id)}
                    >
                      <i className="bi bi-trash"></i> Xóa
                    </Button>
                  ]}
                >
                  <p className="sprint-goal">{sprint.goal || <em>Không có mục tiêu</em>}</p>
                  <div className="sprint-issues-count">
                    <Tooltip title="Số lượng công việc">
                      <span><i className="bi bi-card-checklist"></i> {sprint.issues?.length || 0}</span>
                    </Tooltip>
                  </div>
                </Card>
              ))
            ) : (
              <Empty description="Không có sprint trong backlog" />
            )}
          </div>

          <div className="sprint-section">
            <h3>Completed</h3>
            {completedSprints.length > 0 ? (
              completedSprints.map(sprint => (
                <Card 
                  key={sprint.id} 
                  className="sprint-card"
                  title={
                    <div className="sprint-card-header">
                      <span>{sprint.name}</span>
                      <Tag color={getSprintStatusColor(sprint.status)}>
                        Completed
                      </Tag>
                    </div>
                  }
                  extra={
                    <Button 
                      type="link" 
                      onClick={() => setSelectedSprint(sprint)}
                    >
                      Xem chi tiết
                    </Button>
                  }
                >
                  <p className="sprint-goal">{sprint.goal || <em>Không có mục tiêu</em>}</p>
                  <div className="sprint-info">
                    <div className="sprint-dates">
                      <i className="bi bi-calendar"></i> {getFormattedDateRange(sprint)}
                    </div>
                    <div className="sprint-issues-count">
                      <Tooltip title="Số lượng công việc">
                        <span><i className="bi bi-card-checklist"></i> {sprint.issues?.length || 0}</span>
                      </Tooltip>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Empty description="Không có sprint đã hoàn thành" />
            )}
          </div>
        </div>
      )}

      {isCreateModalOpen && (
        <SprintModal 
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateSprint}
        />
      )}
    </div>
  );
};

export default SprintList;