const router = require('koa-router')()
// model
let Goods = require("../models/goods.js");

router.prefix('/api/goods');

router.post('/add_goods', async (ctx, next) => {
  let res = ctx.request.body;
  console.log(res, 222)
  try {
    // ctx.send({}, '注册成功!');
  } catch (e){
    ctx.sendError('错误!');
  }
  await next();
})

module.exports = router
