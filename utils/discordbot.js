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


const discordbot = (channelID) => {
    client.on('messageCreate', async (message) => {
        // if (message.author.bot) return;
        let sampleText = []
        const channel = client.channels.cache.get(channelID)



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

            console.log(sampleText);

            const updatedContent = await DiscordSchema.updateOne({ channelID: channelID }, { $set: { channelContent: result } })
            console.log(updatedContent);
        })
    })
}


client.login(process.env.BOT_TOKEN);

module.exports = discordbot