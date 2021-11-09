/**
 * 路由
 * router
 */
const Router = require("koa-router");
// 实例化use路由&&路由前缀/user/
const router = new Router({ prefix: "/user" });
// 导入控制器Controller类
const {
  register,
  login,
  koaBodyTest,
  updatePassword,
} = require("../controller/user.controller");
// 中间件拆分
const {
  userValidator,
  verifyUserInfo,
  cryptPassword,
  verifyLogin,
} = require("../middleWare/user.middleware");
const { auth } = require("../middleWare/auth.middleware");

router.post("/koaBodyTest", koaBodyTest);
router.post(
  "/register",
  userValidator,
  verifyUserInfo,
  cryptPassword,
  register
);
router.post("/login", userValidator, verifyLogin, login);
router.post("/update", userValidator, cryptPassword, auth, updatePassword);

module.exports = router;
