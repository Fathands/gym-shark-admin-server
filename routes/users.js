const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const conf = require('../libs/config.js')
// model
let User = require("../models/user.js");

router.prefix('/api/users')

router.post('/login', async (ctx, next) => {
  let {username, password} = ctx.request.body;
  try {
    // console.log(ctx.query, 1);
    // console.log(ctx.request, 2);
    // console.log(ctx.request.body, 3);
    let data = await ctx.findOne(User, {username: username});
    if (!data) {
      return ctx.sendError('用户名不存在！');
    }
    if (password !== data.password) {
        return ctx.sendError('密码错误,请重新输入！');
    }
    let payload = {
      _id: data._id,
      username: data.username,
      roles: data.roles
    }
    let token = jwt.sign(payload, conf.auth.admin_secret, {expiresIn: '24h'})  //token签名 有效期为24小时
    ctx.cookies.set(conf.auth.tokenKey, token, {
        httpOnly: false,  // 是否只用于http请求中获取
    });
    ctx.send({token: token, roles: data.roles}, '登录成功');
  } catch (e){
    ctx.sendError('错误!');
  }
  await next();
})

router.post('/register', async (ctx, next) => {
  let {username} = ctx.request.body;
  try {
    let createtime = new Date();
    let data = await ctx.findOne(User, {
      username: username
    });
    if (data) {
      return ctx.sendError('用户名已存在!');
    }
    await ctx.add(User, {
      username: ctx.request.body.username,
      password: ctx.request.body.password,
      createtime: ctx.getFormatDate(createtime)
    });
    ctx.send({msg: '注册成功!'});
  } catch (e){
    ctx.sendError('错误!');
  }
  await next();
})

module.exports = router
