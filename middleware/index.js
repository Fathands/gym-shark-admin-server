// import Rule from './rule'
// import Log from './log'
const path = require('path')
const Send = require('./send')
const Auth = require('./auth')
const Func = require('./func')

module.exports = app => {

    //缓存拦截器
    app.use(async (ctx, next) => {
        // if (ctx.url == '/favicon.ico') return
        await next()
        ctx.set('Cache-Control', 'must-revalidation')
        if (ctx.fresh) {
            ctx.status = 304
            return
        }
    })

    // 日志中间件
    // app.use(Log())

    // 数据返回的封装
    app.use(Send())

    // 方法封装
    app.use(Func())

    //权限中间件
    app.use(Auth())

    // 规则中间件
    // Rule({
    //     app,
    //     rules: [
    //         {
    //             path: path.join(__dirname, '../controller/admin'),
    //             name: 'admin'
    //         },
    //         {
    //             path: path.join(__dirname, '../controller/client'),
    //             name: 'client'
    //         }
    //     ]
    // })

    // 增加错误的监听处理
    app.on("error", (err, ctx) => {
        if (ctx && !ctx.headerSent && ctx.status < 500) {
            ctx.status = 500
        }
        if (ctx && ctx.log && ctx.log.error) {
            if (!ctx.state.logged) {
                ctx.log.error(err.stack)
            }
        }
    })

}