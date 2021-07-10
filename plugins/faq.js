const path = require("path");
const fs = require("fs");
const faq = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/faq.json"))
);
msg =
"🤖 *AKM-BOT FAQs* 🤖\n\n" 
const faqs = (client,xxx)=>  new Promise((resolve, reject) => {

faq.forEach(element => {
    console.log(element.question);
    console.log(element.answer);
    msg+="🤔 ```"+element.question+"```\n"+
    "😐 ```"+element.answer+"```\n\n"
});
client.sendMessage(from, msg, text, {
    quoted: xxx,
  });
  resolve()
});
module.exports.faqs=faqs; 