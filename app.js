const express = require("express");
const cookieParser = require("cookie-parser");
const newsRouter = require("./routes/news.js");
const homeRouter = require("./routes/home.js");
const userCreateRouter = require("./routes/userCreate");
const userInfoeRouter = require("./routes/userInfo");
const newspostRouter = require("./routes/newspost");

const cors = require("cors"); // CORS이슈, 삭제하지 마세요. // app.js실행 안되면 npm i cors 설치하세요.
const app = express();
const port = 3018;

app.use(express.json());
app.use(express.static("assets"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", [homeRouter]);
app.use(cors()); // CORS, 삭제하지 마세요
app.use("/api", [
  userCreateRouter,
  userInfoeRouter,
  newspostRouter,
  newsRouter,
]);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
