const twitter = require("twitter");
const twit = new twitter({
  consumer_key: process.env.apiKey,
  consumer_secret: process.env.apiKeysecret,
  access_token_key: process.env.accesstoken,
  access_token_secret: process.env.accesstokensecret,
});

module.exports = {
  name: "tweet",
  usage: "tweet",
  desc: "Sends the last 10 tweets of some Fabrizio Romano.",
  eg: ["tweet"],
  group: false,
  owner: false,
  async handle(Bot) {
    if (!Bot.isBotModerator) {
      Bot.replytext(Bot.mess.only.modB);
      return;
    }

    let msg = "⚽ *Name* : ```Fabrizio Romano```\n\n";

    const params = {
      screen_name: "FabrizioRomano",
      tweet_mode: "extended",
      count: 10,
    };
    twit.get("statuses/user_timeline", params, function (error, tweets) {
      if (error) {
        return;
      }
      let i = 0;

      while (i < 10) {
        if (!tweets[i].in_reply_to_screen_name) {
          msg += `📱 *Tweet*: \n${tweets[i].full_text
            .split("https://t.co/")[0]
            .replace(/\n/g, " ")}\n📅 *Time*: ${
            tweets[i].created_at.split("+")[0]
          }\n🔄 *Retweets*: ${tweets[i].retweet_count}\n♥ *Likes*: ${
            tweets[i].favorite_count
          }\n\n`;
        }

        i++;
      }
      Bot.replytext(msg);
    });
  },
};
