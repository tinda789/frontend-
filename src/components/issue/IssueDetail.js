// src/components/issue/IssueDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Tabs, Button, Tag, Dropdown, Menu } from 'antd';
import { 
  issueService, 
  commentService, 
  attachmentService,
  workLogService,
  customFieldService 
} from '../../api';
import IssueModal from './IssueModal';
import Comments from './Comments';
import Attachments from './Attachments';
import WorkLogs from './WorkLogs';
import CustomFields from './CustomFields';

const { TabPane } = Tabs;

const IssueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [workLogs, setWorkLogs] = useState([]);
  const [customFields, setCustomFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchIssueData();
  }, [id]);

  const fetchIssueData = async () => {
    try {
      setLoading(true);
      const [
        issueRes, 
        commentsRes, 
        attachmentsRes,
        workLogsRes,
        customFieldsRes
      ] = await Promise.all([
        issueService.getById(id),
        commentService.getByIssue(id),
        attachmentService.getByIssue(id),
        workLogService.getByIssue(id),
        customFieldService.getByIssue(id)
      ]);
      
      setIssue(issueRes.data);
      setComments(commentsRes.data);
      setAttachments(attachmentsRes.data);
      setWorkLogs(workLogsRes.data);
      setCustomFields(customFieldsRes.data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu issue:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateIssue = async (issueData) => {
    try {
      await issueService.update(id, issueData);
      setIsEditModalOpen(false);
      fetchIssueData();
    } catch (error) {
      console.error('Lỗi khi cập nhật issue:', error);
    }
  };

  const handleDeleteIssue = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
      try {
        await issueService.delete(id);
        navigate(`/worklists/${issue.workListId}`);
      } catch (error) {
        console.error('Lỗi khi xóa issue:', error);
      }
    }
  };

  const handleUpdateStatus = async (status) => {
    try {
      await issueService.updateStatus(id, status);
      fetchIssueData();
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return 'red';
      case 'MEDIUM': return 'orange';
      case 'LOW': return 'green';
      default: return 'default';
    }
  };

  const statusMenu = (
    <Menu onClick={({key}) => handleUpdateStatus(key)}>
      <Menu.Item key="TODO">Cần làm</Menu.Item>
      <Menu.Item key="IN_PROGRESS">Đang làm</Menu.Item>
      <Menu.Item key="REVIEW">Đang review</Menu.Item>
      <Menu.Item key="DONE">Hoàn thành</Menu.Item>
    </Menu>
  );

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (!issue) {
    return <div>Không tìm thấy công việc</div>;
  }

  const issueTypeIcon = {
    TASK: <i className="bi bi-check-circle"></i>,
    BUG: <i className="bi bi-bug"></i>,
    STORY: <i className="bi bi-book"></i>,
    EPIC: <i className="bi bi-stars"></i>
  };

  return (
    <div className="issue-detail">
      <div className="breadcrumb">
        <Link to={`/worklists/${issue.workListId}`}>
          {issue.workListName}
        </Link>
        <span> / </span>
        <span>{issue.key}</span>
      </div>

      <div className="issue-header">
        <div className="issue-title-section">
          <div className="issue-type-and-key">
            <span className="issue-type-icon">{issueTypeIcon[issue.type] || issueTypeIcon.TASK}</span>
            <span className="issue-key">{issue.key}</span>
          </div>
          <h1 className="issue-title">{issue.title}</h1>
        </div>
        
        <div className="issue-actions">
          <Button onClick={() => setIsEditModalOpen(true)}>
            <i className="bi bi-pencil"></i> Chỉnh sửa
          </Button>
          <Button danger onClick={handleDeleteIssue}>
            <i className="bi bi-trash"></i> Xóa
          </Button>
        </div>
      </div>

      <div className="issue-content">
        <div className="issue-main">
          <div className="issue-description">
            <h3>Mô tả</h3>
            <div className="description-content">
              {issue.description || <em>Không có mô tả</em>}
            </div>
          </div>

          <Tabs defaultActiveKey="comments">
            <TabPane tab="Bình luận" key="comments">
              <Comments 
                comments={comments} 
                issueId={id} 
                onCommentAdded={fetchIssueData} 
                onCommentDeleted={fetchIssueData}
              />
            </TabPane>
            <TabPane tab="Tệp đính kèm" key="attachments">
              <Attachments 
                attachments={attachments} 
                issueId={id} 
                onAttachmentAdded={fetchIssueData} 
                onAttachmentDeleted={fetchIssueData}
              />
            </TabPane>
            <TabPane tab="Thời gian làm việc" key="worklogs">
              <WorkLogs 
                workLogs={workLogs} 
                issueId={id} 
                onWorkLogAdded={fetchIssueData} 
                onWorkLogDeleted={fetchIssueData}
              />
            </TabPane>
          </Tabs>
        </div>
        
        <div className="issue-sidebar">
          <div className="sidebar-section">
            <div className="section-label">Trạng thái</div>
            <Dropdown overlay={statusMenu} trigger={['click']}>
              <Tag color={getStatusColor(issue.status)} style={{cursor: 'pointer'}}>
                {issue.status === 'TODO' ? 'Cần làm' : 
                 issue.status === 'IN_PROGRESS' ? 'Đang làm' :
                 issue.status === 'REVIEW' ? 'Đang review' :
                 issue.status === 'DONE' ? 'Hoàn thành' : issue.status}
              </Tag>
            </Dropdown>
          </div>
          
          <div className="sidebar-section">
            <div className="section-label">Ưu tiên</div>
            <Tag color={getPriorityColor(issue.priority)}>
              {issue.priority === 'HIGH' ? 'Cao' : 
               issue.priority === 'MEDIUM' ? 'Trung bình' :
               issue.priority === 'LOW' ? 'Thấp' : issue.priority}
            </Tag>
          </div>
          
          <div className="sidebar-section">
            <div className="section-label">Người được giao</div>
            <div className="assignee">
              {issue.assigneeName ? (
                <div className="user-info">
                  <div className="user-avatar">{issue.assigneeName.charAt(0)}</div>
                  <span>{issue.assigneeName}</span>
                </div>
              ) : (
                <span className="no-assignee">Chưa giao</span>
              )}
            </div>
          </div>
          
          <div className="sidebar-section">
            <div className="section-label">Người tạo</div>
            <div className="user-info">
              <div className="user-avatar">{issue.reporterName?.charAt(0)}</div>
              <span>{issue.reporterName}</span>
            </div>
          </div>
          
          <div className="sidebar-section">
            <div className="section-label">Thời gian tạo</div>
            <div>{new Date(issue.createdAt).toLocaleString()}</div>
          </div>

          <div className="sidebar-section">
            <div className="section-label">Trường tùy chỉnh</div>
            <CustomFields 
              fields={customFields} 
              issueId={id} 
              onFieldUpdated={fetchIssueData} 
            />
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <IssueModal 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateIssue}
          initialData={issue}
          workListId={issue.workListId}
        />
      )}
    </div>
  );
};

export default IssueDetail;