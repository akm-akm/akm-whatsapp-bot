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
  async handle(Xxxbot) {
    if (!process.env.DEEPAI) {
      Xxxbot.noapi();
      return;
    }

    const getRandom = (ext) => {
      return `${Math.floor(Math.random() * 10000)}${ext}`;
    };
    if (
      (isMedia && Xxxbot.reply.message.imageMessage) ||
      Xxxbot.isQuotedImage
    ) {
      const encmedia = Xxxbot.isQuotedImage
        ? JSON.parse(JSON.stringify(Xxxbot.reply).replace("quotedM", "m"))
            .message.extendedTextMessage.contextInfo
        : Xxxbot.reply;
      const media = await Xxxbot.client.downloadAndSaveMediaMessage(
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

          Xxxbot.replytext(nsfw);
          fs.unlinkSync(media);
          return;
        })
        .catch((err) => {
          console.log(err);
          fs.unlinkSync(media);

          return;
        });
    } else if (
      (Xxxbot.isMedia && Xxxbot.reply.message.videoMessage) ||
      Xxxbot.isQuotedVideo
    ) {
      ///////////////////////////////////////////////////////

      const encmedia = Xxxbot.isQuotedVideo
        ? JSON.parse(JSON.stringify(Xxxbot.reply).replace("quotedM", "m"))
            .message.extendedTextMessage.contextInfo
        : Xxxbot.reply;
      const media = await Xxxbot.client.downloadAndSaveMediaMessage(
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

          Xxxbot.replytext(nsfw);
          fs.unlinkSync(media);
          return;
        })
        .catch((err) => {
          console.log(err);
          fs.unlinkSync(media);

          return;
        });

      ///////////////////////////////////////////////////////
    } else if (Xxxbot.isQuotedSticker) {
      const encmedia = JSON.parse(
        JSON.stringify(Xxxbot.reply).replace("quotedM", "m")
      ).message.extendedTextMessage.contextInfo;

      const media = await Xxxbot.client.downloadAndSaveMediaMessage(
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

          Xxxbot.replytext(nsfw);

          fs.unlinkSync(media);
          return;
        })
        .catch((err) => {
          console.log(err);
          fs.unlinkSync(media);

          return;
        });
    } else {
      Xxxbot.reply(Xxxbot.mess.tag);
    }
  },
};
