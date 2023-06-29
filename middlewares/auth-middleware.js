const jwt = require("jsonwebtoken");
const { Users } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { Authorization } = req.cookies;
    const [authType, authToken] = (Authorization ?? "").split(" ");

    if (!authToken || authType !== "Bearer") {
      res.status(403).send({
        errorMessage: "로그인 후 이용 가능한 기능입니다.",
      });
      return;
    } 

    const { userId } = jwt.verify(token, "customized_secret_key");
    const user = await Users.findOne({ where: { userId } });

    if (!user) {
      res.clearCookie("authorization");
      return res.status(401).json({ message: "토큰 사용자가 존재하지 않습니다." });
    }

    res.locals.user = user;
    next();

  } catch (error) {
    res.clearCookie("authorization");
    return res.status(400).json({
      message: "비정상적인 요청입니다."
    });
  }
}