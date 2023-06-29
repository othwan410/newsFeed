const express = require("express");
const cookieParser = require("cookie-parser");
const newsRouter = require("./routes/news.js");
const homeRouter = require("./routes/home.js");
const app = express();
const port = 3018;

app.use(express.json());
app.use(express.static("assets"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", [homeRouter, newsRouter]);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
