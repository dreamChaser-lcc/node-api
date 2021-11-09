const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const {
  tokenExpiredError,
  invalidToken,
  hasNotPermission,
} = require("../constant/auth.contant");
/**验证token */
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  try {
    // bearer 后有空格！
    const token = authorization.replace("Bearer ", "");
    // user即payload 包含信息（id,user_name,is_admin）
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
  } catch (err) {
    switch (err.name) {
      case "TokenExpiredError":
        console.error("token过期");
        return ctx.app.emit("error", tokenExpiredError, ctx);
      case "JsonWebTokenError":
        console.error("无效token");
        return ctx.app.emit("error", invalidToken, ctx);
      default:
        console.error("无效token");
        return ctx.app.emit("error", invalidToken, ctx);
    }
  }
  await next();
};

const hadAdminPermission = async (ctx, next) => {
  /**
   * 小bug
   * is_admin来源于上一次token查询数据库
   * 如果在颁发token后，改变管理员权限不能获取到实时的
   * 正确的is_admin应该去调数据库
   **/
  const { is_admin } = ctx.state.user;
  if (!is_admin) {
    console.error("用户不是管理员", ctx.state.user);
    return ctx.app.emit("error", hasNotPermission, ctx);
  }
  await next();
};
module.exports = {
  auth,
  hadAdminPermission,
};
