const {
    MessageType
} = require("@adiwajshing/baileys");
const {
    text
} = MessageType
const path = require("path");
const fs = require("fs");

const mess = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/warningmessages.json"))
);
const twitter = require("twitter");
const twit = new twitter({
    consumer_key: process.env.apiKey,
    consumer_secret: process.env.apiKeysecret,
    access_token_key: process.env.accesstoken,
    access_token_secret: process.env.accesstokensecret,
});
const xdafootball = (infor4, client, xxx3) =>
    new Promise(async (resolve, reject) => {
        let infor5 = { ...infor4 };
        let xxx = { ...xxx3 };
        let msg = "⚽ *Name* : ```Fabrizio Romano```\n\n"


        if (!(infor5.botdata.moderators.includes(infor5.number) || infor5.number === process.env.OWNER_NUMBER)) {
            client.sendMessage(infor5.from, mess.only.modB, text, {
                quoted: xxx
            });
            resolve();
            return
        }
        const params = {
            screen_name: "FabrizioRomano",
            tweet_mode: "extended",
            count: 10,
        };
        twit.get(
            "statuses/user_timeline",
            params,
            function (error, tweets) {
                if (error) {
                    reject();
                    return;
                }
                let i = 0;

                while (i < 10) {
                    if (!tweets[i].in_reply_to_screen_name) {

                        msg += `📱 *Tweet*: \n${tweets[i].full_text
                            .split("https://t.co/")[0]
                            .replace(/\n/g, " ")}\n📅 *Time*: ${tweets[i].created_at.split("+")[0]
                            }\n🔄 *Retweets*: ${tweets[i].retweet_count
                            }\n♥ *Likes*: ${tweets[i].favorite_count}\n\n`;

                    }

                    i++;
                }
                client.sendMessage(infor5.from, msg, text, { quoted: xxx }); resolve()

            }
        );

    })
module.exports.xdafootball = xdafootball;
