const fs = require("fs");
const path = require("path");
const { ai } = require(path.join(__dirname, "../utils/deepai"));

module.exports = {
  name: "testnsfw",
  usage: "testnsfw",
  desc: "Scans the image for nudity using deep ai and returns the result.",
  eg: ["testnsfw"],
  group: false,
  owner: false,
  async handle(Bot) {
    if (!process.env.DEEPAI) {
      Bot.noapi();
      return;
    }

    const getRandom = (ext) => {
      return `${Math.floor(Math.random() * 10000)}${ext}`;
    };
    if ((isMedia && Bot.reply.message.imageMessage) || Bot.isQuotedImage) {
      const encmedia = Bot.isQuotedImage
        ? JSON.parse(JSON.stringify(Bot.reply).replace("quotedM", "m")).message
            .extendedTextMessage.contextInfo
        : Bot.reply;
      const media = await Bot.client.downloadAndSaveMediaMessage(
        encmedia,
        getRandom("")
      );
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
          console.log(err);
          fs.unlinkSync(media);

          return;
        });
    } else if (
      (Bot.isMedia && Bot.reply.message.videoMessage) ||
      Bot.isQuotedVideo
    ) {
      ///////////////////////////////////////////////////////

      const encmedia = Bot.isQuotedVideo
        ? JSON.parse(JSON.stringify(Bot.reply).replace("quotedM", "m")).message
            .extendedTextMessage.contextInfo
        : Bot.reply;
      const media = await Bot.client.downloadAndSaveMediaMessage(
        encmedia,
        getRandom("")
      );
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
          console.log(err);
          fs.unlinkSync(media);

          return;
        });

      ///////////////////////////////////////////////////////
    } else if (Bot.isQuotedSticker) {
      const encmedia = JSON.parse(
        JSON.stringify(Bot.reply).replace("quotedM", "m")
      ).message.extendedTextMessage.contextInfo;

      const media = await Bot.client.downloadAndSaveMediaMessage(
        encmedia,
        getRandom("")
      );

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
          console.log(err);
          fs.unlinkSync(media);

          return;
        });
    } else {
      Bot.reply(Bot.mess.tag);
    }
  },
};
