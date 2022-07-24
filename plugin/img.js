const fs = require("fs");
const { writeFile } = require("fs/promises");
const webp = require("webp-converter");
const { downloadContentFromMessage } = require("@adiwajshing/baileys");
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
      const ran = getRandom(".jpg");

      webp
        .dwebp(media, ran, "-o", (logging = "-v"))
        .then(() => {
          fs.unlinkSync(media);
          Bot.replyimage(ran);
        })
        .catch((err) => Bot.replytext(Bot.mess.error.error));
    }
  }
};
