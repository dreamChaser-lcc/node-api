// koa导入
const Koa = require("koa");
const app = new Koa();

// 解析请求体的npm包
const koaBody = require("koa-body");
// koa-router导入，用于注册中间件
const Router = require("koa-router");

// 注册路由中间件,use接受的middleWare中间件必须是函数
const userRouter = require("../router/user.router");
// 统一错误信息处理
const errHandler = require("./errHandler");
const indexRouter = new Router();
indexRouter.get("/", (ctx, next) => {
  ctx.body = "123";
});

// 注册中间件
app.use(koaBody());
app.use(userRouter.routes());
const getRouter = new Router();
indexRouter.get("/get", (ctx, next) => {
  ctx.body = "getapi";
});
app.use(getRouter.routes());

// 统一错误处理
app.on("error", errHandler);

module.exports = app;
