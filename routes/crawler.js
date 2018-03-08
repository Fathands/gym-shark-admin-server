const router = require('koa-router')()
const request = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs-extra')

router.prefix('/crawler')

router.get('/begin', async (ctx, next) => {
  let url = 'http://www.mmjpg.com/tag/meitui/'
  const res = await request.get(url + 1)
  const $ = cheerio.load(res.text)
  let pic_list = []
  $('.pic li').each(function(i, elem) {
    const href = $(this).find('a').attr('href')
    const pic_title = $(this).find('.title').text()
    pic_list.push({
      href,
      pic_title
    })
  })
  ctx.body = pic_list
})

module.exports = router