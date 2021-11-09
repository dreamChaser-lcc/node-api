const { Op } = require("sequelize");
const goodModel = require("../model/goods.model");
const cartModel = require("../model/cart.model");
class CartSevice {
  async createOrUpdate(user_id, goods_id) {
    const res = await cartModel.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id,
        },
      },
    });
    if (res) {
      // 当数据存在 number自增,即商品数量字段自增加
      await res.increment("number");
      const result = await res.reload();
      return result;
    } else {
      const result = await cartModel.create({
        user_id,
        goods_id,
      });
      return result;
    }
  }
  async findAllCarts(user_id, pageNum, pageSize) {
    console.log(user_id, pageNum, pageSize);
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await cartModel.findAndCountAll({
      attributes: ["id", "number", "selected"],
      where: { user_id },
      offset, //起始行
      limit: parseInt(pageSize),
      // 外键关联goods表
      include: {
        model: goodModel,
        as: "goodsList",
        attributes: ["id", "goods_name", "goods_price", "goods_img"],
      },
    });
    const result = {
      pageNum,
      pageSize,
      total: count,
      result: rows,
    };
    return result;
  }
  async updateCart(id, number, selected) {
    const res = await cartModel.findByPk(id);
    if (!res) return "";
    number && (res.number = number);
    selected !== undefined && (res.selected = selected);
    return await res.save();
  }
  async deleteCart(user_id, idList) {
    // 数组中的id删除
    const res = await cartModel.destroy({
      where: {
        user_id,
        id: {
          [Op.in]: idList,
        },
      },
    });
    return res;
  }
  async selectedState(user_id, state) {
    return await cartModel.update(
      {
        selected: state,
      },
      {
        where: { user_id },
      }
    );
  }
}
module.exports = new CartSevice();
