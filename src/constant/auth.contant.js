/**权限报错信息 */
module.exports = {
  tokenExpiredError: {
    code: "10101",
    message: "token已过期",
    result: "",
  },
  invalidToken: {
    code: "10102",
    message: "无效token或不存在",
    result: "",
  },
  hasNotPermission:{
    code: "10103",
    message: "没有管理员权限",
    result: "",
  },
};
