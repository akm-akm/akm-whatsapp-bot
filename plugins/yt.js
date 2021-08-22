const fs = require("fs");
const ytdl = require("ytdl-core");
const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};
const path = require("path");

const { MessageType } = require("@adiwajshing/baileys");
const { text,video } = MessageType;
const { help } = require(path.join(__dirname, "./help"));

const youtube = (infor4, client, xxx3) =>
  new Promise(async (resolve, reject) => {
    let infor5 = { ...infor4 };
    let xxx = { ...xxx3 };

    try{
    arg = infor5.arg;
    url = arg[1];
    if (infor5.arg.length == 1) {
      infor5.arg = ["help", arg[0]]
      help(infor5, client, xxx, 1);
      resolve();
      return;
    }

    let info = await ytdl.getInfo(ytdl.getURLVideoID(url));
    vid = getRandom(".mp4");
    msg = "```" +
      info.videoDetails.title +
      "```\n\n" +
      "🍟 *Author:* " +
      "```" +
      info.videoDetails.author.name +
      "```\n" +
      "🎥 *Views:*  " +
      "```" +
      info.videoDetails.viewCount +
      "```\n" +
      "👍 *Likes:*  " +
      "```" +
      info.videoDetails.likes +
      "```\n" +
      "👎 *Disikes:*  " +
      "```" +
      info.videoDetails.dislikes +
      "```";
    ytdl(url)
      .pipe(fs.createWriteStream(vid))
      .on("finish", async() => {
        await client.sendMessage(from, fs.readFileSync(vid), video, { quoted: xxx, caption: msg });
        fs.unlinkSync(vid)
      });

    resolve();
     
    }catch(err){
     
      client.sendMessage(from,"🔪 ```Youtube link required.```", text, {
        quoted: xxx,
      });
      resolve()
    }
  });

module.exports.youtube = youtube;
