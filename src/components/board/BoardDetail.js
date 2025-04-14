// src/components/board/BoardDetail.js
import React, { useState, useEffect } from 'react';
import { Button, Card, Empty, Modal, Form, Input } from 'antd';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import { boardService, issueService } from '../../api';

const { TextArea } = Input;

const BoardDetail = ({ board, onBack, onBoardDeleted }) => {
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState(null);
  const [form] = Form.useForm();
  const [columnForm] = Form.useForm();

  useEffect(() => {
    fetchColumns();
  }, [board.id]);

  const fetchColumns = async () => {
    try {
      setLoading(true);
      const response = await boardService.getColumns(board.id);
      setColumns(response.data || []);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu cột:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBoard = async (values) => {
    try {
      await boardService.update(board.id, values);
      setIsEditModalOpen(false);
      setEditingBoard({ ...board, ...values });
    } catch (error) {
      console.error('Lỗi khi cập nhật bảng:', error);
    }
  };

  const handleDeleteBoard = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bảng này?')) {
      try {
        await boardService.delete(board.id);
        if (onBoardDeleted) onBoardDeleted();
        onBack();
      } catch (error) {
        console.error('Lỗi khi xóa bảng:', error);
      }
    }
  };

  const handleAddColumn = async (values) => {
    try {
      await boardService.createColumn({
        ...values,
        boardId: board.id
      });
      setIsAddColumnModalOpen(false);
      columnForm.resetFields();
      fetchColumns();
    } catch (error) {
      console.error('Lỗi khi thêm cột:', error);
    }
  };

  const handleDeleteColumn = async (columnId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cột này?')) {
      try {
        await boardService.deleteColumn(columnId, board.id);
        fetchColumns();
      } catch (error) {
        console.error('Lỗi khi xóa cột:', error);
      }
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination, type } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Reordering columns
    if (type === 'column') {
      if (source.index !== destination.index) {
        const newColumns = Array.from(columns);
        const [removed] = newColumns.splice(source.index, 1);
        newColumns.splice(destination.index, 0, removed);
        
        setColumns(newColumns);
        
        // Update the order in the backend
        const columnIds = newColumns.map(col => col.id);
        try {
          await boardService.reorderColumns(board.id, columnIds);
        } catch (error) {
          console.error('Lỗi khi cập nhật thứ tự cột:', error);
          // Revert to original order
          fetchColumns();
        }
      }
      return;
    }

    // Reordering or moving issues
    const sourceColumnId = source.droppableId;
    const destColumnId = destination.droppableId;
    
    if (sourceColumnId === destColumnId) {
      // Reordering within the same column
      const column = columns.find(col => col.id.toString() === sourceColumnId);
      if (!column) return;
      
      const newIssues = Array.from(column.issues || []);
      const [removed] = newIssues.splice(source.index, 1);
      newIssues.splice(destination.index, 0, removed);
      
      const newColumns = columns.map(col => {
        if (col.id.toString() === sourceColumnId) {
          return { ...col, issues: newIssues };
        }
        return col;
      });
      
      setColumns(newColumns);
      
      // TODO: Call API to update order
    } else {
      // Moving from one column to another
      const sourceColumn = columns.find(col => col.id.toString() === sourceColumnId);
      const destColumn = columns.find(col => col.id.toString() === destColumnId);
      
      if (!sourceColumn || !destColumn) return;
      
      const sourceIssues = Array.from(sourceColumn.issues || []);
      const destIssues = Array.from(destColumn.issues || []);
      
      const [removed] = sourceIssues.splice(source.index, 1);
      destIssues.splice(destination.index, 0, removed);
      
      const newColumns = columns.map(col => {
        if (col.id.toString() === sourceColumnId) {
          return { ...col, issues: sourceIssues };
        }
        if (col.id.toString() === destColumnId) {
          return { ...col, issues: destIssues };
        }
        return col;
      });
      
      setColumns(newColumns);
      
      // Call API to move issue
      try {
        await boardService.removeIssueFromColumn(sourceColumnId, removed.id, board.id);
        await boardService.addIssueToColumn(destColumnId, removed.id, board.id);
        
        // Update issue status based on the column status
        if (destColumn.status) {
          await issueService.updateStatus(removed.id, destColumn.status);
        }
      } catch (error) {
        console.error('Lỗi khi di chuyển công việc:', error);
        // Revert to original state
        fetchColumns();
      }
    }
  };

  const displayBoard = editingBoard || board;

  return (
    <div className="board-detail">
      <div className="page-header">
        <Button onClick={onBack}>
          <i className="bi bi-arrow-left"></i> Quay lại
        </Button>
        <h1>Bảng: {displayBoard.name}</h1>
        <div className="header-actions">
          <Button onClick={() => setIsEditModalOpen(true)}>
            <i className="bi bi-pencil"></i> Chỉnh sửa
          </Button>
          <Button danger onClick={handleDeleteBoard}>
            <i className="bi bi-trash"></i> Xóa
          </Button>
        </div>
      </div>

      <div className="board-description">
        <p>{displayBoard.description || <em>Không có mô tả</em>}</p>
      </div>

      <div className="board-actions">
        <Button 
          type="primary" 
          onClick={() => setIsAddColumnModalOpen(true)}
        >
          <i className="bi bi-plus"></i> Thêm cột
        </Button>
      </div>

      {loading ? (
        <div>Đang tải dữ liệu...</div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="board" type="column" direction="horizontal">
            {(provided) => (
              <div 
                className="board-columns-container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columns.length > 0 ? (
                  columns.map((column, index) => (
                    <Draggable 
                      key={column.id.toString()} 
                      draggableId={column.id.toString()} 
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="board-column"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div 
                            className="column-header" 
                            {...provided.dragHandleProps}
                          >
                            <h3>{column.name}</h3>
                            <Button 
                              type="link" 
                              danger
                              onClick={() => handleDeleteColumn(column.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </div>
                          
                          <Droppable droppableId={column.id.toString()} type="issue">
                            {(provided, snapshot) => (
                              <div
                                className={`column-issues ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                {column.issues && column.issues.length > 0 ? (
                                  column.issues.map((issue, index) => (
                                    <Draggable
                                      key={issue.id.toString()}
                                      draggableId={issue.id.toString()}
                                      index={index}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                          className={`issue-card ${snapshot.isDragging ? 'dragging' : ''}`}
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <div className="issue-key">{issue.key}</div>
                                          <div className="issue-title">
                                            <a href={`/issues/${issue.id}`}>{issue.title}</a>
                                          </div>
                                          {issue.assigneeName && (
                                            <div className="issue-assignee">
                                              {issue.assigneeName}
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </Draggable>
                                  ))
                                ) : (
                                  <div className="empty-column">
                                    <em>Không có công việc</em>
                                  </div>
                                )}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <Empty description="Chưa có cột nào" />
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      <Modal
        title="Chỉnh sửa Bảng"
        visible={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={board}
          onFinish={handleUpdateBoard}
        >
          <Form.Item
            name="name"
            label="Tên Bảng"
            rules={[{ required: true, message: 'Vui lòng nhập tên bảng' }]}
          >
            <Input placeholder="Nhập tên bảng" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Mô tả"
          >
            <TextArea rows={3} placeholder="Mô tả về bảng" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={() => setIsEditModalOpen(false)}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Thêm Cột Mới"
        visible={isAddColumnModalOpen}
        onCancel={() => setIsAddColumnModalOpen(false)}
        footer={null}
      >
        <Form
          form={columnForm}
          layout="vertical"
          onFinish={handleAddColumn}
        >
          <Form.Item
            name="name"
            label="Tên Cột"
            rules={[{ required: true, message: 'Vui lòng nhập tên cột' }]}
          >
            <Input placeholder="Nhập tên cột" />
          </Form.Item>
          
          <Form.Item
            name="status"
            label="Trạng thái tương ứng"
          >
            <Input placeholder="Trạng thái tương ứng (TODO, IN_PROGRESS, REVIEW, DONE)" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={() => setIsAddColumnModalOpen(false)}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BoardDetail;