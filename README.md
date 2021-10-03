# npm包作用注解
## dev调试工具
nodemon 监听文件改变，并重启服务器
## 环境变量配置
dotenv 读取.env文件下的配置，加载到process.env中，通过process.env可以访问到配置变量
## 请求体解析
koa-body 解析请求体request-body,将请求数据写入ctx.request.body,同中间件方法使用

## 数据库操作
sequelize ORM操作库
- ORM 对象关系映射
- 数据表映射到每个一类
- 每条数据行映射一个对象
- 数据表的字段映射对象中的属性
- 数据表的操作对应对象中的方法
### 数据库驱动
使用sequelize需要搭配数据驱动
mysql2或其他数据库驱动
当前使用mysql2 
- v6当前引擎 W最低支持mysql 5.7
## 密码加密
becryptjs

# 目录结构注解
目录及文件结构分明是为了更好的解耦
| 目录          | 作用                                                           |
| ------------- | -------------------------------------------------------------- |
| main.js       | 入口执行主程序，负责挂载服务app与监听端口                      |
| app           | app应用，项目使用koa框架                                       |
| .env          | 环境变量配置，搭配dotenv实现读取并写入process.env              |
| config        | 环境变量导出                                                   |
| router        | 路由中间件，负责分配路由                                       |
| controller    | 控制器，处理业务逻辑                                           |
| db            | 数据库配置文件，实例化数据库或配置连接池                       |
| model         | 数据库ORM,对象关系映射文件，将数据库映射到类，相当于javaBean类 |
| sevice        | 数据库操作目录，具体的增删改查方法导出                         |
| middleWare    | 中间件的拆分，针对controller业务多且可复用时，进行解耦         |
| constant      | 常量，存放异常处理返回常量或者其他                             |
| errHandler.js | 异常信息统一处理文件，统一返回app.on处理                       |