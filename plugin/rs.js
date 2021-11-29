const path = require("path");

module.exports = {
  name: "rs",
  usage: "rs",
  desc: "The bot will send a random sticker.",
  eg: ["rs"],
  group: false,
  owner: false,
  handle(Bot) {
    const random = Math.ceil(Math.random() * 499);
    const ran =
      path.join(__dirname, "../assets/stickers/allsticker/s (") +
      random +
      ").webp";
    Bot.replysticker(ran);
  },
};
