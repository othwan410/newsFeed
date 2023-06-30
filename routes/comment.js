const express = require('express');
const router = express.Router();

// 댓글 목록
let comments = [];

// 댓글 작성
router.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  res.sendStatus(200);
});

// 댓글 수정
router.put('/comments/:id', (req, res) => {
  const commentId = req.params.id;
  const updatedComment = req.body;
  const commentIndex = comments.findIndex(comment => comment.id === commentId);
  
  if (commentIndex !== -1) {
    comments[commentIndex] = updatedComment;
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// 댓글 삭제
router.delete('/comments/:id', (req, res) => {
  const commentId = req.params.id;
  const commentIndex = comments.findIndex(comment => comment.id === commentId);
  
  if (commentIndex !== -1) {
    comments.splice(commentIndex, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// 댓글 신고 저장
router.post('/comments/:id/declaration', (req, res) => {
  const commentId = req.params.id;
  const reason = req.body.reason;
  res.sendStatus(200);
});

module.exports = router;
