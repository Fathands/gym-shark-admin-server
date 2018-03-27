const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const conf = require('../../libs/config.js')

module.exports = () => {
    return async (ctx, next) => {
        if ( conf.auth.whiteList.some(v => ctx.path.indexOf(v) >= 0) ) {
            console.log('whiteList');
        } else {
            let token = ctx.header.authorization;
            try {
                if (token) {
                    verify(token, conf.auth.admin_secret).then(() => {
                    }).catch(() => {
                    });
                    // 返回参数结构
                    // { 
                    //     _id: '5a9f5cc6adb2f7649bab9cc8',
                    //     username: 'aaa',
                    //     roles: [ 0 ],
                    //     iat: 1520587158,
                    //     exp: 1520673558 
                    // }
                    // console.log(verify(token, conf.auth.admin_secret), 11);
                }
            }catch (e) {
                if ('TokenExpiredError' === e.name) {
                    ctx.sendError('token已过期, 请重新登录!');
                    ctx.throw(401, 'token expired,请及时本地保存数据！');
                }
                ctx.sendError('token验证失败, 请重新登录!');
                ctx.throw(401, 'invalid token');
            }
            console.log("鉴权成功");
        }
        await next();
    }
}