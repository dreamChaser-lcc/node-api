/*
 * @Author: lcc
 * @Date: 2024-06-11 00:27:35
 * @LastEditTime: 2024-06-16 02:35:20
 * @LastEditors: lcc
 * @Description: 工具类路由
 */

const multer = require('@koa/multer');
const upload = multer();
const Router = require("koa-router");
// 控制器
const { uploadDefine, uploadFileSlice } = require("../controller/utils.controller");

const router = new Router({ prefix: "/utils" });

// 分片上传
router.post("/uploadFileSlice", uploadDefine, uploadFileSlice);

module.exports = router;
