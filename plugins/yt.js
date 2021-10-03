const fs = require("fs");
const ytdl = require("ytdl-core");
const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};
const path = require("path");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const { MessageType } = require("@adiwajshing/baileys");
const { video } = MessageType;
const { help } = require(path.join(__dirname, "./help"));

const youtube = (infor4, client, xxx3) =>
  new Promise(async (resolve, reject) => {
    const infor5 = { ...infor4 };
    const xxx = { ...xxx3 };
    const from = infor5.from;
    const arg = infor5.arg;
    const url = arg[1];
    try {

      if (infor5.arg.length == 1) {
        infor5.arg = ["help", arg[0]]
        help(infor5, client, xxx, 1);
        resolve();
        return;
      }
      const info = await ytdl.getInfo(ytdl.getURLVideoID(url));
      const vid = getRandom(".mp4");
      const thumb = getRandom(".jpg")
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
         
          ffmpeg(`./${vid}`)
            .screenshots({
              count: 1,
              filename: thumb,
              folder: "./media/temp/"
            }).on("end", async () => {
              await client.sendMessage(from, fs.readFileSync(vid), video,
                {
                  quoted: xxx,
                  caption: msg,
                  thumbnail: fs.readFileSync(path.join(__dirname, `../media/temp/${thumb}`)),
                });
              fs.unlinkSync(vid);
              fs.unlinkSync(path.join(__dirname, `../media/temp/${thumb}`));
            });

        });

      resolve();

    } catch (err) {
      fs.unlinkSync(vid);
      fs.unlinkSync(path.join(__dirname, `../media/temp/${thumb}`));

      reject(infor5)
    }
  });

module.exports.youtube = youtube;
