const fs = require("fs");
const ytdl = require("ytdl-core");
const axios = require("axios");
const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};

module.exports = {
  name: "ytv",
  usage: "ytv <link>",
  desc: "Downloads video from the given youtube link.",
  eg: ["ytv youtu.be/JJWE3-Q6s", "ytv youtu.be/Tjdu4-yhd"],
  group: false,
  owner: false,

  async handle(Infor) {
    const arg = Infor.arg;
    const url = arg[1];
    const vid = getRandom(".mp4");
    const thumb = getRandom(".jpg");

    try {
      if (arg.length == 1) {
        Infor.wrongCommand();
        return;
      }
      if (ytdl.validateURL(url)) {
        const info = await ytdl.getInfo(ytdl.getURLVideoID(url));
        const file = fs.createWriteStream(thumb);
        axios
          .request({
            url: info.videoDetails.thumbnails.pop().url,
            method: "GET",
            responseType: "stream",
          })
          .then((response) => {
            response.data.pipe(file);
            file.on("finish", () => {
              file.close(async () => {});
            });
          });
        const msg =
          "🎪 *Title  :*\n" +
          "```" +
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
            Infor.replyvideo(vid, msg, thumb);
            fs.unlinkSync(vid);
            fs.unlinkSync(thumb);
          });
      } else {
        Infor.replytext(Infor.mess.error.invalid);
      }
    } catch (err) {
      Infor.errorlog(err);
      fs.unlinkSync(vid);
      fs.unlinkSync(thumb);
    }
  },
};
