const path = require("path");
const { fileUploadError, createGoodsError } = require("../constant/err.type");
const {
  createGoods,
  updateGoods,
  removeGoods,
  restoreGoods,
  findAllGoods,
} = require("../service/goods.sevice");
class GoodController {
  async uploadImage(ctx, next) {
    const { file } = ctx.request.files;
    if (file) {
      ctx.body = {
        code: "00000",
        message: "文件上传成功",
        result: {
          img_path: path.basename(file.path),
        },
      };
    } else {
      console.error("文件上传失败", ctx.request.files);
      ctx.app.emit("error", fileUploadError, ctx);
      return;
    }
  }
  async create(ctx, next) {
    const params = ctx.request.body;
    try {
      const res = await createGoods(params);
      if (res) {
        ctx.body = {
          code: "00000",
          message: "商品发布成功",
          result: res,
        };
      }
    } catch (error) {
      console.error("商品发布写入数据库失败", error);
      ctx.app.emit("error", createGoodsError, ctx);
      return;
    }
  }
  async upadate(ctx) {
    const goods = ctx.request.body;
    // 从url获取id
    const id = ctx.params.id;
    try {
      const res = await updateGoods(id, goods);
      if (res) {
        ctx.body = {
          code: "00000",
          message: "更新商品信息成功",
          result: "",
        };
      } else {
        const err = "未找到商品id(数据update返回小于0)";
        throw err;
      }
    } catch (error) {
      console.error("商品更新信息失败", error);
    }
  }
  async deleteGoods(ctx) {
    const id = ctx.params.id;
    try {
      const res = await removeGoods(id);
      if (res) {
        ctx.body = {
          code: "00000",
          message: "删除成功",
          result: "",
        };
      } else {
        throw { message: "删除商品返回false", params: ctx.params };
      }
    } catch (err) {
      console.error("删除商品失败", err);
    }
  }
  async restore(ctx) {
    const id = ctx.params.id;
    try {
      const res = await restoreGoods(id);
      if (res) {
        ctx.body = {
          code: "00000",
          message: "上架商品成功",
          result: "",
        };
      } else {
        throw "上架商品返回false";
      }
    } catch (err) {
      console.error("上架商品失败", err);
    }
  }
  async findAll(ctx) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    const res = await findAllGoods(pageNum, pageSize);
    if (res) {
      ctx.body = {
        code: "00000",
        message: "查询成功",
        result: res,
      };
    }
  }
}
module.exports = new GoodController();
