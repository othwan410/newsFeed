const sequelize = require('sequelize');
const express = require("express");
const { Comments, News, Users, Declaration } = require("../models");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware.js");


router.post("/news/:newsId/comments", authMiddleware, async (req, res) => {
  try {
    if (!req.params || !req.body) {
      return res.status(412).json({
        success: false,
        errorMessage: "데이터 형식이 올바르지 않습니다.",
      });
    }
  
    const { newsId } = req.params;
    const existsNews = await News.findOne({where: {newsId}});
    if (!existsNews) {
      return res.status(404).json({
        success: false,
        errorMessage: "게시글이 존재하지 않습니다.",
      });
    }
  
    const { content } = req.body;
    if (!content) {
      return res.status(412).json({
        success: false,
        errorMessage: "댓글 형식이 올바르지 않습니다.",
      });
    }
  
    const { userId } = res.locals.user;
  
    await Comments.create({
      newsId: newsId,
      userId, 
      content,
    });
  
    res.json({ message: "댓글을 생성하였습니다." });  
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      errorMessage: "댓글 작성에 실패하였습니다.",
    });
  }
});

router.get("/news/:newsId/comments", async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        success: false,
        errorMessage: "'데이터 형식이 올바르지 않습니다.'",
      });
    }
    const { newsId } = req.params;

    const existsNews = await News.findOne({where: {newsId}});
    if (!existsNews) {
      return res.status(404).json({
        success: false,
        errorMessage: "게시글이 존재하지 않습니다.",
      });
    }
    const comments = await Comments.findAll({ 
      attributes: ["commentsId", "userId", "content", "createdAt", "updatedAt"],
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
      ],
      where: {newsId},
      order : [["createdAt", "DESC"]] 
    });

    const prComments = comments.map((item) => {
      return {
      commentsId: item.commentsId,
      userId: item.userId,
      nickname: item.User.nickname,
      content: item.content,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      };
    });

    res.json({ comments: prComments });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      errorMessage: "댓글 조회에 실패하였습니다.",
    });
  }
});

router.put("/news/:newsId/comments/:commentsId", authMiddleware, async (req, res) => {
  try {
    if (!req.params || !req.body) {
      return res.status(400).json({
        success: false,
        errorMessage: "'데이터 형식이 올바르지 않습니다.'",
      });
    }
  
    const { newsId, commentsId } = req.params;
    const existsPost = await News.findOne({where: {newsId}});
    if (!existsPost) {
      return res.status(404).json({
        success: false,
        errorMessage: "게시글이 존재하지 않습니다.",
      });
    }

    const { content } = req.body;
    if (!content) {
      return res.status(412).json({
        success: false,
        errorMessage: "댓글 형식이 올바르지 않습니다.",
      });
    }
  
    const existsComment = await Comments.findOne({where: {commentsId}});
    const { userId } = res.locals.user;
    if (existsComment) {
      if (userId === existsComment.userId)
        await Comments.update({content : content}, {where:{ commentsId }});
      else {
        return res.status(403).json({
          success: false,
          errorMessage: "댓글의 수정 권한이 존재하지 않습니다.",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        errorMessage: "'댓글 조회에 실패하였습니다.'",
      });
    }
    res.json({ message: "댓글을 수정하였습니다." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      errorMessage: "댓글 수정에 실패하였습니다.",
    });
  }
});

router.delete("/news/:newsId/comments/:commentsId", authMiddleware, async (req, res) => {
  try{
    if (!req.params || !req.body) {
      return res.status(400).json({
        success: false,
        errorMessage: "'데이터 형식이 올바르지 않습니다.'",
      });
    }
  
    const { newsId, commentsId } = req.params;
    const existsPost = await News.findOne({where: { newsId }});
    if (!existsPost) {
      return res.status(404).json({
        success: false,
        errorMessage: "게시글이 존재하지 않습니다.",
      });
    }
  
    const existsComment = await Comments.findOne({where: { commentsId }});
    const { userId } = res.locals.user;
    if (existsComment) {
      if (userId === existsComment.userId)
        await Comments.destroy({where: { commentsId }});
      else {
        return res.status(403).json({
          success: false,
          errorMessage: "댓글의 삭제 권한이 존재하지 않습니다.",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        errorMessage: "'댓글 조회에 실패하였습니다.'",
      });
    }
    res.json({ message: "댓글을 삭제하였습니다." });
  }catch (err){
    return res.status(400).json({
      success: false,
      errorMessage: "댓글 삭제에 실패하였습니다.",
    });
  }
});

// 댓글 신고 저장
router.post('/news/:newsId/comments/:commentsId/declaration',authMiddleware, async (req, res) => {
  try {
    if (!req.params || !req.body) {
      return res.status(412).json({
        success: false,
        errorMessage: "데이터 형식이 올바르지 않습니다.",
      });
    }
  
    const { newsId, commentsId } = req.params;
    const existsPost = await News.findOne({where: { newsId }});
    if (!existsPost) {
      return res.status(404).json({
        success: false,
        errorMessage: "게시글이 존재하지 않습니다.",
      });
    }
  
    const { content } = req.body;
    if (!content) {
      return res.status(412).json({
        success: false,
        errorMessage: "신고 형식이 올바르지 않습니다.",
      });
    }
  
    const { userId } = res.locals.user;
    const existsComment = await Comments.findOne({where: { commentsId }});
    if (existsComment) {
        await Declaration.create({
          commentsId,
          dcrUserId : userId,
          content,
        });
    } else {
      return res.status(404).json({
        success: false,
        errorMessage: "댓글이 존재하지 않습니다.",
      });
    }
  
    res.json({ message: "댓글을 신고하였습니다." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      errorMessage: "댓글 신고에 실패하였습니다.",
    });
  }
});

router.delete("/news/comments/:commentsId/declaration", async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        success: false,
        errorMessage: "'데이터 형식이 올바르지 않습니다.'",
      });
    }
    const { commentsId } = req.params;

    const existsNews = await Declaration.findOne({ 
      attributes: ["commentsId"],
      where: {commentsId},
      group: ["commentsId"],
      having: sequelize.literal(`COUNT(commentsId) > 4`)
    });
    if (!existsNews) {
      return res.status(400).json({
        success: false,
        errorMessage: "댓글 조회에 실패하였습니다.",
      });;
    }
    await Comments.destroy({where: { commentsId: existsNews.commentsId }});
    await Declaration.destroy({where: { commentsId: existsNews.commentsId }});

    return res.json({ check: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      errorMessage: "댓글 조회에 실패하였습니다.",
    });
  }
});

module.exports = router;
