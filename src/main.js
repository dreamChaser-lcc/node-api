// 环境变量中获取配置变量
const {APP_POST} = require('./config/config.default');
// 导入koa app 目录优化有助于app使用框架更替或调整
const app = require('./app/index');

app.listen(APP_POST,()=>{
    console.log(`severce start success http://localhost:${APP_POST}`)
})