const auth = require("./auth")
const ainewsletter = require('./ainewsletter')
const utilityRoutes = require('./utilityRoutes')

module.exports = app => {
    app.use("/auth", auth)
    app.use('/ainewsletter', ainewsletter)
    app.use('/utilityRoutes', utilityRoutes)
}