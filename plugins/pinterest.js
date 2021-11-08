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
const { help } = require(path.join(__dirname, "./help"));

const pinterest = (Infor, client, xxx3) =>
  new Promise((resolve, reject) => {
    const xxx = { ...xxx3 };
    const arg = Infor.arg;
    const from = Infor.from;
    if (arg.length == 1) {
      Infor.arg = ["help", arg[0]]
      help(Infor, client, xxx, 1);
      resolve();
      return;
    }
    if (process.env.KEEPSAVEIT_API === undefined) {
      client.sendMessage(from, "🤖 ```KEEPSAVEIT_API environment variable is not set. Contact the bot owner.```"
        , text, {
        quoted: xxx
      })
      resolve()
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
              title.startsWith("<div") ? client.sendMessage(from, mess.error.error, text, {
                quoted: xxx
              }) : await client.sendMessage(from, fs.readFileSync(ran), video, {
                quoted: xxx,
                caption: "```" + title + "```"
              });
              fs.unlinkSync(ran)
              resolve();
            });
          });
        });
      })
      .catch((err) => {
        console.log(err);
        client.sendMessage(from, mess.error.error, text, {
          quoted: xxx,
        });
        reject(Infor)
        fs.unlinkSync(ran)
      });
  });
module.exports.pinterest = pinterest;
