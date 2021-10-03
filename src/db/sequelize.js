/**
 * 连接数据库，或连接池
 */
const {
  MYSQL_HOST,
  MYSQL_POST,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
} = require("../config/config.default");
const { Sequelize } = require("sequelize");
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  post: MYSQL_POST,
  dialect: "mysql",
});

// 测试连接
// seq
//   .authenticate()
//   .then(() => {
//     console.log("连接成功");
//   })
//   .catch((err) => console.log(err));

module.exports = seq;