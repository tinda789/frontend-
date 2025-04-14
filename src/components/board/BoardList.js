// src/components/board/BoardList.js
import React, { useState } from 'react';
import { Button, Card, Empty } from 'antd';
import { boardService } from '../../api';
import BoardModal from './BoardModal';
import BoardDetail from './BoardDetail';

const BoardList = ({ boards, workListId, onBoardCreated, onBoardDeleted }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const handleCreateBoard = async (boardData) => {
    try {
      await boardService.create({
        ...boardData,
        workListId
      });
      setIsCreateModalOpen(false);
      if (onBoardCreated) onBoardCreated();
    } catch (error) {
      console.error('Lỗi khi tạo bảng:', error);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bảng này?')) {
      try {
        await boardService.delete(boardId);
        if (onBoardDeleted) onBoardDeleted();
      } catch (error) {
        console.error('Lỗi khi xóa bảng:', error);
      }
    }
  };

  return (
    <div className="board-list">
      <div className="section-header">
        <h2>Bảng</h2>
        <Button 
          type="primary" 
          onClick={() => setIsCreateModalOpen(true)}
        >
          <i className="bi bi-plus"></i> Tạo Bảng
        </Button>
      </div>

      {selectedBoard ? (
        <BoardDetail 
          board={selectedBoard}
          onBack={() => setSelectedBoard(null)}
          onBoardDeleted={onBoardDeleted}
        />
      ) : (
        <div className="boards-grid">
          {boards.length > 0 ? (
            boards.map(board => (
              <Card 
                key={board.id} 
                className="board-card"
                title={board.name}
                extra={
                  <Button 
                    type="link" 
                    onClick={() => setSelectedBoard(board)}
                  >
                    Xem chi tiết
                  </Button>
                }
                actions={[
                  <Button 
                    danger 
                    onClick={() => handleDeleteBoard(board.id)}
                  >
                    <i className="bi bi-trash"></i> Xóa
                  </Button>
                ]}
              >
                <p>{board.description || <em>Không có mô tả</em>}</p>
              </Card>
            ))
          ) : (
            <Empty description="Chưa có bảng nào" />
          )}
        </div>
      )}

      {isCreateModalOpen && (
        <BoardModal 
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateBoard}
        />
      )}
    </div>
  );
};

export default BoardList;