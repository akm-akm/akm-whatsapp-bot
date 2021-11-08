const fs = require("fs");
const ytdl = require("ytdl-core");
const axios = require('axios');
const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};
const path = require("path");
const { MessageType } = require("@adiwajshing/baileys");
const { text, video } = MessageType;
const { help } = require(path.join(__dirname, "./help"));
const mess = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/messages.json"))
);
const youtube = (Infor, client, xxx3) =>
  new Promise(async (resolve, reject) => {
    const xxx = { ...xxx3 };
    const from = Infor.from;
    const arg = Infor.arg;
    const url = arg[1];
    const vid = getRandom(".mp4");
    const thumb = getRandom(".jpg");

    try {

      if (arg.length == 1) {
        Infor.arg = ["help", arg[0]]
        help(Infor, client, xxx, 1);
        resolve();
        return;
      }
      if (ytdl.validateURL(url)) {
        const info = await ytdl.getInfo(ytdl.getURLVideoID(url));
        const file = fs.createWriteStream(thumb);
        axios.request({
          url: info.videoDetails.thumbnails.pop().url,
          method: 'GET',
          responseType: 'stream'
        }).then(response => {
          response.data.pipe(file);
          file.on('finish', () => {
            file.close(async () => {
            });
          });
        })
        const msg = "🎪 *Title  :*\n" + "```" +
          info.videoDetails.title +
          "```\n\n" +
          "🍟 *Author :*  " +
          "```" +
          info.videoDetails.author.name +
          "```\n" +
          "🎥 *Views  :*  " +
          "```" +
          info.videoDetails.viewCount +
          "```\n" +
          "👍 *Likes   :*  " +
          "```" +
          info.videoDetails.likes +
          "```\n" +
          "👎 *Disikes:*  " +
          "```" +
          info.videoDetails.dislikes +
          "```";
        ytdl(url)
          .pipe(fs.createWriteStream(vid))
          .on("finish", async () => {

            await client.sendMessage(from, fs.readFileSync(vid), video,
              {
                quoted: xxx,
                caption: msg,
                thumbnail: fs.readFileSync(thumb)
              });
            fs.unlinkSync(vid);
            fs.unlinkSync(thumb);
          });


        resolve();
      } else {
        client.sendMessage(from, mess.error.invalid, text, { quoted: xxx });
        resolve();
      }
    } catch (err) {
      console.log(err);

      fs.unlinkSync(vid);
      fs.unlinkSync(thumb);


      reject(Infor)
    }
  });

module.exports.youtube = youtube