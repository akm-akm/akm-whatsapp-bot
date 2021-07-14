const memes = require("random-memes");
const fs = require("fs");
const axios = require("axios");
const { MessageType } = require("@adiwajshing/baileys");
const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};
const memegenerate = (infor, client, xxx) =>
  new Promise((resolve, reject) => {
    ran = getRandom(".png");

    memes.random().then((meme) => {
      url = meme.image;
      axios({
        url,
        responseType: "stream",
      }).then((response) => {
        response.data
          .pipe(fs.createWriteStream(ran))
          .on("finish", () =>{
           client.sendMessage(infor.from, fs.readFileSync(ran), MessageType.image, {quoted: xxx,caption: "```" + meme.caption + "```",})
            resolve()
        fs.unlinkSync(ran)
        }
          )
          .on("error", (e) => reject());
      });
    });
  });

module.exports.memegenerate = memegenerate;
