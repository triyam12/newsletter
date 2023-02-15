const express = require('express')
const bodyParser = require('body-parser')

const mountRoutes = require('./routes')

const app = express()
const port = process.env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mountRoutes(app)

app.get("/", async(req, res) => {
    res.status(200).json({ message: "Hello Testing 1 2 3 4 ..." });
})

app.listen(port ,() => {
    console.log(`Server app listening on ${port}`)
})