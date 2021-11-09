const { goodParamsError } = require("../constant/err.type");
/**商品参数验证中间件 */
const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_name: { type: "string", required: true },
      goods_price: { type: "number", required: true },
      goods_num: { type: "number", required: true },
      goods_img: { type: "string", required: true },
    });
  } catch (err) {
    console.log("商品参数校验出错", err);
    goodParamsError.result = err;
    return ctx.app.emit("error", goodParamsError, ctx);
  }
  await next();
};
module.exports = {
  validator,
};
