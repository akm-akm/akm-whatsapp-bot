const path = require("path");
const fs = require("fs");
const {
  MessageType
} = require("@adiwajshing/baileys");
const faq = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/faq.json"))
);
msg = "🤖 *XXX-BOT FAQs* 🤖\n\n";
const faqs = (infor, client, xxx) =>
  new Promise((resolve, reject) => {
    faq.forEach((element) => {
     
      msg +=
        "🤔 ```" +
        element.question +
        "```\n\n" +
        "😐 ```" +
        element.answer +
        "```\n\n\n";
    });
    client.sendMessage(infor.from, msg, MessageType.text, {
      quoted: xxx,
    });
    resolve();
  });
module.exports.faqs = faqs;
