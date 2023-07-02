// 이상우 게시글 생성, 수정, 삭제
// http://localhost:3018/create.html

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware.js")
const { News, Users } = require("../models");
const { Op } = require("sequelize");
const upload = require("../middlewares/upload-middleware.js");


// 게시글 작성 POST : localhost:3018/api/news (로그인 이후 작성 성공)

router.post("/news", authMiddleware, upload.single('image'), async(req, res) => {   //authMiddleware, upload.single('image'),
    try{ 
        const { userId }  = res.locals.user;
        console.log(userId) // 정상출력
        const { title, content, category } = req.body;

        console.log(title) // 정상출력
        console.log(content) // 정상출력
        console.log(category) // 정상출력
        const imageUrl = req.file.location;

        // 유효성 검사
        if (!title) {
            return res.status(400).json({
                message: "제목을 입력해주세요."
            })
        } else if (!content) {
            return res.status(400).json({
                message: "내용을 입력해주세요."
            })
        } else if (!category) {
            return res.status(400).json({
                message: "카테고리를 선택해주세요."
            })
        } else if (!userId) {
            return res.status(400).json({
                message: "게시글 작성 권한이 없습니다. 로그인 해주세요."
            })
        }
        
        // key값에는 model에 있는 스키마, value에는 req.body값
        await News.create({
            title,
            content,
            img:imageUrl,
            category,
            userId,
        });

        return res.status(200).send("<script> alert('게시글이 작성되었습니다'); location.href='/'</script>") // html에 코드 출력
    } catch (error){
        console.error(error);
        res.status(401).json({
        message: "비정상적인 접근입니다."
        })
    }
})


// 게시글 수정 PUT : localhost:3018/api/news/newsId (성공)
router.put("/news/:newsId", authMiddleware, async(req, res) => {  //upload.single('image')
    const { newsId } = req.params;
    const { userId }  = res.locals.user;
    const { title, content, category } = req.body;
    // const imageUrl = req.file.location;
    
    const post = await News.findOne({where: { newsId }});
  
    // 유효성 검사
    if (!post) {
        return res.status(404).json({
            message: "게시글이 존재하지 않습니다."
        })
    } else if (userId !== post.userId) {
        return res.status(404).json({
            message: "게시글 수정 권한이 없습니다."
        })
    } else if (!title) {
        return res.status(404).json({
            message: "제목을 입력해주세요."
        })
    } else if (!content) {
        return res.status(404).json({
            message: "내용을 입력해주세요."
        })
    } else if (!category) {
        return res.status(400).json({
            message: "카테고리를 선택해주세요."
        })
    }

    // 수정
    await News.update(
        {  title, content, category },// img:imageUrl userId,
        {
            where: { newsId }
        }
    );
    res.send("<script> alert('게시글이 수정되었습니다')</script>");
});



// 게시글 삭제 DELETE : localhost:3018/api/news/newsId 
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
        where: { newsId }
    });
    res.send({ result: "success" });
});



module.exports = router;