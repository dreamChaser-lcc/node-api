const path = require("path");
// koa导入
const Koa = require("koa");
const app = new Koa();

// 静态资源回显(浏览器回显)
const koaStatic = require("koa-static");
// koa-router导入，用于注册中间件
const Router = require("koa-router");
// 参数校验
const parameter = require("koa-parameter");

// 注册路由中间件,use接受的middleWare中间件必须是函数
const userRouter = require("../router/user.router");
const goodRouter = require("../router/goods.router");
// fs模块自动加载路由
const allRouter = require("../router/index");
// 统一错误信息处理
const errHandler = require("./errHandler");
// 输出埋点日志
const { logger } = require("../config/config.log");
// 二次封装koa-body
const { wrappedKoaBody } = require("../middleWare/common.middleware");

// logger输出示例
// logger.info('info', {timeStamp:new Date(),ip:'123'})

const indexRouter = new Router();
indexRouter.get("/", (ctx, next) => {
  ctx.body = "123";
});

// 注册解析请求体中间件,并支持文件上传
app.use(wrappedKoaBody());

/**
 *@param 静态资源存放路径
 */
app.use(koaStatic(path.join(__dirname, "../upload")));
// 参数校验npm包
app.use(parameter(app));

/**路由分模块加载 */
// app.use(userRouter.routes());
// app.use(goodRouter.routes());
/**路由中间件优化，自动加载 */
app.use(allRouter.routes());

const getRouter = new Router();
indexRouter.get("/get", (ctx, next) => {
  ctx.body = "getapi";
});
app.use(indexRouter.routes());
// 统一错误处理
app.on("error", errHandler);
// app.proxy = true;

module.exports = app;
