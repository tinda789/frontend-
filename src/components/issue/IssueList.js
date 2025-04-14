// src/components/issue/IssueList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Tag, Button, Input, Select } from 'antd';
import { issueService } from '../../api';
import IssueModal from './IssueModal';

const { Search } = Input;
const { Option } = Select;

const IssueList = ({ issues, workListId, onIssueCreated, onIssueDeleted }) => {
  const [filteredIssues, setFilteredIssues] = useState(issues);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (value) => {
    setSearchText(value);
    filterIssues(value, statusFilter);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    filterIssues(searchText, value);
  };

  const filterIssues = (text, status) => {
    let filtered = [...issues];
    
    if (text) {
      filtered = filtered.filter(issue => 
        issue.title.toLowerCase().includes(text.toLowerCase()) ||
        issue.key.toLowerCase().includes(text.toLowerCase())
      );
    }
    
    if (status !== 'all') {
      filtered = filtered.filter(issue => issue.status === status);
    }
    
    setFilteredIssues(filtered);
  };

  const handleCreateIssue = async (issueData) => {
    try {
      await issueService.create({
        ...issueData,
        workListId
      });
      setIsModalOpen(false);
      if (onIssueCreated) onIssueCreated();
    } catch (error) {
      console.error('Lỗi khi tạo issue:', error);
    }
  };

  const handleDeleteIssue = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
      try {
        await issueService.delete(id);
        if (onIssueDeleted) onIssueDeleted();
      } catch (error) {
        console.error('Lỗi khi xóa issue:', error);
      }
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

  const columns = [
    {
      title: 'Mã',
      dataIndex: 'key',
      key: 'key',
      render: (text, record) => <Link to={`/issues/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link to={`/issues/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={getStatusColor(status)}>
          {status === 'TODO' ? 'Cần làm' : 
           status === 'IN_PROGRESS' ? 'Đang làm' :
           status === 'REVIEW' ? 'Đang review' :
           status === 'DONE' ? 'Hoàn thành' : status}
        </Tag>
      ),
    },
    {
      title: 'Ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      render: priority => (
        <Tag color={getPriorityColor(priority)}>
          {priority === 'HIGH' ? 'Cao' : 
           priority === 'MEDIUM' ? 'Trung bình' :
           priority === 'LOW' ? 'Thấp' : priority}
        </Tag>
      ),
    },
    {
      title: 'Người được giao',
      dataIndex: 'assigneeName',
      key: 'assigneeName',
      render: (text, record) => text || 'Chưa giao',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="link" 
          danger 
          onClick={() => handleDeleteIssue(record.id)}
          icon={<i className="bi bi-trash"></i>}
        />
      ),
    },
  ];

  return (
    <div className="issue-list">
      <div className="filters-bar">
        <div className="search-filter">
          <Search
            placeholder="Tìm kiếm theo tiêu đề hoặc mã"
            onSearch={handleSearch}
            style={{ width: 300 }}
            allowClear
          />
        </div>
        
        <div className="status-filter">
          <span>Trạng thái: </span>
          <Select 
            defaultValue="all" 
            style={{ width: 150 }}
            onChange={handleStatusFilter}
          >
            <Option value="all">Tất cả</Option>
            <Option value="TODO">Cần làm</Option>
            <Option value="IN_PROGRESS">Đang làm</Option>
            <Option value="REVIEW">Đang review</Option>
            <Option value="DONE">Hoàn thành</Option>
          </Select>
        </div>
        
        <Button 
          type="primary" 
          onClick={() => setIsModalOpen(true)}
          icon={<i className="bi bi-plus"></i>}
        >
          Tạo công việc
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={filteredIssues}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      {isModalOpen && (
        <IssueModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateIssue}
          workListId={workListId}
        />
      )}
    </div>
  );
};

export default IssueList;