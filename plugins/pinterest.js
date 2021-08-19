const fs = require("fs");
const axios = require("axios");
const http = require("https");
const { MessageType } = require("@adiwajshing/baileys");
const { text, video } = MessageType;
const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}.${ext}`;
};
const path = require("path");

const { help } = require(path.join(__dirname, "./help"));

const pinterest = (infor4, client, xxx3) =>
  new Promise((resolve, reject) => {
    let infor5 = { ...infor4 };
    let xxx = { ...xxx3 };

    arg = infor5.arg;
    if (arg.length == 1) {
      infor5.arg = ["help", arg[0]]
      help(infor5, client, xxx, 1);
      resolve();
      return;
    }
    ran = getRandom("mp4");   
    axios
      .get(
        `https://keepsaveit.com/api?api_key=${process.env.KEEPSAVEIT_API}&url=` + encodeURIComponent(arg[1])
      )
      .then((response) => {
        if (response.error) console.log("pinterest error");
      aa=response.data.response.links[0].url;
      title=response.data.response.title; 
        const file = fs.createWriteStream(ran);
        http.get(aa, function (response) {
          response.pipe(file);
          file.on("finish", function () {
            file.close(async() => {
              console.log("filesaved");
              title.startsWith("<div") ? client.sendMessage(infor5.from, '🤖 ```Cannot download status.```', text, {
                quoted: xxx
              }): await client.sendMessage(infor5.from, fs.readFileSync(ran), video, {
                quoted: xxx,
                caption:"```"+title+"```"
             });
              fs.unlinkSync(ran)
              resolve();
            });
          });
        });
      })
      .catch((err) => {
        console.log(err);
        client.sendMessage(from, '🤖 ```Cannot download status.```', text, {
          quoted: xxx,
        });
        reject();
      });
  });
module.exports.pinterest = pinterest;
