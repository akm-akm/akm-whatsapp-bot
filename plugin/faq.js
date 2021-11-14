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
  handle(Infor) {
    let msgl = "🤖🤖🤖 *XXX-BOT FAQs* 🤖🤖🤖\n";

    faq.forEach((element) => {
      msgl +=
        "\n🤔 *" +
        element.question +
        "*\n" +
        "😐 ```" +
        element.answer +
        "```\n";
    });
    Infor.replytext(msgl);
  },
};
