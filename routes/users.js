const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const conf = require('../libs/config.js')
// model
let User = require("../models/user.js");

router.prefix('/api/users');

router.post('/login', async (ctx, next) => {
  let {username, password} = ctx.request.body;
  let logintime = new Date();
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
    await ctx.update(User, {_id: data._id}, {$set:{logintime: ctx.getFormatDate(logintime)}}) //更新登陆时间
    let payload = {
      _id: data._id,
      username: data.username,
      roles: data.roles
    }
    let token = jwt.sign(payload, conf.auth.admin_secret, {expiresIn: '24h'})  //token签名 有效期为24小时
    ctx.send({token: token, roles: data.roles, logintime: data.logintime}, '登录成功');
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
      createtime: ctx.getFormatDate(createtime),
      logintime: ctx.getFormatDate(createtime),
      avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
    });
    ctx.send({}, '注册成功!');
  } catch (e){
    ctx.sendError('错误!');
  }
  await next();
})

router.post('/modify_password', async (ctx, next) => {
  let {username, oldpass, newpass} = ctx.request.body;
  try {
    let data = await ctx.findOne(User, {
      username: username
    });
    if (data && (data.password !== oldpass)) {
      return ctx.sendError('原始密码错误!');
    }
    await ctx.update(User, {
      username: username
    }, {
      password: newpass
    });
    ctx.send({}, '修改成功!');
  } catch (e){
    ctx.sendError('错误!');
  }
  await next();
})

router.post('/modify_person_info', async (ctx, next) => {
  let {username, avatar} = ctx.request.body;
  try {
    let data = await ctx.findOne(User, {
      username: username
    });
    await ctx.update(User, {
      username: username
    }, {
      avatar: avatar
    });
    ctx.send({avatar: avatar}, '修改成功!');
  } catch (e){
    ctx.sendError('错误!');
  }
  await next();
})

router.get('/get_one_person', async (ctx, next) => {
  let {username} = ctx.query;
  try {
    let data = await ctx.findOne(User, {
      username: username
    });
    ctx.send({avatar: data.avatar}, '获取成功!');
  } catch (e){
    ctx.sendError('错误!');
  }
  await next();
})

module.exports = router
