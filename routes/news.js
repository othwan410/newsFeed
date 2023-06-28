const express = require("express");
const { News, Users } = require("../models");
const router = express.Router();


router.get("/news/:newsId", async (req, res) => {
  try {
    if (!req.params) {
        return res.status(400).json({
          success: false,
          errorMessage: "'데이터 형식이 올바르지 않습니다.'",
        });
    }

    const { newsId } = req.params;
    const news = await News.findAll({ 
        attributes: ["newsId", "userId",  "title", "content","img", "createdAt", "updatedAt"],
        include: [
            {
            model: Users,
            attributes: ["nickname"],
            },
        ],
        where: { newsId }
    });

    const prNews = news.map((item) => {
        return {
            newsId: item.postId,
            userId: item.User.userId,
            title: item.title,
            nickname: item.User.nickname,
            content: item.content,
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

module.exports = router;
