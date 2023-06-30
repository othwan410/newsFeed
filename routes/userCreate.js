// 패키지 가져오기
const express = require("express");
const jwt = require("jsonwebtoken");
// 스키마 가져오기
const { Users } = require("../models");
// 라우터 생성하기
const router = express.Router();

// 회원가입
// 클라이언트에서 준 정보 처리
router.post("/user", async (req, res) => {
  const { id, password, confirmPassword, name, message, nickname } = req.body;

  // 정규식을 활용하여, 입력받은 id가 조건을 만족하는지 체크한다.
  const idRegex = /^[A-Za-z\d]{3,10}$/;
  const idCheck = idRegex.test(id);

  // id가 조건을 만족하지 않는다면,
  if (!idCheck) {
    res.status(400).json({
      // 경고문을 띄운다.
      errorMessage:
        "ID를 최소 3~10자, 알파벳 대소문자(a~z, A~Z), 숫자(0~9) 으로 작성하세요",
    });
    return;
  }

  // 닉네임도 id와 똑같이 처리한다.
  const nickRegex = /^[A-Za-z\d!@#$%^&()[\]{}가-힣ㄱ-ㅎㅏ-ㅣ*.,';:']{3,10}$/;
  const nickCheck = nickRegex.test(nickname);

  if (!nickCheck) {
    res.status(400).json({
      errorMessage:
        "닉네임을 3~10자, 알파벳 대소문자(a~z, A~Z), 숫자(0~9) 으로 작성하세요",
    });
    return;
  }

  // 이름은 조금 다르게한다.
  const nameRegex = /^[가-힣]{2,}$/;
  const nameCheck = nameRegex.test(name);

  if (!nameCheck) {
    res.status(400).json({
      errorMessage: "이름은 두 글자 이상, 한글만 입력해주세요.",
    });
    return;
  }

  // 비밀번호 검증하기
  // 6글자 이상 , 대문자 ~ 소문자 , 어떤 숫자든지 가능
  const passRegex = /^(?=.*[A-Za-z0-9])(?=.*\d)[A-Za-z0-9\d@$!%*#?&]{5,}$/;
  const passCheck = passRegex.test(password);

  // 위의 조건 + id 를 포함하지 않을 것
  if (!passCheck || password.includes(id)) {
    res.status(400).json({
      errorMessage:
        "password는 ID를 포함하지 않는, 영어, 숫자, 특수문자(!@#$%^&*)를 포함한 6~20 글자여야합니다.",
    });
    return;
  }

  // 패스워드를 똑같이 두 번 입력하지 않은 경우 에러 메시지 출력
  if (password !== confirmPassword) {
    res.status(400).json({
      errorMessage: "비밀번호가 일치하지 않습니다..",
    });
    return;
  }

  // 같은 id가 있는지 검색한다.
  const isExistUserID = await Users.findOne({ where: { id } });

  // 존재한다면 경고를 띄운다.
  if (isExistUserID) {
    return res.status(409).json({ message: "이미 존재하는 ID입니다.." });
  }

  // 닉네임도 검증
  const isExistUserNickname = await Users.findOne({ where: { nickname } });

  // 존재한다면 경고를 띄운다.
  if (isExistUserNickname) {
    return res.status(409).json({ message: "이미 존재하는 닉네임입니다." });
  }

  // 메시지 검증
  const messRegex =
    /^[A-Za-z\d!@#$%^&()[\]{}가-힣ㄱ-ㅎㅏ-ㅣ*_^.,';:　\s]{0,30}$/;
  const messCheck = messRegex.test(message);

  if (!messCheck) {
    res.status(400).json({
      errorMessage:
        "메시지는 30 글자 이하로 해주세요(영어, 숫자, 특수문자만 가능)",
    });
    return;
  }

  const user = await Users.create({
    id,
    password,
    name,
    message,
    nickname,
  });

  return res.status(201).json({ message: "회원가입이 완료되었습니다." });
});

// 현재 라우터를 모듈로 내보낸다.
module.exports = router;
