const fs = require("fs");
const axios = require("axios");
const http = require("https");
const { MessageType } = require("../@adiwajshing/baileys");
const { text, video } = MessageType;
const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}.${ext}`;
};

module.exports = {
  name: "pint",
  usage: "pint <link>",
  desc: "Downloads the pinterest video from its url.",
  eg: ["pint https://pin.it/1f1m", "pint https://pin.it/dd4f"],
  group: false,
  owner: false,
  handle(Bot) {
    const arg = Bot.arg;
    const from = Bot.from;
    if (arg.length == 1) {
      Bot.wrongCommand();
      return;
    }
    if (!process.env.KEEPSAVEIT_API) {
      Bot.noapi();
      return;
    }
    ran = getRandom("mp4");
    axios
      .get(
        `https://keepsaveit.com/api?api_key=${process.env.KEEPSAVEIT_API}&url=` +
          encodeURIComponent(arg[1])
      )
      .then((response) => {
        if (response.error) console.log("pinterest error");
        const aa = response.data.response.links[0].url;
        const title = response.data.response.title;
        const file = fs.createWriteStream(ran);
        http.get(aa, function (response) {
          response.pipe(file);
          file.on("finish", function () {
            file.close(async () => {
              console.log("filesaved");
              title.startsWith("<div")
                ? Bot.replytext(Bot.mess.error.error)
                : await Bot.client.sendMessage(
                    from,
                    fs.readFileSync(ran),
                    video,
                    {
                      quoted: Bot.reply,
                      caption: "```" + title + "```",
                    }
                  );
              fs.unlinkSync(ran);
            });
          });
        });
      })
      .catch((err) => {
        Bot.replytext(Bot.mess.error.error);
        fs.unlinkSync(ran);
      });
  },
};
