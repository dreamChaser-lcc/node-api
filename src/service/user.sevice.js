/**
 * 数据操作
 * 增删改查
 */
const userModel = require("../model/user.model");
class UserService {
  async createUser(user_name, password) {
    const res = await userModel
      .create({ user_name, password })
      .catch((err) => console.log(err));
    return res ? res.dataValues : null;
  }
  // 查询是否存在行   
  async findUserInfo({ id, user_name, password, is_admin }) {
    const whereObj = {};
    id && Object.assign(whereObj, { id });
    user_name && Object.assign(whereObj, { user_name });
    password && Object.assign(whereObj, { password });
    is_admin && Object.assign(whereObj, { is_admin });
    const res = await userModel.findOne({
      attributes: ["id", "user_name", "password", "is_admin"],
      where: whereObj,
    });
    return res ? res.dataValues : null;
  }
}
module.exports = new UserService();
