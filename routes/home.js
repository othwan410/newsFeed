const express = require("express");
const jwt = require("jsonwebtoken");
const { Users, News } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");
const { json } = require("sequelize");
const router = express.Router();

// 회원가입 API (임시)
router.post("/users", async (req, res) => {
  const { id, password, name, nickname, img } = req.body;
  const isExistUser = await Users.findOne({ where: { id } });

  if (isExistUser) {
    return res.status(409).json({ message: "이미 존재하는 아이디입니다." });
  }

  // Users 테이블에 사용자를 추가합니다.
  const user = await Users.create({ id, password, name, nickname, img });

  return res.status(201).json({ message: "회원가입이 완료되었습니다." });
});
// 뉴스 추가 API (임시)
router.post("/news", async (req, res) => {
  const { newsId, userId, title, content, category, img } = req.body;

  const news = await News.create({
    newsId,
    userId,
    title,
    content,
    category,
    img,
  });

  return res.status(201).json({ message: "뉴스 생성 완료." });
});

// 로그인 버튼 API
router.post("/login", async (req, res) => {
  // id와 pw를 body로 입력받음
  const { id, password } = req.body;
  // id로 일치하는 유저 검색
  const user = await Users.findOne({ where: { id } });
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
  return res.status(200).json({ message: "로그인 성공" });
});

// 로그아웃 API
router.post("/logout", authMiddleware, async (req, res) => {
  // 쿠키 삭제
  return res.cookie("authorization", "").json({ message: "로그아웃 완료" });
});

const findAttributes = `attributes: [
      "newsId",
      "UserId",
      "title",
      "content",
      "img",
      "category",
      "createdAt",
      "updatedAt",
    ]`;

// 뉴스 불러오기
router.get("/getnews", async (req, res) => {
  const newsList = await News.findAll({
    findAttributes,
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

// 카테고리 정렬
// 국내 축구
router.get("/k-football", async (req, res) => {
  const newsList = await News.findAll({
    findAttributes,
    include: [
      {
        model: Users,
        attributes: ["nickname"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  const kFootballList = await newsList.filter((a) => {
    return a["category"] === "국내";
  });

  // return res.status(200).json({ news: kFootballList });
  return res.render("index.ejs", { news: kFootballList });
});

// 해외 축구
router.get("/w-football", async (req, res) => {
  const newsList = await News.findAll({
    findAttributes,
    include: [
      {
        model: Users,
        attributes: ["nickname"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  const wFootballList = await newsList.filter((a) => {
    return a["category"] === "해외";
  });

  return res.status(200).json({ news: wFootballList });
  // return res.render("index.ejs", { news: wFootballList });
});

// 최신순 정렬

// 좋아요순 정렬

module.exports = router;
