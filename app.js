const express = require("express");
const cookieParser = require("cookie-parser");
const newsRouter = require("./routes/news.js");
const homeRouter = require("./routes/home.js");
const userCreateRouter = require("./routes/userCreate.js");
const userInfoeRouter = require("./routes/userInfo.js");
const newspostRouter = require("./routes/newspost.js");
const commentRouter = require("./routes/comment.js");

const app = express();
const port = 3018;

app.use(express.json());
app.use(express.static("assets"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", [homeRouter]);
app.use("/api", [
  userCreateRouter,
  userInfoeRouter,
  newspostRouter,
  newsRouter,
  commentRouter
]);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
