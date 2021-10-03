/**
 * controller 控制器逻辑过多可拆分成多个中间件去处理
 *
 */
const { userFomaterError, userAlreayExisted } = require("../constant/user.contant");
/**验证不为空 */
const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  // 异常处理
  if (!user_name || !password) {
    console.error("用户名或密码为空", ctx.request.body);
    ctx.app.emit("error", userFomaterError, ctx);
    return;
  }
  // 执行下一个中间件
  await next();
};
/**验证用户是否存在 */
const { findUserInfo } = require("../service/user.sevice");
const verifyUserInfo = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  // 是否存在
  const result = await findUserInfo({ user_name });
  if (result) {
    console.error("用户存在", ctx.request.body);
    // 发布一个error事件，app.js最后统一做处理
    ctx.app.emit("error", userAlreayExisted, ctx);
    return;
  }
  // 执行下一个中间件
  await next();
};
module.exports = {
  userValidator,
  verifyUserInfo,
};
