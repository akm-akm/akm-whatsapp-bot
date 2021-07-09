const fs = require("fs");
const ytdl = require("ytdl-core");
const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};
const { MessageType } = require("@adiwajshing/baileys");
const { text, extendedtext, image, video, sticker, audio } = MessageType;

const youtube = (infor) =>
  new Promise(async (resolve, reject) => {
    url = infor.arg[1]
    ytdl.validateURL(url) ? 2 : reject("```Wrong url```")

    let info = await ytdl.getInfo(ytdl.getURLVideoID(url));
    vid = getRandom('.mp4')

    msg =
      "🎞️ *Title: * " +
      "```" +
      info.videoDetails.title +
      "```\n\n" +
      "🍚 *Author:* " +
      "```" +
      info.videoDetails.author.name +
      "```\n\n" +
      "🎥 *Views:* " +
      "```" +
      info.videoDetails.viewCount +
      "```\n\n" +
      "👍 *Likes:* " +
      "```" +
      info.videoDetails.likes +
      "```\n\n" +
      "👎 *Disikes:* " +
      "```" +
      info.videoDetails.dislikes +
      "```\n\n";
    ytdl(url).pipe(fs.createWriteStream(vid)).on("finish", () => {
      infor.client.sendMessage(from, fs.readFileSync(vid), video, {
        quoted: infor.xxx,
        caption:msg
      });
    })

    resolve()
  });

module.exports.youtube = youtube;

youtube();