const express = require("express");
const { Users } = require("../models");

const router = express.Router();

// 사용자 조회
// 닉네임으로 상대 정보를 받아오고, 그것으로 남김말을 본다.
router.get("/user/:nickname", async (req, res) => {
    const { nickname } = req.params;

    const user = await Users.findOne({
        // 검색 결과에서 가져올 속성들
        attributes: ["nickname", "message"],
        // 검색 조건은 userId이다.
        where: { nickname },
    });

    if (!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    return res.status(200).json({ data: user });
});

// 사용자 조회
// 파람에서 userId 와 password 를 받는다.\

// 나중에 로그인 기능하고 비교해서 쿠키에서 userId나 id를 가져와서 비밀번호를 비교하게 고치자.

// userId는 숫자 값이며, 닉네임은 숫자만으로도 만들 수 있기 때문에,
// 닉네임과 userId가 겹칠 수 있다. 그래서 /info 로 한번 더 경로를 만든다.
router.post("/user/info/:userId", async (req, res) => {
    const { userId } = req.params;

    const { password } = req.body;

    const user = await Users.findOne({
        attributes: ["userId","id", "nickname", "createdAt", "updatedAt", "name", "message", "password"],
        where: { userId },
    });

    if (!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    } else if (password !== user.password) {
        return res.status(404).json({ message: "비밀번호가 일치하지 않습니다." });
    } else {
        const { id,password, name, nickname, message, userId } = user;
        return res.status(200).json({ id, password, name, nickname, message, userId });
    }
});





// 정보 수정, put 을 사용하면 모두 입력해야하므로 patch로 한다.
// api 명세서에는 put으로 되어있으니 나중에 말해야한다.
router.patch("/user/update/:userId", async (req, res) => {

    const { userId } = req.params;



    const users = await Users.findOne({
        attributes: ["userId", "nickname", "createdAt", "updatedAt", "name", "message", "password", "id"],
        where: { userId },
    });

    // if (userId !== users.userId) {
    //     return res.status(404).json({ message: "사용자가 일치하지 않습니다." });
    // }

    const {
        passwordNew,
        confirmPassword,
        message,
        nickname
    } = req.body;

    //  비밀번호 검증
    if (passwordNew !== confirmPassword) {
        res.status(400).json({
            errorMessage: "비밀번호가 일치하지 않습니다..",
        });
        return
    }

    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{6,20}$/
    const passCheck = passRegex.test(passwordNew);

    // 위의 조건 + id 를 포함하지 않을 것
    if (!passCheck || passwordNew.includes(users.id)) {
        res.status(400).json({
            errorMessage:
                "password는 ID를 포함하지 않는, 영어, 숫자, 특수문자(!@#$%^&*)를 포함한 6~20 글자여야합니다.",
        });
        return;
    }


    //  닉네임 검증

    // 중복 닉 검사
    const isExistUserNickname = await Users.findOne({ where: { nickname } });
    const nickRegex = /^[a-zA-Z0-9가-힣]{3,10}$/;
    const nickCheck = nickRegex.test(nickname);

    // 닉이 그대로면
    if (users.nickname !== nickname) {
        if (isExistUserNickname) {
            return res.status(409).json({ message: "이미 존재하는 닉네임입니다." });
        } else if (!nickCheck) {
            res.status(400).json({
                errorMessage:
                    "닉네임을 3~10자, 알파벳 대소문자(a~z, A~Z), 숫자(0~9) 으로 작성하세요",
            });
            return;
        }
    }




    //  메시지 검증    
    const messRegex = /^[A-Za-z\d!@#$%^&()[\]{}가-힣ㄱ-ㅎㅏ-ㅣ*_^.,';:　\s]{0,30}$/
    const messCheck = messRegex.test(message);

    if (!messCheck) {
        res.status(400).json({
            errorMessage:
                "메시지는 30 글자 이하로 해주세요(영어, 숫자, 특수문자만 가능)",
        });
        return;
    }



    const user = await Users.update(
        {
            password: passwordNew,
            message,
            nickname
        },
        {
            where: {
                userId: userId
            }
        }
    );

    return res.status(201).json({ message: "변경이 완료되었습니다." });
})


// 사용자 삭제
router.delete("/user/delete/:userId", async (req, res) => {

    const { userId } = req.params;
    const users = await Users.findOne({
        attributes: ["userId", "nickname", "createdAt", "updatedAt", "name", "message", "password", "id"],
        where: { userId },
    });

    //"정말로 ID : " [ ] " 를 삭제하겠습니다." 사이에서 입력받도록 만들기
    // const confirmChar = "정말로 ID : " + users.id + " 를 삭제하겠습니다."


    const {
        id,
        passwordDel,
    } = req.body;

    console.log(passwordDel);
    console.log(users.password);

    if (passwordDel !== users.password) {
        res.status(400).json({
            errorMessage: "비밀번호가 일치하지 않습니다.",
        });
        return
    }

    if (users.id !== confirm) {
        res.status(400).json({
            errorMessage: "삭제 문구를 다시 확인해 주세요.",
        });
        return
    }

    const user = await Users.destroy({
        where: {
            userId: userId
        }
    });

    return res.status(201).json({ message: "회원 탈퇴가 완료되었습니다." });
});

module.exports = router;
