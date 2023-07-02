const express = require("express");
const { News, Users, NewsLiked } = require("../models");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware.js");

router.get("/news/:newsId", async (req, res) => {
  try {
    if (!req.params) {
        return res.status(400).json({
          success: false,
          errorMessage: "'데이터 형식이 올바르지 않습니다.'",
        });
    }

    const { newsId } = req.params;
    const news = await News.findOne({ 
        attributes: ["newsId", "userId", "category",  "title", "content", "img", "createdAt", "updatedAt"],
        include: [
            {
            model: Users,
            attributes: ["nickname"],
            },
        ],
        where: { newsId }
    });

    const prNews = [news].map((item) => {
        return {
            newsId: item.newsId,
            userId: item.userId,
            title: item.title,
            nickname: item.User.nickname,
            content: item.content,
            category: item.category,
            img: item.img,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        };
    });
    
    res.json({
        news: prNews,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      errorMessage: "게시글 조회에 실패하였습니다.",
    });
  }
});

router.get("/like/:newsId", async (req, res) => {

  const { newsId } = req.params;
  const likedCount = await NewsLiked.findAndCountAll({
    where: {newsId}
  });

  res.json({
    likedCount: likedCount,
  });
});

router.get("/like/:newsId/:userId", async (req, res) => {

  const { newsId, userId } = req.params;
  const likedUser = await NewsLiked.findOne({
    where: {
      newsId,
      userId
    }
  });

  res.json({
    isLiked: likedUser,
  });
});


router.post("/like/:newsId", authMiddleware, async (req, res) => {
  try {

    const { userId } = res.locals.user;
    const { newsId } = req.params;

    await NewsLiked.create({
      newsId : newsId,
      userId : userId,
    });
  
    res.json({ message: "게시글 좋아요에 성공했습니다." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      errorMessage: "게시글 좋아요에 실패하였습니다.",
    });
  }
});

router.delete("/like/:newsId", authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { newsId } = req.params;

    await NewsLiked.destroy({where:{ userId, newsId }});
  
    res.json({ message: "게시글 좋아요 취소에 성공했습니다." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      errorMessage: "게시글 좋아요 취소에 실패하였습니다.",
    });
  }
});

module.exports = router;