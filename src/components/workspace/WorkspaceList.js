// src/components/workspace/WorkspaceList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { workspaceService } from '../../api';
import WorkspaceModal from './WorkspaceModal';

const WorkspaceList = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);
      const response = await workspaceService.getAll();
      setWorkspaces(response.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách workspace:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkspace = async (workspaceData) => {
    try {
      await workspaceService.create(workspaceData);
      setIsModalOpen(false);
      fetchWorkspaces();
    } catch (error) {
      console.error('Lỗi khi tạo workspace:', error);
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="workspace-list-container">
      <div className="page-header">
        <h1>Không gian làm việc</h1>
        <button 
          className="btn-primary" 
          onClick={() => setIsModalOpen(true)}
        >
          <i className="bi bi-plus"></i> Tạo mới
        </button>
      </div>

      <div className="workspace-grid">
        {workspaces.length > 0 ? (
          workspaces.map(workspace => (
            <div key={workspace.id} className="workspace-card">
              <h3>{workspace.name}</h3>
              <p>{workspace.description}</p>
              <div className="card-footer">
                <Link to={`/workspaces/${workspace.id}`} className="btn-view">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>Bạn chưa có không gian làm việc nào.</p>
            <button 
              className="btn-primary" 
              onClick={() => setIsModalOpen(true)}
            >
              Tạo workspace đầu tiên
            </button>
          </div>
        )}
      </div>

      <WorkspaceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateWorkspace}
      />
    </div>
  );
};

export default WorkspaceList;