// src/components/issue/Comments.js
import React, { useState } from 'react';
import { Button, Input, List, Avatar, Popconfirm } from 'antd';
import { commentService } from '../../api';
import { useAuth } from '../../context/AuthContext';

const { TextArea } = Input;

const Comments = ({ comments, issueId, onCommentAdded, onCommentDeleted }) => {
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    
    try {
      setSubmitting(true);
      await commentService.create({
        content: newComment,
        issueId
      });
      setNewComment('');
      if (onCommentAdded) onCommentAdded();
    } catch (error) {
      console.error('Lỗi khi thêm bình luận:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await commentService.delete(commentId);
      if (onCommentDeleted) onCommentDeleted();
    } catch (error) {
      console.error('Lỗi khi xóa bình luận:', error);
    }
  };

  return (
    <div className="comments-section">
      <div className="comment-form">
        <TextArea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Thêm bình luận..."
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={submitting}
          disabled={!newComment.trim()}
          style={{ marginTop: 10 }}
        >
          Gửi bình luận
        </Button>
      </div>

      <List
        className="comment-list"
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={comment => (
          <List.Item
            actions={[
              comment.userId === user?.id && (
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa bình luận này?"
                  onConfirm={() => handleDelete(comment.id)}
                  okText="Đồng ý"
                  cancelText="Hủy"
                >
                  <Button type="link" danger>
                    <i className="bi bi-trash"></i>
                  </Button>
                </Popconfirm>
              )
            ].filter(Boolean)}
          >
            <List.Item.Meta
              avatar={<Avatar>{comment.userName?.charAt(0)}</Avatar>}
              title={
                <div className="comment-header">
                  <span className="comment-author">{comment.userName}</span>
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
              }
              description={
                <div className="comment-content">{comment.content}</div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Comments;