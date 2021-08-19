const path = require("path");
const fs = require("fs");
const {
  MessageType
} = require("@adiwajshing/baileys");
const faq = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/faq.json"))
);
msgl = "🤖🤖 *XXX-BOT FAQs* 🤖🤖\n\n";
const faqs = (infor4, client, xxx3) =>
  new Promise((resolve, reject) => {
    let infor5 = { ...infor4 };
    let xxx = { ...xxx3 };

    faq.forEach((element) => {
     
      msgl +=
        "🤔 *" +
        element.question +
        "*\n" +
        "😐 ```" +
        element.answer +
        "```\n\n\n";
    });
    client.sendMessage(infor5.from, msgl, MessageType.text, {
      quoted: xxx,
    });
    resolve();
  });
module.exports.faqs = faqs;
