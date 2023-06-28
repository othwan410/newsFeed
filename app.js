const express = require("express");
const cookieParser = require("cookie-parser");
const newsRouter = require("./routes/news.js");
const app = express();
const port = 3018;

const userCreateRouter = require("./routes/userCreate");
const userInfoeRouter = require("./routes/userInfo");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("assets"));
app.use("/api", [newsRouter, userCreateRouter, userInfoeRouter]);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
