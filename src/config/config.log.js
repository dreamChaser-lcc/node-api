const winston = require('winston');
const log4js = require("log4js");
// const path = require("path");

// log4js.configure({
//   appenders: {
//     logInfo:{
//       type: "dateFile", // 文件输出
//       filename: path.join(__dirname, "./log/log"), // 需要手动创建此文件夹
//       pattern: "yyyy-MM-dd.log",
//       alwaysIncludePattern: true,
//       maxLogSize: 1024,
//       backups: 4, // 日志备份数量，大于该数则自动删除
//       category: "logInfo", // 记录器名
//     },
//   },
//   categories: {
//     default: { appenders: [ 'logInfo' ], level: 'info' },
//     // logInfo: { appenders: [ 'logInfo' ], level: 'info'}
//    }
//   // replaceConsole: true // 替换 console.log
// });

// const logger = log4js.getLogger('logInfo'); 

// exports.logger =logger


const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

const logDirectory = path.join(__dirname, 'logs');
const transport = new DailyRotateFile({
  filename: `${logDirectory}/%DATE%-access.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '15m',
  maxFiles: '360d'
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    transport,
    new winston.transports.Console(),
  ]
});
exports.logger = logger;