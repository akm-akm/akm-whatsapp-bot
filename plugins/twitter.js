const {
  MessageType
} = require("@adiwajshing/baileys");
const {
  text
} = MessageType

const twitter = require("twitter");
const twit = new twitter({
    consumer_key: process.env.apiKey,
    consumer_secret: process.env.apiKeysecret,
    access_token_key: process.env.accesstoken,
    access_token_secret: process.env.accesstokensecret,
});

const xdafootball = (infor, client, xxx) =>
    new Promise(async (resolve, reject) => {
        const params = {
            screen_name: "FabrizioRomano",
            tweet_mode: "extended",
            count: 10,
        };
        twit.get(
            "statuses/user_timeline",
            params,
            function (error, tweets, response) {
                if (error) {
                    reject();
                    return;
                }
                    let txt='',i = 0;
                    while (i < 10) {
                        msg = `\n👲 *Name*: ${tweets[i].user.name
                            } \n\n🐦 *Tweet*:\n${tweets[i].full_text
                                .split("https://t.co/")[0]
                                .replace(/\n/g, " ")}\n\n📅 *Time*: ${tweets[i].created_at.split("+")[0]
                            }\n\n🔄 *Retweets*: ${tweets[i].retweet_count
                            }\n\n♥ *Likes*: ${tweets[i].favorite_count}\n\n\n`;
                        if (!tweets[i].in_reply_to_screen_name) txt += msg;
                        i++;
                    }
                    client.sendMessage(infor.from, msg, text, {
                        quoted: xxx,
                    }); resolve()
                
            }
        );

    })
module.exports.xdafootball = xdafootball;
