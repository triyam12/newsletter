const express = require("express");
const { sendEmailMsgCtrl } = require("../controllers/emailMessageController");
const authMiddleware = require("../middleware/authenticate");
const emailMsgRoute = express.Router();

emailMsgRoute.post("/", sendEmailMsgCtrl);

module.exports = emailMsgRoute;