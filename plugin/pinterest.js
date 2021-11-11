const fs = require("fs");
const axios = require("axios");
const http = require("https");
const { MessageType } = require("@adiwajshing/baileys");
const { text, video } = MessageType;
const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}.${ext}`;
};
const path = require("path");
const mess = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/messages.json"))
);
const { help } = require(path.join(__dirname, "../utils/help"));


module.exports = {
  "name": "pint",
  "usage": "pint <link>",
  "desc": "Downloads the pinterest video from its url.",
  "eg": [
    "pint https://pin.it/1f1m",
    "pint https://pin.it/dd4f"
  ],
  "group": false,
  handle(Infor) {
    const arg = Infor.arg;
    const from = Infor.from;
    if (arg.length == 1) {
      Infor.arg = ["help", arg[0]]
      help(Infor, client, Infor.reply, 1);
      return;
    }
    if (!process.env.KEEPSAVEIT_API) {
      Infor.noapi()
      return;
    }
    ran = getRandom("mp4");
    axios
      .get(
        `https://keepsaveit.com/api?api_key=${process.env.KEEPSAVEIT_API}&url=` + encodeURIComponent(arg[1])
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
              title.startsWith("<div") ? Infor.replytext(mess.error.error) : await Infor.client.sendMessage(from, fs.readFileSync(ran), video, {
                quoted: Infor.reply,
                caption: "```" + title + "```"
              });
              fs.unlinkSync(ran)
            });
          });
        });
      })
      .catch((err) => {
        Infor.replytext(mess.error.error)
        fs.unlinkSync(ran)
      });
  }
}