const path = require("path");

module.exports = {
  name: "rashmika",
  usage: "rashmika",
  desc: "The bot will send a Rashmika sticker ♥️.",
  eg: ["rashmika"],
  group: false,
  owner: false,
  handle(Xxxbot) {
    const random = Math.floor(Math.random() * 304 + 1);
    const ran =
      path.join(__dirname, "../assets/stickers/rashmika/rashmika (") +
      random +
      ").webp";
    Xxxbot.replysticker(ran);
  },
};
