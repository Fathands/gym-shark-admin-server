module.exports = () => {
  let render = ctx => {
      return (json, msg) => {
        ctx.set("Content-Type", "application/json");
        ctx.body = JSON.stringify({
            status: 1,
            data: json || {},
            msg: msg || 'success'
        });
      }
  }
  let renderError = ctx => {
      return msg => {
        ctx.set("Content-Type", "application/json");
        ctx.status = 500;
        ctx.body = JSON.stringify({
            status: 0,
            data: {},
            msg: msg.toString()
        });
      }
  }
  return async (ctx, next) => {
        ctx.send = render(ctx);
        ctx.sendError = renderError(ctx);
        await next()    
  }
}