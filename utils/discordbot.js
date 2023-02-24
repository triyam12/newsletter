require("dotenv").config();
const { Client, GatewayIntentBits } = require('discord.js');
const DiscordSchema = require("../model/discordSchema")

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});


const discordbot = async (options) => {
  client.on('messageCreate', async (message) => {
    try {
      let channelIDarray = []
      const channelInfo = await DiscordSchema.find()

      for (let j = 0; j < channelInfo.length; j++) {
        channelIDarray.push(channelInfo[j]["channelID"]);

        // if (message.author.bot) return;
        let sampleText = []
        const channel = client.channels.cache.get(channelInfo[j]["channelID"])



        // if (message.author.bot) {
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

            const existingcontent = channelInfo[j]['channelContent']
            for(let k=0; k < existingcontent.length; k++) {
              for (let m = 0; m < sampleText.length; m++) {
                if(existingcontent[k] === sampleText[m]) {
                  existingcontent.splice(k, 1, sampleText[m]);
                  break;
                }
              }
            
            }
            
            console.log(existingcontent);


            const updatedContent = await DiscordSchema.updateOne({ channelID: channelInfo[j]["channelID"] }, { $set: { channelContent: existingcontent } }, { upsert: true })
            // const updatedContent = await DiscordSchema.replaceOne({ channelID: channelInfo[j]["channelID"] }, { channelContent: sampleText })

            sampleText.length = 0

          })

        // }
      }

    } catch (error) {
      console.log(error);
    }

  })
}


discordbot()

client.login(process.env.BOT_TOKEN);

module.exports = discordbot