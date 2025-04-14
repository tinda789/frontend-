// src/components/dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { workspaceService, issueService } from '../../api';

const Dashboard = () => {
  const [recentWorkspaces, setRecentWorkspaces] = useState([]);
  const [assignedIssues, setAssignedIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [workspacesRes, issuesRes] = await Promise.all([
          workspaceService.getAll(),
          issueService.getAssigned()
        ]);
        
        setRecentWorkspaces(workspacesRes.data.slice(0, 5));
        setAssignedIssues(issuesRes.data.slice(0, 10));
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Bảng điều khiển</h1>
      
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Không gian làm việc gần đây</h2>
          <Link to="/workspaces">Xem tất cả</Link>
        </div>
        
        <div className="workspace-cards">
          {recentWorkspaces.length > 0 ? (
            recentWorkspaces.map(workspace => (
              <div key={workspace.id} className="workspace-card">
                <h3>{workspace.name}</h3>
                <p>{workspace.description}</p>
                <Link to={`/workspaces/${workspace.id}`}>Xem chi tiết</Link>
              </div>
            ))
          ) : (
            <p>Bạn chưa có không gian làm việc nào. <Link to="/workspaces/new">Tạo mới</Link></p>
          )}
        </div>
      </div>
      
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Công việc của tôi</h2>
        </div>
        
        <div className="issues-list">
          {assignedIssues.length > 0 ? (
            <table className="issues-table">
              <thead>
                <tr>
                  <th>Mã</th>
                  <th>Tiêu đề</th>
                  <th>Trạng thái</th>
                  <th>Ưu tiên</th>
                </tr>
              </thead>
              <tbody>
                {assignedIssues.map(issue => (
                  <tr key={issue.id}>
                    <td>{issue.key}</td>
                    <td>
                      <Link to={`/issues/${issue.id}`}>{issue.title}</Link>
                    </td>
                    <td>{issue.status}</td>
                    <td>{issue.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Bạn chưa được giao công việc nào.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;