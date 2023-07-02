const express = require("express");
const jwt = require("jsonwebtoken");
const { Users, News } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");
const { json, useInflection } = require("sequelize");
const router = express.Router();

// 로그인 API
router.post("/api/login", async (req, res) => {
  // id와 pw를 body로 입력받음
  const { id, password } = req.body;
  // id로 일치하는 유저 검색
  const user = await Users.findOne({ where: { id } });
  console.log(user);
  if (!user) {
    return res.status(401).json({ message: "존재하지 않는 아이디입니다." });
  } else if (user.password !== password) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }
  // jwt 생성
  const token = jwt.sign(
    {
      userId: user.userId, // userId 할당
    },
    "customized_secret_key"
  );
  // 쿠키 발급
  res.cookie("authorization", `Bearer ${token}`);
  // userID 전송
  return res.status(200).json({ message: "로그인 성공" });
});

// 로그인 체크 API
router.get("/api/logincheck", authMiddleware, async (req, res) => {
  return res.status(201).json({ userInfo: res.locals.user });
});

// 로그아웃 API
router.post("/api/logout", authMiddleware, async (req, res) => {
  // 쿠키 삭제
  return res.cookie("authorization", "").json({ message: "로그아웃 완료" });
});

// 뉴스 불러오기 API (최신순)
router.get("/api/getnews", async (req, res) => {
  const newsList = await News.findAll({
    attributes: [
      "newsId",
      "UserId",
      "title",
      "content",
      "img",
      "category",
      "createdAt",
      "updatedAt",
    ],
    include: [
      {
        model: Users,
        attributes: ["nickname"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json({ news: newsList });
});

// 뉴스 불러오기 API (과거순)
router.get("/api/getoldnews", async (req, res) => {
  const newsList = await News.findAll({
    attributes: [
      "newsId",
      "UserId",
      "title",
      "content",
      "img",
      "category",
      "createdAt",
      "updatedAt",
    ],
    include: [
      {
        model: Users,
        attributes: ["nickname"],
      },
    ],
    order: [["createdAt", "ASC"]],
  });
  res.status(200).json({ news: newsList });
});

module.exports = router;
