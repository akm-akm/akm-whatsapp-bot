const fs = require("fs");
const axios = require("axios");
const request = require("request");
const http = require("https");
const { MessageType } = require("@adiwajshing/baileys");
const { text, video } = MessageType;

const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}.${ext}`;
};

const pinterest = (infor,client,xxx) =>
  new Promise((resolve, reject) => {
    arg = infor.arg;
    if (arg.length == 1) {
      client.sendMessage(from, "```Argument required```", text, {
        quoted: xxx,
      });
      reject();
      return;
    }
    ran = getRandom("mp4");   
    axios
      .get(
        `https://KEEPSAVEIT_API.com/api?api_key=${process.env.KEEPSAVEIT_API}&url=` + encodeURIComponent(arg[1])
      )
      .then((response) => {
        if (response.error) console.log("err");
        console.log(response.data);
      aa=response.data.response.links[0].url;
      title=response.data.response.title;
      console.log(aa);
        const file = fs.createWriteStream(ran);
        http.get(aa, function (response) {
          response.pipe(file);
          console.log("done");
          file.on("finish", function () {
            file.close(() => {
              console.log("filesaved");
              client.sendMessage(infor.from, fs.readFileSync(ran), video, {
                quoted: xxx,
                caption:"```"+title+"```"
              });
              resolve();
              fs.unlinkSync(ran)
            });
          });
        });
      })
      .catch((err) => {
        console.log(err);
        client.sendMessage(from, "```Error```", text, {
          quoted: xxx,
        });
        reject();
      });
  });
module.exports.pinterest = pinterest;
