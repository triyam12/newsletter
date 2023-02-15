const mongoose = require("mongoose");

const discordSchema = new mongoose.Schema({
    "serverName": {
        type: String
    },
    "channelID": {
        type: String
    },
    "channelContent": {
        type: Array,
        "default": []
    },
    "channelSummary": {
        type: Array,
        "default": []
    },
    "channelAdmin": {
        type: Array,
        "default": []
    }
})

const Discord = mongoose.model("discord", discordSchema);

module.exports = Discord;