let mongoose = require('../db/mongoose.js'),
    Schema = mongoose.Schema;
let userSchema = new Schema({
    username: String,
    password: String,
    roles: { type: Array, default: [1]},
    createtime: String
})
module.exports = mongoose.model('user', userSchema);
