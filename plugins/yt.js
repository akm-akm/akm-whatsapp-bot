const fs = require("fs");
const ytdl = require("ytdl-core");
const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};
const { MessageType } = require("@adiwajshing/baileys");
const { text,video } = MessageType;

const youtube = (infor, client, xxx) =>
  new Promise(async (resolve, reject) => {
    try{
    arg = infor.arg;
    url = arg[1];
    if (infor.arg.length == 1) {
      client.sendMessage(from,"```Youtube link required.```", text, { quoted: xxx,});
      resolve();
      return;
    }

    let info = await ytdl.getInfo(ytdl.getURLVideoID(url));
    vid = getRandom(".mp4");
    msg =
      "🎞️ *Title:*  " +
      "```" +
      info.videoDetails.title +
      "```\n\n" +
      "🍚 *Author:*  " +
      "```" +
      info.videoDetails.author.name +
      "```\n\n" +
      "🎥 *Views:*  " +
      "```" +
      info.videoDetails.viewCount +
      "```\n\n" +
      "👍 *Likes:*  " +
      "```" +
      info.videoDetails.likes +
      "```\n\n" +
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
