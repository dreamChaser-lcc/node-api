const {
  createOrUpdate,
  findAllCarts,
  updateCart,
  deleteCart,
  selectedState
} = require("../service/cart.sevice");

class CartController {
  // 添加购物车
  async add(ctx) {
    try {
      const user_id = ctx.state.user.id;
      const goods_id = ctx.request.body.goods_id;
      const res = await createOrUpdate(user_id, goods_id);
      if (res) {
        ctx.body = {
          code: "00000",
          message: "添加购物车成功",
          result: res,
        };
      }
    } catch (error) {
      console.error("添加失败", error);
    }
  }
  async findAll(ctx) {
    const user_id = ctx.state.user.id;
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    const res = await findAllCarts(user_id, pageNum, pageSize);
    // if (res) {
    ctx.body = {
      code: "00000",
      message: "查询购物车列表成功",
      result: res,
    };
    // }
  }
  async update(ctx) {
    try {
      const id = ctx.request.params.id;
      const { number, selected } = ctx.request.body;
      const res = await updateCart(id, number, selected);
      if (res) {
        ctx.body = {
          code: "00000",
          message: "更新成功",
          result: res,
        };
      }
    } catch (err) {
      console.err("更新购物车失败", err);
    }
  }
  async removeCarts(ctx) {
    const { id: user_id } = ctx.state.user;
    const { idList } = ctx.request.body;
    try {
      const res = await deleteCart(user_id, idList);
      if (res) {
        ctx.body = {
          code: "00000",
          message: "删除成功",
          result: res,
        };
      } else {
        throw "或id属于该用户,id不存在,数据库错误";
      }
    } catch (error) {
      console.error("删除失败", error, user_id, idList);
    }
  }
  async allSelectState(ctx) {
    console.log("state")
    const { id: user_id } = ctx.state.user;
    const { state } = ctx.request.body;
    const tip = state ? "全选" : "全不选";
    try {
      const res = await selectedState(user_id,state);
      if (res) {
        ctx.body = {
          code: "00000",
          message: `${tip}成功`,
          result: res,
        };
      } 
    } catch (error) {
      console.error("删除失败", error, user_id, idList);
    }
  }
}
module.exports = new CartController();
