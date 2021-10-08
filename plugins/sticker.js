const WSF = require("wa-sticker-formatter");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
const fs = require("fs");
const path = require('path');
const mess = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/warningmessages.json"))
);
const { MessageType } = require("@adiwajshing/baileys");
const { text, sticker } = MessageType;
const { ai } = require("./deepai");
const stickermaker = (infor4, client, xxx3) =>
  new Promise(async (resolve, reject) => {
    const infor5 = { ...infor4 };
    const xxx = { ...xxx3 };
    const arg = infor5.arg;
    const content = JSON.stringify(xxx.message);
    const from = xxx.key.remoteJid;
    const type = Object.keys(xxx.message)[0];
    const isMedia = type === "imageMessage" || type === "videoMessage";
    const isQuotedImage =
      type === "extendedTextMessage" && content.includes("imageMessage");
    const isQuotedVideo =
      type === "extendedTextMessage" && content.includes("videoMessage");
    const isGroup = from.endsWith("@g.us");
    const groupMetadata = isGroup ? await client.groupMetadata(from) : "";
    const groupName = isGroup ? groupMetadata.subject : "";

    const getRandom = (ext) => {
      return `${Math.floor(Math.random() * 10000)}${ext}`;
    };

    let packName = isGroup ? groupName : "xXx";
    let authorName = "BOT";

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

    ///////////////image//////////////////
    if ((isMedia && !xxx.message.videoMessage) || isQuotedImage) {
      const encmedia = isQuotedImage
        ? JSON.parse(JSON.stringify(xxx).replace("quotedM", "m")).message
          .extendedTextMessage.contextInfo
        : xxx;
      const media = await client.downloadAndSaveMediaMessage(encmedia,getRandom(''));
      const ran = getRandom(".webp");
      if (infor5.groupdata==0 || infor5.groupdata.nsfw==true) {
        const nsfw = await ai(media)
        if (nsfw.output.nsfw_score > 0.6) {
          client.sendMessage(from, "🌚 🔞", text, {
            quoted: xxx
          });
          resolve();
          fs.unlinkSync(media);
          return;
        }
      }
      ffmpeg(`./${media}`)
        .input(media)
        .on("error", function (err) {
          fs.unlinkSync(media);
          reject(infor5)
        })
        .on("end", function () {
          buildSticker();
        })
        .addOutputOptions(outputOptions)
        .toFormat("webp")
        .save(ran);

      async function buildSticker() {
        if (arg.includes("nodata") == true) {
          client.sendMessage(from, fs.readFileSync(ran), sticker, {
            quoted: xxx,
          });
          resolve();
          fs.unlinkSync(media);
          fs.unlinkSync(ran);
        } else {
          const webpWithMetadata = await WSF.setMetadata(
            packName,
            authorName,
            ran
          );
          client.sendMessage(from, webpWithMetadata, sticker, {
            quoted: xxx,
          });

          resolve();
          fs.unlinkSync(media);
          fs.unlinkSync(ran);
        }
      }

      ///////////////image//////////////////

      ///////////////video//////////////////
    } else if (
      (isMedia && xxx.message.videoMessage.seconds < 11) ||
      (isQuotedVideo &&
        xxx.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage
          .seconds < 11)
    ) {
      const encmedia = isQuotedVideo
        ? JSON.parse(JSON.stringify(xxx).replace("quotedM", "m")).message
          .extendedTextMessage.contextInfo
        : xxx;
      const media = await client.downloadAndSaveMediaMessage(encmedia, getRandom(''));
      if (infor5.groupdata == 0 || infor5.groupdata.nsfw == true) {
        const nsfw = await ai(media)
        if (nsfw.output.nsfw_score > 0.6) {
          client.sendMessage(from, "🌚 🔞", text, {
            quoted: xxx
          });
          resolve();
          fs.unlinkSync(media);
       
          return;
        }
      }
      const   ran = getRandom(".webp");


      ffmpeg(`./${media}`)
        .inputFormat(media.split(".")[1])
        .on("error", function (err) {
          fs.unlinkSync(media);
          reject(infor5)
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
          client.sendMessage(from, fs.readFileSync(ran), sticker, {
            quoted: xxx,
          });
          resolve();
          fs.unlinkSync(media);
          fs.unlinkSync(ran);
        } else {
          const webpWithMetadata = await WSF.setMetadata(
            packName,
            authorName,
            ran
          );
          client.sendMessage(from, webpWithMetadata, sticker, {
            quoted: xxx,
          });
          resolve();
          fs.unlinkSync(media);
          fs.unlinkSync(ran);
          return;
        }
      }
    }
    else if (
      (isMedia && xxx.message.videoMessage.seconds > 11) ||
      (isQuotedVideo &&
        xxx.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage
          .seconds > 11)
    ) {
      const encmedia = isQuotedVideo
        ? JSON.parse(JSON.stringify(xxx).replace("quotedM", "m")).message
          .extendedTextMessage.contextInfo
        : xxx;
      const media1 = await client.downloadAndSaveMediaMessage(encmedia, getRandom(''));
      if (infor5.groupdata == 0 || infor5.groupdata.nsfw == true) {
        const nsfw = await ai(media1)
        if (nsfw.output.nsfw_score > 0.6) {
          client.sendMessage(from, "🌚 🔞", text, {
            quoted: xxx
          });
          resolve();
          fs.unlinkSync(media1);
         
          fs.unlinkSync(ran);
          return;
        }
      }
      const   ran = getRandom(".webp");
      const  media = getRandom(".mp4");
      ffmpeg(`./${media1}`)
        .setStartTime('00:00:00')
        .setDuration('9')
        .output(media)
        .on('end', function (err) {
          if (err) {
            reject(inofr5);
            fs.unlinkSync(media);
            fs.unlinkSync(ran);
            fs.unlinkSync(media1);

            return;
          }
          ffmpeg(`./${media}`)
            .inputFormat(media.split(".")[1])
            .on("error", function (err) {
              fs.unlinkSync(media);
              reject(infor5)
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
        .on('error', function (err) {
          reject(inofr5);
          fs.unlinkSync(media);
          fs.unlinkSync(ran);
          fs.unlinkSync(media1);

          return;
        })
        .run()


      async function buildSticker() {
        if (arg.includes("nodata") == true) {
          client.sendMessage(from, fs.readFileSync(ran), sticker, {
            quoted: xxx,
          });
          resolve();
          fs.unlinkSync(media);
          fs.unlinkSync(ran);
          fs.unlinkSync(media1);
        } else {
          const webpWithMetadata = await WSF.setMetadata(
            packName,
            authorName,
            ran
          );
          client.sendMessage(from, webpWithMetadata, sticker, {
            quoted: xxx,
          });
          resolve();
          fs.unlinkSync(media);
          fs.unlinkSync(ran);
          fs.unlinkSync(media1);
          return;
        }
      }
    }
    else {
      client.sendMessage(from,mess.tag, text, { quoted: xxx });
      resolve();
    }
  });
module.exports.stickermaker = stickermaker;
