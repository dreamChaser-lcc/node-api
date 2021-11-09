const { DataTypes } = require("sequelize");
const seq = require("../db/sequelize");
const goodModel = require("./goods.model");

const cartModel = seq.define("carts", {
  goods_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "商品id",
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "绑定用户id",
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: "商品数量",
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: "是否选中",
  },
});
// cartModel.sync({ force: true });
// cart表关联good表，并设置goods_id外键
cartModel.belongsTo(goodModel, {
  foreignKey: "goods_id",
  as:'goodsList'
});

module.exports = cartModel;
