# npm 包作用注解

## dev 调试工具

nodemon 监听文件改变，并重启服务器

## 环境变量配置

dotenv 读取.env 文件下的配置，加载到 process.env 中，通过 process.env 可以访问到配置变量

## 请求体解析

- koa-body 解析请求体 request-body,将请求数据写入 ctx.request.body,同中间件方法使用
- 其中 options 可配置上传文件等，详细看 src/app/index.js

## 上传图片回显、静态资源回显，图片或其他文件

- koa-static
- 详细配置 src/app/index.js
- 回显路径:静态资源路径,例如 <http://localhost:8080/upload_d2e36932b98be228b4338b989bdc2c9c.jpg>

## 数据库操作

sequelize ORM 操作库

- ORM 对象关系映射
- 数据表映射到每个一类
- 每条数据行映射一个对象
- 数据表的字段映射对象中的属性
- 数据表的操作对应对象中的方法

### 数据库驱动

使用 sequelize 需要搭配数据驱动
mysql2 或其他数据库驱动
当前使用 mysql2

- v6 当前引擎 W 最低支持 mysql 5.7

## 密码加密

becryptjs

## 颁发 token

jsonwebtoken
扩展 JWT(JSON WEB TOKEN)

- header 头部
- payload 载荷
- signature 签名

## koa-parameter

参数校验

## 日志收集

winston [github 项目地址](https://github.com/winstonjs/winston/tree/2.x#streaming-logs)
or
使用 log4js, [官网地址](https://log4js-node.github.io/log4js-node/layouts.html)

```js
// logger输出示例
const { logger } = require("../config/config.log");

logger.info("info", { timeStamp: new Date(), ip: "123" });
// 输出结果 => {"ip":"123","level":"info","message":"info","service":"user-service","timeStamp":"2023-05-15T13:23:33.732Z"}
```

## 目录结构注解

目录及文件结构分明是为了更好的解耦
| 目录 | 作用 |
| ------------- | ----------------------------------------------------------------- |
| main.js | 入口执行主程序，负责挂载服务 app 与监听端口 |
| app | app 应用，项目使用 koa 框架 |
| .env | 环境变量配置，搭配 dotenv 实现读取并写入 process.env |
| config | 环境变量导出 |
| router | 路由中间件，负责分配路由 |
| controller | 控制器，处理业务逻辑 |
| db | 数据库配置文件，实例化数据库或配置连接池 |
| model | 数据库 ORM,对象关系映射文件，将数据库映射到类，相当于 javaBean 类 |
| sevice | 数据库操作目录，具体的增删改查方法导出 |
| middleWare | 中间件的拆分，针对 controller 业务多且可复用时，进行解耦 |
| constant | 常量，存放异常处理返回常量或者其他 |
| errHandler.js | 异常信息统一处理文件，统一返回 app.on 处理 |

## 技巧

## 自动加载路由中间件

- 通过 fs 模块将模块遍历导入到 Router
- 并导出模块
- 详细查看文件 src/router/index.js
