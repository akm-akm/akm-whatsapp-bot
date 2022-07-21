const WSF = require("wa-sticker-formatter");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
const fs = require("fs");
const { downloadContentFromMessage } = require("@adiwajshing/baileys");
const { ai } = require("../utils/deepai");
const { writeFile } = require("fs/promises");
module.exports = {
  name: "sticker",
  usage: "sticker <arguments>",
  desc: "Converts the image, tagged image or video to sticker.",
  eg: [
    "sticker crop nodata",
    "sticker pack cheems author doge",
    "sticker nodata",
    "sticker crop pack cheems"
  ],
  group: false,
  owner: false,
  async handle(Bot) {
    const arg = Bot.arg;
    const from = Bot.from;
    const isMedia = Bot.isMedia;
    const isQuotedImage = Bot.isQuotedImage;
    const isQuotedVideo = Bot.isQuotedVideo;

    const getRandom = (ext) => {
      return `${Math.floor(Math.random() * 10000)}${ext}`;
    };

    let packName = Bot.isGroup ? Bot.groupName : "github";
    let authorName = "AKM WHATSAPP BOT";

    if (arg.includes("pack") == true) {
      packName = "";
      packNameDataCollection = false;
      for (let i = 0; i < arg.length; i++) {
        if (arg[i].includes("pack") == true) {
          packNameDataCollection = true;
        }
        if (arg[i].includes("author") == true) {
          packNameDataCollection = false;
        }

        if (packNameDataCollection == true) {
          packName = packName + arg[i] + " ";
        }
      }

      if (packName.startsWith("pack ")) {
        packName = `${packName.split("pack ")[1]}`;
      }
    }

    if (arg.includes("author") == true) {
      authorName = "";
      authorNameDataCollection = false;
      for (let i = 0; i < arg.length; i++) {
        console.log(i);
        if (arg[i].includes("author") == true) {
          authorNameDataCollection = true;
        }

        if (authorNameDataCollection == true) {
          authorName = authorName + arg[i] + " ";
        }
        if (authorName.startsWith("author ")) {
          authorName = `${authorName.split("author ")[1]}`;
        }
      }
    }
    outputOptions = [
      `-vcodec`,
      `libwebp`,
      `-vf`,
      `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`
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
        `512:512`
      ];
    }

    ///////////////image//////////////////
    if ((isMedia && !Bot.reply.message.videoMessage) || isQuotedImage) {
      const encmedia = isQuotedImage
        ? Bot.reply.message.extendedTextMessage.contextInfo.quotedMessage
            .imageMessage
        : Bot.reply.message.imageMessage;
      const stream = await downloadContentFromMessage(encmedia, "image");
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      const media = getRandom(".jpeg");
      await writeFile(media, buffer);
      const ran = getRandom(".webp");
      if (!Bot.isGroup || Bot.groupdata.nsfw == true) {
        const nsfw = await ai(media);
        if (nsfw.output.nsfw_score > 0.6) {
          Bot.replytext("🌚 🔞");
          fs.unlinkSync(media);
          return;
        }
      }
      ffmpeg(`./${media}`)
        .input(media)
        .on("error", function (err) {
          fs.unlinkSync(media);
        })
        .on("end", function () {
          buildSticker();
        })
        .addOutputOptions(outputOptions)
        .toFormat("webp")
        .save(ran);

      async function buildSticker() {
        if (arg.includes("nodata") == true) {
          Bot.replysticker(ran);
          fs.unlinkSync(media);
          fs.unlinkSync(ran);
        } else {
          const webpWithMetadata = await WSF.setMetadata(
            packName,
            authorName,
            ran
          );
          Bot.client.sendMessage(
            from,
            { sticker: webpWithMetadata },
            {
              quoted: Bot.reply
            }
          );

          fs.unlinkSync(media);
          fs.unlinkSync(ran);
        }
      }

      ///////////////image//////////////////

      ///////////////video//////////////////
    } else if (
      (isMedia && Bot.reply.message.videoMessage.seconds < 11) ||
      (isQuotedVideo &&
        Bot.reply.message.extendedTextMessage.contextInfo.quotedMessage
          .videoMessage.seconds < 11)
    ) {
      const encmedia = isQuotedVideo
        ? Bot.reply.message.extendedTextMessage.contextInfo.quotedMessage
            .videoMessage
        : Bot.reply.message.videoMessage;
      const stream = await downloadContentFromMessage(encmedia, "video");
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      const media = getRandom(".mp4");
      await writeFile(media, buffer);
      if (!Bot.isGroup || Bot.groupdata.nsfw == true) {
        const nsfw = await ai(media);
        if (nsfw.output.nsfw_score > 0.6) {
          Bot.replytext("🌚 🔞");

          fs.unlinkSync(media);

          return;
        }
      }
      const ran = getRandom(".webp");

      ffmpeg(`./${media}`)
        .inputFormat(media.split(".")[1])
        .on("error", function (err) {
          fs.unlinkSync(media);
          fs.unlinkSync(media);
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
        if (arg.includes("nodata") == true) {
          Bot.replysticker(ran);
          fs.unlinkSync(media);
          fs.unlinkSync(ran);
        } else {
          const webpWithMetadata = await WSF.setMetadata(
            packName,
            authorName,
            ran
          );
          Bot.client.sendMessage(
            from,
            { sticker: webpWithMetadata },
            {
              quoted: Bot.reply
            }
          );
          try {
            fs.unlinkSync(media1);
            fs.unlinkSync(ran);
          } catch (error) {}
          return;
        }
      }
    } else if (
      (isMedia && Bot.reply.message.videoMessage.seconds >= 11) ||
      (isQuotedVideo &&
        Bot.reply.message.extendedTextMessage.contextInfo.quotedMessage
          .videoMessage.seconds >= 11)
    ) {
      const encmedia = isQuotedVideo
        ? Bot.reply.message.extendedTextMessage.contextInfo.quotedMessage
            .videoMessage
        : Bot.reply.message.videoMessage;
      const stream = await downloadContentFromMessage(encmedia, "video");
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      const media1 = getRandom(".mp4");
      await writeFile(media1, buffer);
      if (!Bot.isGroup || Bot.groupdata.nsfw == true) {
        const nsfw = await ai(media1);
        if (nsfw.output.nsfw_score > 0.6) {
          Bot.replytext("🌚 🔞");

          fs.unlinkSync(media1);

          fs.unlinkSync(ran);
          return;
        }
      }
      const ran = getRandom(".webp");
      const media = getRandom(".mp4");
      ffmpeg(`./${media1}`)
        .setStartTime("00:00:00")
        .setDuration("9")
        .output(media)
        .on("end", function (err) {
          if (err) {
            fs.unlinkSync(media);
            fs.unlinkSync(ran);
            fs.unlinkSync(media1);

            return;
          }
          ffmpeg(`./${media}`)
            .inputFormat(media.split(".")[1])
            .on("error", function (err) {
              fs.unlinkSync(media);
              fs.unlinkSync(media);
              fs.unlinkSync(ran);
              return;
            })
            .on("end", function () {
              buildSticker();
            })
            .addOutputOptions(outputOptions)
            .toFormat("webp")
            .save(ran);
        })
        .on("error", function (err) {
          reject(inofr5);
          fs.unlinkSync(media);
          fs.unlinkSync(ran);
          fs.unlinkSync(media1);

          return;
        })
        .run();

      async function buildSticker() {
        if (arg.includes("nodata") == true) {
          Bot.replysticker(ran);
          fs.unlinkSync(media);
          fs.unlinkSync(ran);
          fs.unlinkSync(media1);
        } else {
          const webpWithMetadata = await WSF.setMetadata(
            packName,
            authorName,
            ran
          );
          Bot.client.sendMessage(
            from,
            { sticker: webpWithMetadata },
            {
              quoted: Bot.reply
            }
          );
          fs.unlinkSync(media);
          fs.unlinkSync(ran);
          fs.unlinkSync(media1);
          return;
        }
      }
    } else {
      Bot.replytext(Bot.mess.tag);
    }
  }
};
