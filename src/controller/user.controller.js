/**
 * 控制器 处理业务逻辑
 * 状态码status规范可以在 MDN http 响应状态码表查询
 */
const jwt = require("jsonwebtoken");
const {
  userRegisteError,
  updatePasswordError,
} = require("../constant/user.contant");
const {
  createUser,
  findUserInfo,
  updateById,
} = require("../service/user.sevice");
const { JWT_SECRET } = require("../config/config.default");
class UserController {
  // 路由koa-body 解析请求体
  async koaBodyTest(ctx, next) {
    ctx.body = ctx.request.body;
  }
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    console.log("123", password);
    try {
      const res = await createUser(user_name, password);
      ctx.body = {
        code: "00000",
        massage: `用户${res.user_name}注册成功`,
        result: "success",
      };
    } catch (err) {
      console.error("注册失败", user_name);
      ctx.app.emit("error", userRegisteError, ctx);
      return;
    }
  }
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    try {
      // 获取用户信息
      const { password, ...res } = await findUserInfo({ user_name });
      // res即payload 包含信息（id,user_name,is_admin）
      const token = jwt.sign(res, JWT_SECRET, { expiresIn: "1D" });
      ctx.body = {
        code: "00000",
        message: "用户登录成功",
        result: {
          username:user_name,
          token
        },
      };
    } catch (err) {
      console.error("用户登录失败", err);
    }
  }
  async updatePassword(ctx, next) {
    const { id } = ctx.state.user;
    const { password } = ctx.request.body;
    try {
      const res = await updateById({ id, password });
      console.log(res);
      ctx.body = {
        code: "00000",
        message: "修改密码成功",
        result: "",
      };
    } catch (err) {
      ctx.app.emit("error", updatePasswordError, ctx);
    }
    await next();
  }
}
module.exports = new UserController();
