const WSF = require("wa-sticker-formatter");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
const fs = require("fs");
const axios = require("axios").default;

module.exports = {
  name: "ss",
  usage: "ss <text>",
  desc: "The bot will search internet for the image and send its sticker. Add crop to crop the sticker sent by the bot.",
  eg: ["ss Leo Messi", "ss Virat Kohli", "ss crop Emma Watson"],
  group: false,
  owner: false,
  async handle(Bot) {
    const arg = Bot.arg;
    const from = Bot.from;
    const searchthis = arg
      .slice(1)
      .filter((z) => z !== "crop")
      .join(" ");
    if (searchthis.length == 0) {
      Bot.wrongCommand();
      return;
    }
    if (!process.env.SEARCH_STICKER) {
      Bot.noapi();
      return;
    }
    const getRandom = (ext) => {
      return `${Math.floor(Math.random() * 10000)}${ext}`;
    };

    const authorName = "AKM WHATSAPP BOT";
    outputOptions = [
      `-vcodec`,
      `libwebp`,
      `-vf`,
      `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
    ];
    if (arg.includes("crop") == true) {
      outputOptions = [
        `-vcodec`,
        `libwebp`,
        `-vf`,
        `crop=w='min(min(iw\,ih)\,500)':h='min(min(iw\,ih)\,500)',scale=500:500,setsar=1,fps=15`,
        `-loop`,
        `0`,
        `-ss`,
        `00:00:00.0`,
        `-t`,
        `00:00:10.0`,
        `-preset`,
        `default`,
        `-an`,
        `-vsync`,
        `0`,
        `-s`,
        `512:512`,
      ];
    }

    const options = {
      method: "GET",
      url: "https://bing-image-search1.p.rapidapi.com/images/search",
      params: { q: searchthis, count: "100", mkt: "en-IN" },
      headers: {
        "x-rapidapi-host": "bing-image-search1.p.rapidapi.com",
        "x-rapidapi-key": process.env.SEARCH_STICKER,
      },
    };

    axios
      .request(options)
      .then(async (response1) => {
        const random = Math.floor(
          Math.random() *
            (response1.data.value.length >= 20
              ? 19
              : response1.data.value.length)
        );
        const packName = searchthis;
        const imageurl = response1.data.value[random].thumbnailUrl;
        const media = getRandom(".jpg");
        const file = fs.createWriteStream(media);

        axios
          .request({
            url: imageurl,
            method: "GET",
            responseType: "stream",
          })
          .then((response) => {
            response.data.pipe(file);
            file.on("finish", () => {
              file.close(async () => {
                ran = getRandom(".webp");

                ffmpeg(`./${media}`)
                  .input(media)
                  .on("error", function (err) {
                    fs.unlinkSync(media);
                    Bot.errorlog(err);
                    fs.unlinkSync(ran);
                    return;
                  })
                  .on("end", function () {
                    buildSticker();
                  })
                  .addOutputOptions(outputOptions)
                  .toFormat("webp")
                  .save(ran);

                async function buildSticker() {
                  const webpWithMetadata = await WSF.setMetadata(
                    packName,
                    authorName,
                    ran
                  );
                  Bot.client.sendMessage(
                    from,
                    { sticker: webpWithMetadata },
                    {
                      quoted: Bot.reply,
                    }
                  );

                  fs.unlinkSync(media);
                  fs.unlinkSync(ran);
                  return;
                }
              });
            });
          });
      })
      .catch((e) => {
        Bot.errorlog(e);
      });
  },
};
