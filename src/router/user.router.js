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
} = require("../controller/user.controller");
// 中间件拆分
const {
  userValidator,
  verifyUserInfo,
} = require("../middleWare/user.middleware");

router.post("/koaBodyTest", koaBodyTest);
router.post("/register", userValidator,verifyUserInfo, register);
router.post("/login", login);

module.exports = router;
