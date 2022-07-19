const fs = require("fs");
const { writeFile } = require("fs/promises");
const path = require("path");
const { ai } = require(path.join(__dirname, "../utils/deepai"));
const { downloadContentFromMessage } = require("@adiwajshing/baileys");
module.exports = {
  name: "testnsfw",
  usage: "testnsfw",
  desc: "Scans the image for nudity using deep ai and returns the result.",
  eg: ["testnsfw"],
  group: false,
  owner: false,
  async handle(Bot) {
    if (
      !(
        Bot.isMedia ||
        Bot.isQuotedImage ||
        Bot.isQuotedVideo ||
        Bot.isQuotedSticker
      )
    ) {
      Bot.replytext(Bot.mess.tag);
    }
    if (!process.env.DEEPAI) {
      Bot.noapi();
      return;
    }

    const getRandom = (ext) => {
      return `${Math.floor(Math.random() * 10000)}${ext}`;
    };
    if ((Bot.isMedia && Bot.reply.message.imageMessage) || Bot.isQuotedImage) {
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
      ai(media)
        .then((result) => {
          const zz =
            result.output.detections.length !== 0
              ? "\n👙 *Detections* :\n"
              : " ";
          let nsfw =
            "🔞 *Probability* :  ```" +
            (result.output.nsfw_score * 100).toFixed(1) +
            "%```\n" +
            zz;

          result.output.detections.forEach(function (element) {
            nsfw =
              nsfw +
              "\nName : " +
              element.name +
              "\n" +
              "Confidence : " +
              (element.confidence * 100).toFixed(0) +
              " %\n";
          });

          Bot.replytext(nsfw);
          fs.unlinkSync(media);
          return;
        })
        .catch((err) => {
          Bot.errorlog(error);

          fs.unlinkSync(media);

          return;
        });
    } else if (
      (Bot.isMedia && Bot.reply.message.videoMessage) ||
      Bot.isQuotedVideo
    ) {
      const encmedia = isQuotedImage
        ? Bot.reply.message.extendedTextMessage.contextInfo.quotedMessage
            .videoMessage
        : Bot.reply.message.videoMessage;
      const stream = await downloadContentFromMessage(encmedia, "image");
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      const media = getRandom(".mp4");
      await writeFile(media, buffer);
      ai(media)
        .then((result) => {
          const zz =
            result.output.detections.length !== 0
              ? "\n👙 *Detections* :\n"
              : " ";
          let nsfw =
            "🔞 *Probability* :  ```" +
            (result.output.nsfw_score * 100).toFixed(1) +
            "%```\n" +
            zz;
          result.output.detections.forEach(function (element) {
            nsfw =
              nsfw +
              "\nName : " +
              element.name +
              "\n" +
              "Confidence : " +
              (element.confidence * 100).toFixed(0) +
              " %\n";
          });

          Bot.replytext(nsfw);
          fs.unlinkSync(media);
          return;
        })
        .catch((error) => {
          Bot.errorlog(error);

          fs.unlinkSync(media);

          return;
        });
    } else if (Bot.isQuotedSticker) {
      const encmedia =
        Bot.reply.message.extendedTextMessage.contextInfo.quotedMessage
          .stickerMessage;

      const stream = await downloadContentFromMessage(encmedia, "image");
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      const media = getRandom(".webp");
      await writeFile(media, buffer);
      if (encmedia.isAnimated)
        throw new Error("Animated stickers are not supported");

      ai(media)
        .then((result) => {
          const zz =
            result.output.detections.length !== 0
              ? "\n👙 *Detections* :\n"
              : " ";
          let nsfw =
            "🔞 *Probability* :  ```" +
            (result.output.nsfw_score * 100).toFixed(1) +
            "%```\n" +
            zz;
          result.output.detections.forEach(function (element) {
            nsfw =
              nsfw +
              "\nName : " +
              element.name +
              "\n" +
              "Confidence : " +
              (element.confidence * 100).toFixed(0) +
              " %\n";
          });

          Bot.replytext(nsfw);
          fs.unlinkSync(media);
          return;
        })
        .catch((err) => {
          Bot.errorlog(error);
          fs.unlinkSync(media);

          return;
        });
    }
  },
};
