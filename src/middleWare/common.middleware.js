const path = require("path");
// 解析请求体的npm包
const koaBody = require("koa-body");
// 自动上传保存文件的路由
const useAutoUpload = ['/good/upload'];

/**
 * 二次封装koa-body插件
 * 因为koa-body在处理formData表单数据会自动保存文件，
 * 这样并不好，但又希望其解析其他类型的请求头，所以为保存旧逻辑，只对某些路由进行multipart解析
 * @returns 
 */
const wrappedKoaBody = ()=>{
  return async (ctx,next)=>{
    let defaultParams = {
      multipart: false, // 解析formData
      // 让koa-body支持请求方式，并将请求参数解析到ctx.request.body中
      parsedMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    }
    if(useAutoUpload.includes(ctx.path)){ // 符合的自动上传文件，否则不进行formData文件上传，旧逻辑，先保存吧
      defaultParams = {
        ...defaultParams,
        multipart: true,
        formidable: {
          // 拼接正确文件上传路径
          uploadDir: path.join(__dirname, "../upload"),
          // 保存文件后缀名
          keepExtensions: true,
          // 限制上传图片为图片 !!bug未生效
          filter: ({ name, originalFilename, mimetype }) => {
            console.log(mimetype);
            // keep only images
            return false;
          },
          multiples: true,
        },
      }
    }
    const middleWare = koaBody(defaultParams); 
    return middleWare(ctx,next);
  }
}

module.exports = { 
    wrappedKoaBody
};