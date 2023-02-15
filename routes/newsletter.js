// const token = "MTA3MjYzMzgwMzM0NjAyMjQwMA.G4k5pz.LkPDjuzLLeRd_PPeUnifPZ1A54z1FbRfAK-esY"

// const { Client, GatewayIntentBits  } = require("discord.js")
// const express = require("express");
// const router = express.Router();

// const client = new Client({
//     intents:[
//         GatewayIntentBits.Guilds,
//         GatewayIntentBits.GuildMessages 
//     ]
// });
// client.on("ready", () =>{
//     console.log("The AI bot is online"); //message when bot is online
// });

// client.on("message", (message) => {
//     if (message.content.substring(0, 1) === "!") {
//         message.channel.send("Hello from AI bot"); //reply if message has "!" as first character
//     }
// });

// client.login(token);

// router.get("/bot_ready", async (req, res) => {
// client.on("ready", () => {
//     console.log("This is an AI bot!");
// })
// })



// module.exports = router;

require("dotenv").config();
const { Client, GatewayIntentBits } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");
// const router = require("./auth");


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const configuration = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY
    apiKey: "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"
})

const openai = new OpenAIApi(configuration)

client.on("ready", () => {
    console.log("Bot is connected and ready");
})

client.on("error", (err) => {
    console.error(err);
});

// client.on('messageCreate', function (message) {
//     if (message.author.bot) return;
//     return message.reply(`${message.content}`);
// });

// let prompt ='Marv is a chatbot that reluctantly answers questions.\n\
// You: How many pounds are in a kilogram?\n\
// Marv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\n\
// You: What does HTML stand for?\n\
// Marv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\n\
// You: When did the first airplane fly?\n\
// Marv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\n\
// You: What is the meaning of life?\n\
// Marv: I’m not sure. I’ll ask my friend Google.\n\
// You: hey whats up?\n\
// Marv: Nothing much. You?\n';

// client.on("message", function (message) {
//     if (message.author.bot) return;
//     prompt += `You: ${message.content}\n`;
//     (async () => {
//         const gptResponse = await openai.complete({
//             engine: 'davinci',
//             prompt: prompt,
//             maxTokens: 60,
//             temperature: 0.3,
//             topP: 0.3,
//             presencePenalty: 0,
//             frequencyPenalty: 0.5,
//             bestOf: 1,
//             n: 1,
//             stream: false,
//             stop: ['\n', '\n\n']
//         });
//         message.reply(`${gptResponse.data.choices[0].text.substring(5)}`);
//         prompt += `${gptResponse.data.choices[0].text}\n`;
//     })();
//  });  


// async function runCompletion (message) {
//     const completion = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: message,
//         max_tokens: 200,
//     });
//     return completion.data.choices[0].text;
// }


// client.on("messageCreate", (msg) => {
//     if(msg.content.startsWith("#")) {
//         runCompletion(msg.content.substring(1)).then(result => bot.createMessage(msg.channel.id, result));
//     } 
// });

// // chatsonic with discord

// const sdk = require('api')('@writesonic/v2.2#4ekm6b01flcau4wqa');

// client.on('messageCreate', function (message) {
//     if (message.author.bot) return;


//     sdk.auth('86f70878-efe1-4c8c-baed-cadbe9c30f80');
//     sdk.chatsonic_V2BusinessContentChatsonic_post({
//         enable_google_results: true,
//         enable_memory: false,
//         input_text: message.content
//     }, { engine: 'premium' })
//         .then(({ data }) => message.reply(`${data.message}`))
//         .catch(err => console.error(err));



//     // sdk.auth('86f70878-efe1-4c8c-baed-cadbe9c30f80');
//     // sdk.contentShorten_V2BusinessContentContentShorten_post({
//     //     content_to_shorten: message.content,
//     //     tone_of_voice: 'excited'
//     // }, { num_copies: '1' })
//     //     .then(({ data }) => message.reply(`${data[0].text}`))
//     //     .catch(err => console.error(err));

//     // return message.reply(`${data}`);
// });




// client.login("MTA3MjYzMzgwMzM0NjAyMjQwMA.G4k5pz.LkPDjuzLLeRd_PPeUnifPZ1A54z1FbRfAK-esY");


// // emailjs

// const emailjs = require("@emailjs/browser")

// var templateParams = {
//     name: '',
//     notes: 'Check this out!'
// };
 
// emailjs.send('service_ks1j8da', 'template_udicn69', templateParams)
//     .then(function(response) {
//        console.log('SUCCESS!', response.status, response.text);
//     }, function(error) {
//        console.log('FAILED...', error);
//     });


// // mailchimp

// const mailchimp = require("@mailchimp/mailchimp_marketing")
// mailchimp.setConfig({
//     apiKey: "00000xxxx0000x0x00xx00x00x00000-us6",
//     server: "us6",
// })

// const { ListId, SegmentId, tempalteId, subjectLine, previewText, campaignTitle, fromName, replyTo } = req.body
// const createCampaign = async () => {
//         try {
//             const campaign = await mailchimp.campaigns.create({
//                 type: "regular",
//                 recipients: {
//                     segment_opts: {
//                         saved_segment_id: SegmentId,
//                         match: 'any'
//                     },
//                     list_id: ListId
//                 },
//                 settings: {
//                     subject_line: subjectLine,
//                     preview_text: previewText,
//                     title: campaignTitle,
//                     template_id: tempalteId,
//                     from_name: fromName,
//                     reply_to: replyTo,
//                     to_name: "*|FNAME|*",
//                     auto_footer: true,
//                     inline_css: true,
//                 }
//             })
//             return campaign.id
//         }
//         catch (err) {
//             res.status(400).send(err)
//         }
//     }
// const sendCampaign = async (campaignId) => {
//         try {
//             await mailchimp.campaigns.send(campaignId)
//             res.redirect("success.html")
//         }
//         catch (e) {
//             res.redirect("fail.html")
//         }
//     }
// const campaignId = await createCampaign()
//     sendCampaign(campaignId)    


// // // ----! discord bot !---

// client.on('messageCreate', async (message) => {
//     // if (message.author.bot) return;
//     const channel = client.channels.cache.get("956556783189651468")

    
//     // if (message.author.bot) {
//         channel.messages.fetch({ limit: 100 }).then(messages => {
//             console.log(`Received ${messages.size} messages`);
//             //Iterate through the messages here with the variable "messages".
//             messages.forEach(message => console.log(message.content))
//           })
    // };
    
    

    // console.log(message.author.bot.content);

    //   return message.reply(`${data}`);

// })


// client.login("MTA3MjYzMzgwMzM0NjAyMjQwMA.G4k5pz.LkPDjuzLLeRd_PPeUnifPZ1A54z1FbRfAK-esY");




const mailchimp = require("@mailchimp/mailchimp_marketing")
mailchimp.setConfig({
    apiKey: "041403684e1656c8c89c48a93b0f2a6d-us21",
    server: "us21",
})

const express = require('express')

app.post('/audience/create', async (req, res) => {
    const { name, company, address, city, state, zip, country, from_name, from_email, subject, language } = req.body
const footerContactInfo = { company, address1: address, city, state, zip, country }
const campaignDefaults = { from_name, from_email, subject, language }
async function createAudience() {
        try {
            const audience = await mailchimp.lists.createList({
                name: name,
                contact: footerContactInfo,
                permission_reminder: "*|LIST:DESCRIPTION|*",
                email_type_option: true,
                campaign_defaults: campaignDefaults
            })
res.send(audience.id)
        }
        catch (err) {
            res.status(400).send(err)
        }
    }
createAudience()
})