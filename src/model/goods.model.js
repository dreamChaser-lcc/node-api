const { DataTypes } = require("sequelize");
const seq = require("../db/sequelize.js");
const goodModel = seq.define(
  "good",
  {
    goods_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: "商品名称",
    },
    goods_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: "商品价格",
    },
    goods_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "商品库存",
    },
    goods_img: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品图片url",
    },
  },
  { 
    // 添加软删除字段
    paranoid: true 
  }
);

// goodModel.sync({force:true})
module.exports = goodModel;
