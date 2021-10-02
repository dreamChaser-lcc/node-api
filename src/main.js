const Koa = require('koa');
const app = new Koa();
const {APP_POST} = require('./config/config.default');
app.use((ctx,next)=>{
    console.log("ctx",ctx);
    ctx.body='aa123';
})
app.listen(3000,()=>{
    console.log(`severce start success http://localhost:${APP_POST}`)
})