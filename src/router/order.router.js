const Router = require("koa-router");
// 分割中间件
const { auth } = require("../middleWare/auth.middleware");
const router = new Router({ prefix: "/order" });
router.post('/create',auth,(ctx)=>{
  
})
