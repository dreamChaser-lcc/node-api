/**
 * 控制器 处理业务逻辑
 * 状态码status规范可以在 MDN http 响应状态码表查询
 */
const {userRegisteError} = require('../constant/user.contant');
const { createUser } = require("../service/user.sevice");
class UserController {
  // 路由koa-body 解析请求体
  async koaBodyTest(ctx, next) {
    ctx.body = ctx.request.body;
  }
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    try {
      const res = await createUser(user_name, password);
      ctx.body = {
        code: "00000",
        massage: `用户${res.user_name}注册成功`,
        result: "success",
      };
    } catch (err) {
      console.error("注册失败",user_name);
      ctx.app.emit("error", userRegisteError, ctx);
      return;
    }
  }
  async login(ctx, next) {
    ctx.body = "登录成功";
  }
}
module.exports = new UserController();
