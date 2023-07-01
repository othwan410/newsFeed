// 이상우 게시글 생성, 수정, 삭제

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware.js")
const { News } = require("../models");
const { Op } = require("sequelize");
const multer = require('multer'); // npm i multer


// 사진 업로드

const upload = multer({
    storage : multer.diskStorage({
        destination(req, file, done){
            done(null, "uploads")
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname); 
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits : {fileSize : 5 * 1024 * 1024},
})

// 업로드 화면
// storage 속성 안에는 어디에 (destination) 어떤 이름으로 (filename) 저장할지

// 게시글 작성 POST : localhost:3018/sports/news (성공)
router.post("/news", upload.single('image'), authMiddleware, async(req, res) => {   // 하나만업로드, single Middleware

// upload.single('image')의 업로드 정보가 req.file에 넣어진다.
// <input type="text" name="title"> 의 텍스트 정보가 req.body에 넣어진다.

    try{ const { userId } = res.locals.user;
         const { title, content, category } = req.body;
         const { img } = req.file;
        
    // 유효성 검사
    if (!title) {
        return res.status(400).json({
            errorMessage: "제목을 입력해주세요."
        })
    } else if (!content) {
        return res.status(400).json({
            errorMessage: "내용을 입력해주세요."
        })
    } else if (!category) {
        return res.status(400).json({
            errorMessage: "카테고리를 선택해주세요."
        })
    } else if (!userId) {
        return res.status(400).json({
            errorMessage: "게시글 작성 권한이 없습니다. 로그인 해주세요."
        })
    }
    // 게시글 생성
    await News.create({
        userId, // 뉴스와 유저의 관계는 1대 N ()
        title,
        content,
        img,
        category
    });
    res.send({ result: "success" });
    // return res.status(201).json({
    //     message: "게시글이 등록되었습니다."
    // })

} catch (error){
    console.error(error);
    res.status(401).json({
        errorMessage: "비정상적인 접근입니다."
    })
}
})


// 게시글 수정 PUT : localhost:3018/sports/news/newsId (성공)
router.put("/news/:newsId", upload.single('image'),  authMiddleware, async(req, res) => {  
    const { newsId } = req.params;
    const { userId } = res.locals.user;
  
    const { title, content, category } = req.body;
    const { img } = req.file;

    const post = await News.findOne({where: { newsId }});
  
    // 유효성 검사
    if (!post) {
        return res.status(404).json({
            errorMessage: "게시글이 존재하지 않습니다."
        })
    } else if (userId !== post.userId) {
        return res.status(404).json({
            errorMessage: "게시글 수정 권한이 없습니다."
        })
    } else if (!title) {
        return res.status(404).json({
            errorMessage: "제목을 입력해주세요."
        })
    } else if (!content) {
        return res.status(404).json({
            errorMessage: "내용을 입력해주세요."
        })
    } else if (!category) {
        return res.status(400).json({
            errorMessage: "카테고리를 선택해주세요."
        })
    }

    // 수정
    await News.update(
        { title, content, category, img },
        {
            where: {
                [Op.and]: [{ newsId }, { UserId: userId }],
            }
        }
    );
    res.send({ result: "success" });
    // return res.status(200).json({
    //     message: "게시글이 수정되었습니다."
    // });
});



// 게시글 삭제 DELETE : localhost:3018/sports/news/newsId (성공)
router.delete("/news/:newsId", authMiddleware, async (req, res) => { 
    const { newsId } = req.params;
    const { userId } = res.locals.user;

    const post = await News.findOne({ where: { newsId } });

    if (!post) {
        return res.status(404).json({
            errorMessage: "게시글이 존재하지 않습니다."
        });
    } else if (post.userId !== userId) {
        return res.status(404).json({
            errorMessage: "게시글 삭제 권한이 없습니다."
        });
    }
    await News.destroy({
        where: {
            [Op.and]: [{ newsId }, { UserId: userId }]
        }
    });
    res.send({ result: "success" });
    // return res.status(200).json({
    //     message: "게시글이 삭제되었습니다."
    // });
});


module.exports = router;