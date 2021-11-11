const path = require("path");
const fs = require("fs");
const {
  MessageType
} = require("@adiwajshing/baileys");
const faq = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/faq.json"))
);
msgl = "🤖🤖🤖 *XXX-BOT FAQs* 🤖🤖🤖\n";

module.exports = {
  "name": "faq",
  "usage": "faq",
  "desc": "The bot will send some frequently asked questions about the bot.",
  "eg": [
    "faq"
  ],
  "group": false,
  handle(Infor) {
    new Promise((resolve, reject) => {
    
      let msgl = "";
      faq.forEach((element) => {
     
        msgl +=
          "\n🤔 *" +
          element.question +
          "*\n" +
          "😐 ```" +
          element.answer +
          "```\n";
      });
      Infor.replytext( msgl)
      resolve();
    })
  }
}