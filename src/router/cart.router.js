const Router = require("koa-router");
// 分割中间件
const { auth } = require("../middleWare/auth.middleware");
const { validator } = require("../middleWare/cart.middleware");
// 控制器
const {
  add,
  findAll,
  update,
  removeCarts,
  allSelectState
} = require("../controller/cart.controller");

const router = new Router({ prefix: "/cart" });
// 添加购物车
router.post("/add", auth, validator, add);
// 查询购物车列表
router.get("/list", auth, findAll);
// 更新购物车
router.patch("/update/:id", auth, update);
// 删除购物车
router.delete("/delete", auth, removeCarts);
// 全选或全不选
router.post("/selectAll", auth, allSelectState);
module.exports = router;
