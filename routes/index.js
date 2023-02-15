const auth = require("./auth")
const ainewsletter = require('./ainewsletter')

module.exports = app => {
    app.use("/auth", auth)
    app.use('/ainewsletter', ainewsletter)
}