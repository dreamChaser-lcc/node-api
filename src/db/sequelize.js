/**
 * 连接数据库，或连接池
 */
const {
  /**主机地址 */
  MYSQL_HOST,
  /**端口 */
  MYSQL_POST,
  /**用户名(数据库) */
  MYSQL_USER,
  /**密码 */
  MYSQL_PASSWORD,
  /**数据库名 */
  MYSQL_DB,
} = require("../config/config.default");
const { Sequelize } = require("sequelize");

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
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