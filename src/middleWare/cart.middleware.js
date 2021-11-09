const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_id: { type: "number", required: true },
    });
  } catch (error) {
    console.error("无效购物车id", error);
    return;
  }
  await next();
};
module.exports = {
  validator,
};
