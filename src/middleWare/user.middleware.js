/**
 * controller 控制器逻辑过多可拆分成多个中间件去处理
 *
 */
const bcrypt = require("bcryptjs");
const {
  userFomaterError,
  userAlreayExisted,
  userDoneNotExist,
  userLoginError,
  invaildPassword,
} = require("../constant/user.contant");
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

const { findUserInfo } = require("../service/user.sevice");
/**验证用户是否存在 */
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
/** 密码加密处理 */
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  // 加盐算法
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;
  await next();
};

/** 验证登录 */
const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  const res = await findUserInfo({ user_name });
  try {
    if (!res) {
      console.error("用户不存在", user_name);
      ctx.app.emit("error", userDoneNotExist, ctx);
      return;
    }
  } catch (error) {
    console.error("用户登录失败", user_name);
    ctx.app.emit("error", userLoginError, ctx);
  }
  // 验证密码是否匹配
  if (!bcrypt.compareSync(password, res.password)) {
    console.error("用户密码无效不匹配", user_name);
    ctx.app.emit("error", invaildPassword, ctx);
    return;
  }
  await next();
};

module.exports = {
  userValidator,
  verifyUserInfo,
  cryptPassword,
  verifyLogin,
};
