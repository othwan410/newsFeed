const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

// MongoDB 연결 설정
const url = 'mongodb://localhost:27017'; // MongoDB 연결 URL
const dbName = 'mydatabase'; // 사용할 데이터베이스 이름

// 댓글 목록
router.get('/comments', (req, res) => {
  // MongoDB에서 댓글 컬렉션을 가져온 후 댓글 목록을 반환
  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.error('Failed to connect to database:', err);
      res.sendStatus(500);
      return;
    }

    const db = client.db(dbName);
    const commentsCollection = db.collection('comments');

    commentsCollection.find().toArray((err, comments) => {
      if (err) {
        console.error('Failed to fetch comments from database:', err);
        res.sendStatus(500);
      } else {
        res.json(comments);
      }

      client.close();
    });
  });
});

// 댓글 작성
router.post('/comments', (req, res) => {
  const newComment = req.body;

  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.error('Failed to connect to database:', err);
      res.sendStatus(500);
      return;
    }

    const db = client.db(dbName);
    const commentsCollection = db.collection('comments');

    commentsCollection.insertOne(newComment, (err, result) => {
      if (err) {
        console.error('Failed to insert comment into database:', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }

      client.close();
    });
  });
});

// 댓글 수정
router.put('/comments/:id', (req, res) => {
  const commentId = req.params.id;
  const updatedComment = req.body;

  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.error('Failed to connect to database:', err);
      res.sendStatus(500);
      return;
    }

    const db = client.db(dbName);
    const commentsCollection = db.collection('comments');

    commentsCollection.updateOne(
      { id: commentId },
      { $set: updatedComment },
      (err, result) => {
        if (err) {
          console.error('Failed to update comment in database:', err);
          res.sendStatus(500);
        } else if (result.matchedCount === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(200);
        }

        client.close();
      }
    );
  });
});

// 댓글 삭제
router.delete('/comments/:id', (req, res) => {
  const commentId = req.params.id;

  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.error('Failed to connect to database:', err);
      res.sendStatus(500);
      return;
    }

    const db = client.db(dbName);
    const commentsCollection = db.collection('comments');

    commentsCollection.deleteOne({ id: commentId }, (err, result) => {
      if (err) {
        console.error('Failed to delete comment from database:', err);
        res.sendStatus(500);
      } else if (result.deletedCount === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }

      client.close();
    });
  });
});

// 댓글 신고 저장
router.post('/comments/:id/declaration', (req, res) => {
  const commentId = req.params.id;
  const reason = req.body.reason;

  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.error('Failed to connect to database:', err);
      res.sendStatus(500);
      return;
    }

    const db = client.db(dbName);
    const declarationsCollection = db.collection('declarations');

    const newDeclaration = {
      commentId: commentId,
      reason: reason
    };

    declarationsCollection.insertOne(newDeclaration, (err, result) => {
      if (err) {
        console.error('Failed to insert declaration into database:', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }

      client.close();
    });
  });
});

module.exports = router;
