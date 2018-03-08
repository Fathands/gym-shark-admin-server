const db_func = require('./db')
const get_format_date = require('./get_format_date')

module.exports = () => {
    const func = Object.assign({}, get_format_date, db_func)
    return async (ctx, next) => {
        for (let v in func) {
            if (func.hasOwnProperty(v)) ctx[v] = func[v];
        }
        await next()
    }
}