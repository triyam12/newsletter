const express = require('express')
const bodyParser = require('body-parser')

const cron = require("node-cron");
const discordbot = require("./utils/discordbot")

const mountRoutes = require('./routes')

const app = express()
const port = process.env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mountRoutes(app)

app.get("/", async(req, res) => {
    res.status(200).json({ message: "Hello Testing 1 2 3 4 ..." });
})

cron.schedule("0 0 */1 * * *", () => {
// cron.schedule(" */1 * * * * *", () => {
    console.log("---------------------");
    discordbot
    console.log("running discord bot in every  1 hours");
});

console.log("hello");

app.listen(port ,() => {
    console.log(`Server app listening on ${port}`)
})