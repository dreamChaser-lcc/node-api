const dotenv = require('dotenv');
dotenv.config();
// 测试 从环境变量env中 访问.env文件自动配置好的变量
// console.log(process.env.APP_POST);
module.exports = process.env;