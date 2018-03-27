const router = require('koa-router')()
const formidable = require('formidable');
const fs = require("fs");
const sd = require("silly-datetime");
const path = require("path");

router.post('/upload_images', async (ctx, next) => {
  try {
    let parse = (req) => {
      return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
              if (err) {
                  console.error('Error: ' + JSON.stringify(err));
                  reject(err);
                  return false;
              }
              resolve(files);
          })
      })
    }
    let rename = (oldpath, newpath, imgname) => {
      return new Promise((resolve, reject) => {
        fs.rename(oldpath, newpath, function(err){
            if(err){
              console.error('Error: ' + JSON.stringify(err));
              reject(err);
              return false;
            }
            resolve(imgname);
        });
      })
    }

    let form = new formidable.IncomingForm();
    form.uploadDir = __dirname + "/../" + "img_tmp/";
    let ttt = sd.format(new Date(),"YYYYMMDDHHmmss");
    let ran = parseInt(Math.random()*89999 + 10000);
    let files = await parse(ctx.req);

    let extname = path.extname(files.file.name);
    let oldpath = files.file.path;
    let imgname = ttt + ran + extname;
    let newpath = __dirname + "/../" + "public/images/" + imgname;

    let url = await rename(oldpath, newpath, imgname);
    if (!url) {
      return ctx.sendError('上传图片出错!');
    }
    ctx.send({url: url}, '上传图片成功');
  } catch (e){
    ctx.sendError('错误!');
  }
  await next();
})

module.exports = router
