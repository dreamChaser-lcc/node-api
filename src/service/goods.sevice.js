const goodModel = require("../model/goods.model");
class GoodSevice {
  // 创建商品
  async createGoods(goods) {
    const res = await goodModel.create(goods);
    return res ? res.dataValues : null;
  }
  // 更新商品
  async updateGoods(id, goods) {
    console.log(id, goods);
    const res = await goodModel.update(goods, { where: { id } });
    return res[0] > 0 ? true : false;
  }
  async updateGoods(id, goods) {
    console.log(id, goods);
    const res = await goodModel.update(goods, { where: { id } });
    return res[0] > 0 ? true : false;
  }
  async removeGoods(id) {
    const res = await goodModel.destroy({ where: { id } });
    return res > 0 ? true : false;
  }
  async restoreGoods(id) {
    const res = await goodModel.restore({ where: { id } });
    return res > 0 ? true : false;
  }
  async findAllGoods(pageNum, pageSize) {
    // deleteAt 为null 的数据,即为下架(软删除)
    const total = await goodModel.count();
    // 起始数据行
    const offset = (pageNum - 1) * pageSize;
    const size = parseInt(pageSize);
    const rows = await goodModel.findAll({ offset, limit: size });
    const resRows = rows.map((val) => val.dataValues);
    return {
      pageNum,
      pageSize,
      total,
      data: resRows,
    };
  }
}
module.exports = new GoodSevice();
