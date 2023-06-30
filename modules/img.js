// npm i uuid4
// npm install multer

const express = require("express");
const app = express();
const path = require("path");
const publicPath = path.join(__dirname, "public");
const multer = require("multer");
const uuid4 = require("uuid4");

app.use(express.static(publicPath));

const upload = multer({
  storage: multer.diskStorage({
    filename(req, file, done) {
      const randomID = uuid4();
      const ext = path.extname(file.originalname);
      const filename = randomID + ext;
      done(null, filename);
    },
    destination(req, file, done) {
      done(null, path.join(__dirname, "files"));
    },
  }),
  limits: { fileSize: 1024 * 1024 },
});

const uploadMiddleware = upload.single("myFile");

app.post("/upload", uploadMiddleware, (req, res) => {
  console.log(req.file);
  console.log("req.body : ", req.body);
  console.log('업로드 완료');
  res.status(200).send("업로드되었습니다.");
});

app.use((err, req, res, next) => {
    console.log("error middleware");
    console.log(err.toString());
    res.send(err.toString());
  });
