require("dotenv").config();
const { Client, GatewayIntentBits } = require('discord.js');
const DiscordSchema = require("../model/discordSchema")
const currentDate = new Date();

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
        let sampleUser = []
        const channel = client.channels.cache.get(channelInfo[j]["channelID"])



        // if (message.author.bot) {
          channel.messages.fetch({ limit: 100 }).then(async messages => {
            console.log(`Received ${messages.size} messages`);
            //Iterate through the messages here with the variable "messages".
            messages.forEach(message => sampleText.push({
              name: message.author.username,
              content: message.content,
              time: currentDate.toLocaleString()
            }))

            let result = ''
            for (let i = 0; i < sampleText.length; i++) {
              result = result.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
              result = result.replace(/[^a-zA-Z ]/g, "")
              result = result + " "
              result = result.concat(sampleText[i]);
            }

            Array.prototype.unique = function() {
              var a = this.concat();
              for(var i=0; i<a.length; ++i) {
                  for(var j=i+1; j<a.length; ++j) {
                      if(a[i] === a[j])
                          a.splice(j--, 1);
                  }
              }
          
              return a;
          };

          console.log(sampleText);

            const existingcontent = channelInfo[j]['channelContent']

            let latestContent = existingcontent.concat(sampleText).unique()

            
            const updatedContent = await DiscordSchema.updateOne({ channelID: channelInfo[j]["channelID"] }, { $set: { channelNewContent: latestContent } }, { upsert: true })
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