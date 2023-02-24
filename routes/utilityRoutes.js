const express = require("express");
const ObjectsToCsv = require("objects-to-csv");
const fs = require('fs')
const router = express.Router()

const data = [
    { code: 'CA', name: 'California' },
    { code: 'TX', name: 'Texas' },
    { code: 'NY', name: 'New York' },
];

const DiscordSchema = require("../model/discordSchema");

require("dotenv").config();
module.exports = router;

router.get("/test", async (req, res) => {
    return res.status(201).json({ message: "Testing utility routes" });
})

router.get("/jsonData", async (req, res) => {
    try {
        const discordData = await DiscordSchema.find({})

        var json = JSON.stringify(discordData);

        if (discordData !== undefined) {
            // const csv = new ObjectsToCsv(discordData)

            // console.log(csv);

            // await csv.toDisk(`temp/discordData.csv`);
            fs.writeFileSync('discordData.json', json, 'utf8')
            

            return res.download(`discordData.json`, () => {
                fs.unlinkSync(`discordData.json`)
               
            })
        }


    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
})