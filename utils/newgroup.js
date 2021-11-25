const { MessageType } = require("../@adiwajshing/baileys");
const { text } = MessageType;

const newgroup = (from, client, random) => {
  let newmsg =
    "🤖🤖🤖  *XXX 🤖 BOT*  🤖🤖🤖\n\n" +
    "🚨 *Prefix assigned is:* " +
    random +
    "\n\n🚨 *The bot will only listen to commands starting with* " +
    random +
    "\n\n" +
    "🚨 ```Type``` " +
    "```" +
    random +
    "```" +
    "```help to see the list of commands bot can follow.```\n\n" +
    "🎀 *Example:* \n" +
    "🎁 ```" +
    random +
    "```" +
    "```help```\n" +
    "🎡 ```" +
    random +
    "```" +
    "```sticker crop```\n" +
    "🎪 ```" +
    random +
    "```" +
    "```rs```\n" +
    "🎢 ```" +
    random +
    "```" +
    "```crypto btc```\n" +
    "🎫 ```" +
    random +
    "```" +
    "```limit```\n";
  client.sendMessage(from, newmsg, text);
};
module.exports.newgroup = newgroup;
