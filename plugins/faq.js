const path = require("path");
const fs = require("fs");
const {
  MessageType
} = require("@adiwajshing/baileys");
const faq = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/faq.json"))
);
msgl = "🤖 *XXX-BOT FAQs* 🤖\n\n";
const faqs = (infor, client, xxx) =>
  new Promise((resolve, reject) => {
    faq.forEach((element) => {
     
      msgl +=
        "🤔 *" +
        element.question +
        "*\n" +
        "😐 ```" +
        element.answer +
        "```\n\n\n";
    });
    client.sendMessage(infor.from, msgl, MessageType.text, {
      quoted: xxx,
    });
    resolve();
  });
module.exports.faqs = faqs;
