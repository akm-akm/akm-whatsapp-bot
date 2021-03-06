const path = require("path");
const fs = require("fs");
const faq = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/faq.json"))
);

module.exports = {
  name: "faq",
  usage: "faq",
  desc: "The bot will send some frequently asked questions about the bot.",
  eg: ["faq"],
  group: false,
  owner: false,
  handle(Bot) {
    let msgl = "š¤š¤š¤  *AKM š¤ BOT*  š¤š¤š¤\n";
    faq.forEach((element) => {
      msgl +=
        "\nš¤ *" +
        element.question +
        "*\n" +
        "š ```" +
        element.answer +
        "```\n";
    });
    Bot.replytext(msgl);
  },
};
