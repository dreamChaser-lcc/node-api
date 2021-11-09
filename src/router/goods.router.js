const Router = require("koa-router");

const { auth, hadAdminPermission } = require("../middleWare/auth.middleware");
const {
  uploadImage,
  create,
  upadate,
  deleteGoods,
  restore,
  findAll
} = require("../controller/goods.controller");
const { validator } = require("../middleWare/goods.middleware");
const router = new Router({ prefix: "/good" });

// 商品图片上传
router.post("/upload", auth, hadAdminPermission, uploadImage);
// 发布商品
router.post("/release", auth, hadAdminPermission, validator, create);
// 更新商品 /:id表示参数从url输入
router.put("/update/:id", auth, hadAdminPermission, validator, upadate);
// 硬删除商品
// router.delete("/delete/:id", auth, hadAdminPermission, deleteGoods);
// 软删除商品(上架功能)
router.post("/delete/:id/:off", auth, hadAdminPermission, deleteGoods);
// 恢复软删除商品(上架功能)
router.post("/restore/:id/:on", auth, hadAdminPermission, restore);
// 查看商品列表
router.get("/list", auth, findAll);
module.exports = router;
