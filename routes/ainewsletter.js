const express = require("express")
const router = express.Router()

const DiscordSchema = require("../model/discordSchema")
const SuscriberSchema = require("../model/suscriberSchema")

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sdk = require('api')('@writesonic/v2.2#4ekm6b01flcau4wqa');
const nodeSchedule = require('node-schedule');
const cron = require("node-cron");
const jobScheduler = require("../utils/jobScheduler")

// require("../db/conn");

module.exports = router;

require("dotenv").config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
   ]
});

const discordbot = (options) => {
   client.on('messageCreate', async (message) => {
      // if (message.author.bot) return;
      // const channel = client.channels.cache.get("956556783189651468")
      const channel = client.channels.cache.get(options)


      // if (message.author.bot) {
      channel.messages.fetch({ limit: 100 }).then(messages => {
         console.log(`Received ${messages.size} messages`);
         //Iterate through the messages here with the variable "messages".
         messages.forEach(message => console.log(message.content))
      })
   })
}


client.login(process.env.BOT_TOKEN);


router.get("/test", async (req, res) => {
   let ranks = ['A', 'B', 'C'];

   ranks.forEach(function (e) {
      console.log(e);
   });
   res.status(201).json({ message: "Testing discord newsletter" })
})

router.get("/channelDelete", async (req, res) => {
   try {
      const deleteChannels = await DiscordSchema.deleteMany()
      if (deleteChannels) {
         console.log(true);
         res.status(201).json({ message: "All Channels deleted" })
      } else {
         res.status(401).json({ message: "Message is not deleted" })
      }

   } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
   }
})

router.get("/channelInfo", async (req, res) => {
   try {

      const allDiscord = await DiscordSchema.find({})
      if (allDiscord) {
         res.status(201).json({ allDiscord })
      }

   } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
   }
})

router.post("/createChannel", async (req, res) => {
   const { serverName, channelID, channelName, channelContent, channelSummary, channelAdmin } = req.body;
   if (!serverName || !channelID || !channelName) {
      return res.status(422).json({ error: "Some data fields are missing" });
   }

   try {
      const channelIDexist = await DiscordSchema.findOne({ channelID: channelID })

      if (channelIDexist) {
         return res
            .status(422)
            .json({ error: "channelID already exists" });
      } else {
         const discordChannel = DiscordSchema({
            serverName,
            channelID,
            channelName,
            channelContent: "",
            channelSummary: "",
            channelAdmin
         });
         await discordChannel.save();
         res.status(201).json({ message: "Channel info Saved Successfully" })
      }
   } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
   }
})

router.post("/updateDiscord", async (req, res) => {
   const { serverName, channelID, channelName } = req.body;
   if (!serverName || !channelID || !channelName) {
      return res.status(422).json({ error: "Some data fields are missing" });
   }
   try {
      let sampleText = []
      let discordText = ''
      const discordbot = (options) => {
         client.on('messageCreate', async (message) => {
            // if (message.author.bot) return;
            const channel = client.channels.cache.get(options)
            //  if (message.author.bot) {
            channel.messages.fetch({ limit: 100 }).then(async messages => {
               console.log(`Received ${messages.size} messages`);
               //Iterate through the messages here with the variable "messages".
               messages.forEach(message => sampleText.push(message.content))

               let result = ''
               for (let i = 0; i < sampleText.length; i++) {
                  result = result.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
                  result = result.replace(/[^a-zA-Z ]/g, "")
                  result = result + " "
                  result = result.concat(sampleText[i]);
               }

               const updatedContent = await DiscordSchema.updateOne({ channelID: channelID }, { $set: { channelContent: result } }, { upsert: true })

            })
            // }
         })
      }

      jobScheduler(discordbot(channelID))
      return res.status(201).json({ message: "Discord Bot is updated" })

   } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
   }

})

router.post("/updateSummary", async (req, res) => {
   const { serverName, channelID, channelName } = req.body;
   if (!serverName || !channelID || !channelName) {
      return res.status(422).json({ error: "Some data fields are missing" });
   }
   try {
      const channelSummaryData = await DiscordSchema.findOne({ channelID: channelID })
      if (channelSummaryData !== undefined) {
         discordText = channelSummaryData['channelContent'][0]
         discordText = discordText.slice(0, 1999)
         if (discordText !== undefined) {
            sdk.auth(process.env.CHATSONIC_KEY);
            sdk.chatsonic_V2BusinessContentChatsonic_post({
               enable_google_results: true,
               enable_memory: false,
               input_text: 'Summarize the text to 50 words having channel name as ' + channelName + ' and server name as ' + serverName + ': ' + discordText
            }, { engine: 'premium' })
               .then(async ({ data }) => await DiscordSchema.updateOne({ channelID: channelID }, { $set: { channelSummary:  `${data.message}` } }), { upsert: true })
               // .then(({ data }) => console.log(`${data.message}`))
               .catch(err => console.error(err));

               

            // return res.status(201).json({ message: "Summary is updated" })
         } else return res.status(501).json({ message: "IT has some issue" })
      }
   } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
   }
})

router.post("/sendNewletter", async (req, res) => {
   try {
      let suscriberName = []
      let suscriberEmail = []
      let discordServerName = []
      let discordChannelSummary = []
      const Suscriber = await SuscriberSchema.find();
      const Discord = await DiscordSchema.find();
      if (Suscriber !== undefined) {

         for (let i = 0; i < Discord.length; i++) {
            if (Discord[i]['serverName'] !== undefined) {
               discordServerName.push(Discord[i]['serverName'])
               // console.log(discordServerName);
            }
            if (Discord[i]['channelSummary'] !== undefined) {
               discordChannelSummary.push(Discord[i]['channelSummary'])
               // console.log(discordChannelSummary);
            }

         }
         for (let i = 0; i < Suscriber.length; i++) {
            suscriberEmail.push(Suscriber[i]["email"])
            const msg = {
               to: Suscriber[i]["email"],
               from: 'janasomnath173@gmail.com',
               subject: `Summary of ${discordServerName}`,
               text: `${discordChannelSummary}`,
               html: `<strong>${discordChannelSummary}</strong>`,
            };
            sgMail.send(msg);
         }


         res.status(201).json({ message: "Mail Sent Successfully" })
      }

   } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
   }
})