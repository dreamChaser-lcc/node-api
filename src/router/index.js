/**
 * 自动加载路由
 * @returns 路由中间件
 */

const fs = require("fs");
const Router = require("koa-router");

const router = new Router();

//自动加载路由
fs.readdirSync(__dirname).forEach((file) => {
  if (file !== "index.js") {
    // 把除本文件的其他路由导入
    const r = require("./" + file);
    router.use(r.routes());
  }
});
module.exports = router;
