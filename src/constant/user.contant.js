/**
 * 常量
 * 异常处理信息
 */
module.exports = {
  userFomaterError: {
    code: "10001",
    message: "用户名或密码为空！",
    result: "",
  },
  userAlreayExisted: {
    code: "10002",
    message: "用户存在",
    result: "",
  },
  userRegisteError:{
    code: "10003",
    message: "用户注册错误",
    result: "",
  },
  userDoneNotExist:{
    code: "10004",
    message: "用户不存在",
    result: "",
  },
  userLoginError:{
    code: "10005",
    message: "用户登录失败",
    result: "",
  },
  invaildPassword:{
    code:"10006",   
    message: "用户密码不匹配",
    result: "",
  },
  updatePasswordError:{
    code:"10007",   
    message: "用户密码修改失败",
    result: "",
  }
};
