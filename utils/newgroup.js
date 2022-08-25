const newgroup = (from, client, random) => {
  let newmsg =
    "🤖🤖🤖  *AKM 🤖 BOT*  🤖🤖🤖\n\n" +
    
    "\n🚨 ```Type``` " +
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
  client.sendMessage(from, { text: newmsg });
};
module.exports.newgroup = newgroup;
