const fs = require('fs');
const path = require('path');
// const multiparty = require('multiparty'); koa不适用暂时不用吧
const multer = require('@koa/multer');
const upload = multer();
const { removeDirRecursive, appendFilesSync, getFileSortByIndex} = require('../utils/index');

class UtilsController {
  /**
   * 定义解析formData中的file字段
   * 相关文档：
   * multer: https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
   * koa/multer：https://www.npmjs.com/package/@koa/multer
   * @returns 
   */
  async uploadDefine(ctx,next){
    const fields = [
      {
        name: 'fileSlice',// 需要和前端定义好的字段统一否则报错，这里为了以后扩展
        maxCount: 1
      }, 
    ]
    // 其实可以用upload.single
    return upload.fields(fields)(ctx,next);
  }

  /**文件分片上传并返回地址 */
  async uploadFileSlice(ctx) {
    const formData = ctx.request.body; // FormData 数据中除了定义的upload.fields字段外，都会被解析到这里
    const fileSlice = ctx.request.files.fileSlice;
    
    try{
      const { md5, suffix, fileName, chunkIndex, total } =  ctx.request.body;
      const dirPath = path.resolve(__dirname, `../upload/slice_${fileName}`);
      const filePath = `${chunkIndex}_${md5}_${fileName}.${suffix}`;
      const slicePath = path.resolve(__dirname, dirPath, filePath);
      if(!fs.existsSync(dirPath)){ // 如果清空之前上传的内容，为了节省磁盘
        const parentDir = path.resolve(__dirname, `../upload`);
        removeDirRecursive(parentDir, 'slice', true);
      }
      
      if(!fs.existsSync(slicePath)){  // 秒传，上传过直接不写入文件（后端处理，也可以前端上传前，调接口查询是否已经上传并标记）
        // 递归创建没有的目录
        fs.mkdirSync(path.dirname(slicePath), { recursive: true });
        // 上传写入文件
        const err = fs.writeFileSync(slicePath, fileSlice[0].buffer,{encoding:'utf8'});
        if(err){
          ctx.body = {
            code: "00001",
            message: `上传失败, 原因：${err}`,
          }
          return;
        }
      }
      const fileList = await getFileSortByIndex(dirPath);
      const response = {
        code: "00000",
        message: `上传成功`,
        result: {
          process: fileList.length,
          total: total,
        },
      }
      if(total && fileList.length === Number(total)){
        const mergeFilePath = path.resolve(__dirname, `../upload/slice_merge_${fileName}.${suffix}`);
        const url = await appendFilesSync(mergeFilePath, fileList);
        if(url){
          // 因为node静态目录是upload，暂时写死吧
          const staticUrl = `/upload/slice_merge_${fileName}.${suffix}`;
          response.result.url = staticUrl;
        }
      }
      ctx.body = response;
    }catch(error){
      ctx.body = {
        code: "00001",
        message: `上传失败, 原因：${error}`,
      }
      console.error("上传分片失败", error, formData);
    }
  }

}
module.exports = new UtilsController();
