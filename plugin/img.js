const fs = require("fs");
const webp = require("webp-converter");

module.exports = {
  name: "img",
  usage: "img",
  desc: "Sends the image of the non animated tagged sticker.",
  eg: ["img"],
  group: false,
  owner: false,
  async handle(Bot) {
    if (!Bot.isQuotedSticker) {
      Bot.replytext(Bot.mess.tags);
    }

    const getRandom = (ext) => {
      return `${Math.floor(Math.random() * 10000)}${ext}`;
    };
    if (Bot.isQuotedSticker) {
      const encmedia = JSON.parse(
        JSON.stringify(Bot.reply).replace("quotedM", "m")
      ).message.extendedTextMessage.contextInfo;

      const media = await Bot.client.downloadAndSaveMediaMessage(
        encmedia,
        getRandom("")
      );
      const ran = getRandom(".jpg");

      webp
        .dwebp(media, ran, "-o", (logging = "-v"))
          .then(() => {
            fs.unlinkSync(media)
          Bot.replyimage(ran);
        })
        .catch((err) => Bot.replytext(Bot.mess.error.error));
    }
  },
};
