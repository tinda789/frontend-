// src/components/workspace/WorkspaceDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { workspaceService, workListService, userService } from '../../api';
import WorkspaceModal from './WorkspaceModal';
import WorkListModal from '../worklist/WorkListModal';
import MemberModal from '../common/MemberModal';

const WorkspaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState(null);
  const [workLists, setWorkLists] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isWorkListModalOpen, setIsWorkListModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  useEffect(() => {
    fetchWorkspaceData();
  }, [id]);

  const fetchWorkspaceData = async () => {
    try {
      setLoading(true);
      const [workspaceRes, workListsRes] = await Promise.all([
        workspaceService.getById(id),
        workListService.getByWorkspace(id)
      ]);
      
      setWorkspace(workspaceRes.data);
      setWorkLists(workListsRes.data);
      
      if (workspaceRes.data.members) {
        setMembers(workspaceRes.data.members);
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu workspace:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditWorkspace = async (workspaceData) => {
    try {
      await workspaceService.update(id, workspaceData);
      setIsEditModalOpen(false);
      fetchWorkspaceData();
    } catch (error) {
      console.error('Lỗi khi cập nhật workspace:', error);
    }
  };

  const handleDeleteWorkspace = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa không gian làm việc này?')) {
      try {
        await workspaceService.delete(id);
        navigate('/workspaces');
      } catch (error) {
        console.error('Lỗi khi xóa workspace:', error);
      }
    }
  };

  const handleCreateWorkList = async (workListData) => {
    try {
      await workListService.create({
        ...workListData,
        workspaceId: id
      });
      setIsWorkListModalOpen(false);
      fetchWorkspaceData();
    } catch (error) {
      console.error('Lỗi khi tạo worklist:', error);
    }
  };

  const handleAddMember = async (userId) => {
    try {
      await workspaceService.addMember(id, userId);
      setIsMemberModalOpen(false);
      fetchWorkspaceData();
    } catch (error) {
      console.error('Lỗi khi thêm thành viên:', error);
    }
  };

  const handleRemoveMember = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thành viên này?')) {
      try {
        await workspaceService.removeMember(id, userId);
        fetchWorkspaceData();
      } catch (error) {
        console.error('Lỗi khi xóa thành viên:', error);
      }
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (!workspace) {
    return <div>Không tìm thấy không gian làm việc</div>;
  }

  return (
    <div className="workspace-detail">
      <div className="page-header">
        <div>
          <h1>{workspace.name}</h1>
          <p className="workspace-description">{workspace.description}</p>
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
            onClick={handleDeleteWorkspace}
          >
            <i className="bi bi-trash"></i> Xóa
          </button>
        </div>
      </div>

      <div className="content-grid">
        <div className="main-section">
          <div className="section-header">
            <h2>Danh sách dự án</h2>
            <button 
              className="btn-primary" 
              onClick={() => setIsWorkListModalOpen(true)}
            >
              <i className="bi bi-plus"></i> Tạo mới
            </button>
          </div>

          <div className="worklist-grid">
            {workLists.length > 0 ? (
              workLists.map(workList => (
                <div key={workList.id} className="worklist-card">
                  <h3>{workList.name}</h3>
                  <p>{workList.description}</p>
                  <div className="card-footer">
                    <Link to={`/worklists/${workList.id}`} className="btn-view">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>Chưa có dự án nào trong không gian làm việc này.</p>
                <button 
                  className="btn-primary" 
                  onClick={() => setIsWorkListModalOpen(true)}
                >
                  Tạo dự án đầu tiên
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="side-section">
          <div className="section-header">
            <h2>Thành viên</h2>
            <button 
              className="btn-secondary" 
              onClick={() => setIsMemberModalOpen(true)}
            >
              <i className="bi bi-person-plus"></i> Thêm
            </button>
          </div>

          <div className="members-list">
            {members.length > 0 ? (
              members.map(member => (
                <div key={member.id} className="member-item">
                  <div className="member-info">
                    <div className="member-avatar">{member.fullName?.charAt(0)}</div>
                    <div className="member-details">
                      <div className="member-name">{member.fullName}</div>
                      <div className="member-email">{member.email}</div>
                    </div>
                  </div>
                  <button 
                    className="btn-icon" 
                    onClick={() => handleRemoveMember(member.id)}
                    title="Xóa thành viên"
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </div>
              ))
            ) : (
              <p>Chưa có thành viên nào.</p>
            )}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <WorkspaceModal 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditWorkspace}
          initialData={workspace}
        />
      )}

      {isWorkListModalOpen && (
        <WorkListModal 
          isOpen={isWorkListModalOpen}
          onClose={() => setIsWorkListModalOpen(false)}
          onSubmit={handleCreateWorkList}
        />
      )}

      {isMemberModalOpen && (
        <MemberModal 
          isOpen={isMemberModalOpen}
          onClose={() => setIsMemberModalOpen(false)}
          onSubmit={handleAddMember}
          existingMemberIds={members.map(m => m.id)}
        />
      )}
    </div>
  );
};

export default WorkspaceDetail;