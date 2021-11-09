/**
 * 数据模型层
 */
const { DataTypes } = require("sequelize");
const seq = require("../db/sequelize.js");
const userModel = seq.define("user", {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "用户名",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "密码",
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: "是否是管理员，0:管理员，1:普通用户",
  },
});
// 创建数据表
// userModel.sync({force:true})
module.exports = userModel;
