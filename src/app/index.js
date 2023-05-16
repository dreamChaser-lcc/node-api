const path = require("path");
// koa导入
const Koa = require("koa");
const app = new Koa();

// 解析请求体的npm包
const koaBody = require("koa-body");
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

// logger输出示例
// logger.info('info', {timeStamp:new Date(),ip:'123'})

const indexRouter = new Router();
indexRouter.get("/", (ctx, next) => {
  ctx.body = "123";
});

// 注册中间件,并支持文件上传
app.use(
  koaBody({
    multipart: true,
    formidable: {
      // 拼接正确文件上传路径
      uploadDir: path.join(__dirname, "../upload"),
      // 保存文件后缀名
      keepExtensions: true,
      // 限制上传图片为图片 !!bug未生效
      filter: ({ name, originalFilename, mimetype }) => {
        console.log(mimetype);
        // keep only images
        return false;
      },
    },
    // 让koa-body支持请求方式，并将请求参数解析到ctx.request.body中
    parsedMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
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
