const express = require("express");
const { User } = require("../models");

const router = express.Router();

// 유저 정보 보기
router.get("/user/:userId", async (req, res) => {
    // userId 가져오기
    const { userId } = req.params;

    // userId 로 검색하기
    try {
        const user = await User.findOne({
            where: { userId },
            attributes: ["userId", "id", "name", "message", "nickname"],
        });

        if (!user) {
            return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
        }

        return res.status(200).json({ data: user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 에러" });
    }
});

// 정보 수정, put 을 사용하면 모두 입력해야하므로 patch로 한다.
// api 명세서에는 put으로 되어있으니 나중에 말해야한다.
router.patch("/user/:userId", async (req, res) => {
    // 구현 내용
});

// 사용자 삭제
router.delete("/user/:userId", async (req, res) => {
    // 구현 내용
});

module.exports = router;
