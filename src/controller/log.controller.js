const { logger } = require("../config/config.log");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

/**获取文件列表 */
function getFiles(dir, extension, filesList = []) {
  // 读取目录中的所有文件名
  const files = fs.readdirSync(dir);

  // 遍历文件列表
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    // 如果是目录，则递归调用
    if (stat.isDirectory()) {
      getFiles(filePath, filesList);
    } else if (path.extname(filePath) === extension) {
      filesList.push(filePath);
    }
  }
  return filesList;
}

/**埋点日志 */
class LogController {
  async getAccessCity(ip) {
    const url = `https://restapi.amap.com/v3/ip?ip=${ip}&key=1910b6313e04b966d95a5e69cc2ee50c`;
    const res = await axios.get(url);
    return res.data;
  }

  /**采集登录日志 */
  async collectLoginLog(ctx, next) {
    const { user_name } = ctx.request.body;
    const ip =
      ctx.request.headers["x-forwarded-for"] ||
      ctx.request.headers["x-real-ip"] ||
      ctx.request.connection?.remoteAddress;
    const userAgent = ctx.header["user-agent"];
    const logInfo = {
      ip: ip,
      province: "未识别",
      city: "未识别",
      loginTime: new Date(),
      userAgent,
      user_name,
    };
    if (logInfo.ip) {
      // const url = `https://restapi.amap.com/v3/ip?ip=${logInfo.ip}&key=1910b6313e04b966d95a5e69cc2ee50c`;
      const baiduUrl = `https://qifu-api.baidubce.com/ip/geo/v1/district?ip=${logInfo.ip}`
      const { data } = await axios.get(baiduUrl);
      if(data.code === 'Success'){
        logInfo.province = data.data.prov;
        logInfo.city = data.data.city;
        logInfo.district = data.data.district;
      }
    }
    logger.info(logInfo);
    await next();
  }

  async getCollectLog(ctx, next) {
    try {
      const dir = path.join(__dirname, "../config/logs");
      const fileList = getFiles(dir, ".log");
      const logList = [];
      for (let file of fileList) {
        const res = fs.readFileSync(file, "utf8");
        const list = res.split("\r\n");
        for (let record of list) {
          if (record) {
            logList.push(JSON.parse(record));
          }
        }
      }
      ctx.body = {
        code: "00000",
        message: "查询成功",
        result: { logList },
      };
    } catch (err) {
      console.error(
        "🚀 ~ file: log.controller.js:81 ~ 查询log记录错误啦:",
        err
      );
      const result = {
        code: "10003",
        message: "查询log记录错误啦!!!快去查看node日志",
      };

      ctx.app.emit("error", result, ctx);
    }
  }
}

module.exports = new LogController();
