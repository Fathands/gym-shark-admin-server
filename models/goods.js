let mongoose = require('../db/mongoose.js'),
    Schema = mongoose.Schema;
let goodsSchema = new Schema({
    goods_name: String,
    goods_style: String
})
module.exports = mongoose.model('goods', goodsSchema);