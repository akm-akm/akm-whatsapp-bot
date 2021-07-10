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
      client.sendMessage(from,"```Argument required```", text, {
        quoted: xxx,
      });
      resolve();
      return;
    }

    if (ytdl.validateURL(url)) {
      client.sendMessage(from, "```Wrong url```", text, {
        quoted: xxx,
      });
      resolve();
      return;
    }

    let info = await ytdl.getInfo(ytdl.getURLVideoID(url));
    vid = getRandom(".mp4");

    msg =
      "\n🎞️ *Title:*  " +
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
      "```\n\n";
    ytdl(url)
      .pipe(fs.createWriteStream(vid))
      .on("finish", () => {
     client.sendMessage(from, fs.readFileSync(vid), video, {
          quoted: xxx,
          caption: msg,
        });
      });

    resolve();
      fs.unlinkSync(vid)
    }catch(err){
      client.sendMessage(from,"🔪", text, {
        quoted: xxx,
      });
      console.log(err);
      resolve()
    }
  });

module.exports.youtube = youtube;
