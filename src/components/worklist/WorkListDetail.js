// src/components/worklist/WorkListDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { workListService, issueService, sprintService, boardService } from '../../api';
import WorkListModal from './WorkListModal';
import SprintList from '../sprint/SprintList';
import IssueList from '../issue/IssueList';
import BoardList from '../board/BoardList';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const WorkListDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workList, setWorkList] = useState(null);
  const [issues, setIssues] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('issues');

  useEffect(() => {
    fetchWorkListData();
  }, [id]);

  const fetchWorkListData = async () => {
    try {
      setLoading(true);
      const [workListRes, issuesRes, sprintsRes, boardsRes] = await Promise.all([
        workListService.getById(id),
        issueService.getByWorkList(id),
        sprintService.getByWorkList(id),
        boardService.getByWorkList(id)
      ]);
      
      setWorkList(workListRes.data);
      setIssues(issuesRes.data);
      setSprints(sprintsRes.data);
      setBoards(boardsRes.data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu worklist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditWorkList = async (workListData) => {
    try {
      await workListService.update(id, workListData);
      setIsEditModalOpen(false);
      fetchWorkListData();
    } catch (error) {
      console.error('Lỗi khi cập nhật worklist:', error);
    }
  };

  const handleDeleteWorkList = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
      try {
        await workListService.delete(id);
        navigate(`/workspaces/${workList.workspaceId}`);
      } catch (error) {
        console.error('Lỗi khi xóa worklist:', error);
      }
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (!workList) {
    return <div>Không tìm thấy dự án</div>;
  }

  return (
    <div className="worklist-detail">
      <div className="page-header">
        <div>
          <div className="breadcrumb">
            <Link to={`/workspaces/${workList.workspaceId}`}>
              {workList.workspaceName}
            </Link>
            <span> / </span>
            <span>{workList.name}</span>
          </div>
          <h1>{workList.name}</h1>
          <p className="worklist-description">{workList.description}</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn-secondary" 
            onClick={() => setIsEditModalOpen(true)}
          >
            <i className="bi bi-pencil"></i> Chỉnh sửa
          </button>
          <button 
            className="btn-danger" 
            onClick={handleDeleteWorkList}
          >
            <i className="bi bi-trash"></i> Xóa
          </button>
        </div>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Công việc" key="issues">
          <IssueList 
            issues={issues} 
            workListId={id} 
            onIssueCreated={fetchWorkListData} 
            onIssueDeleted={fetchWorkListData}
          />
        </TabPane>
        <TabPane tab="Sprint" key="sprints">
          <SprintList 
            sprints={sprints}
            issues={issues}
            workListId={id}
            onSprintCreated={fetchWorkListData}
            onSprintDeleted={fetchWorkListData}
            onSprintUpdated={fetchWorkListData}
          />
        </TabPane>
        <TabPane tab="Bảng" key="boards">
          <BoardList 
            boards={boards}
            workListId={id}
            onBoardCreated={fetchWorkListData}
            onBoardDeleted={fetchWorkListData}
          />
        </TabPane>
      </Tabs>

      {isEditModalOpen && (
        <WorkListModal 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditWorkList}
          initialData={workList}
        />
      )}
    </div>
  );
};

export default WorkListDetail;