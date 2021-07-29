const {
  MessageType
} = require("@adiwajshing/baileys");
const {
  text
} = MessageType;
const getGroupAdmins = (participants) => {
  admins = [];
  for (let i of participants) {
    i.isAdmin ? admins.push(i.jid) : "";
  }
  return admins;
};
const newgroup = (from,client,random) =>
  new Promise(async (resolve, reject) => {
    
    const groupMetadata = await client.groupMetadata(from);
    const groupMembers = groupMetadata.participants;
    const groupAdmins = getGroupAdmins(groupMembers);
    var newmsg = "🤖🤖🤖 *XXX-BOT* 🤖🤖🤖\n\n"+ "🚨 *This group has been assigned a prefix of* " +
      random +
      "\n\n🚨 ```So, every time the bot has to be called, the sentence must start with: ```" + random +"\n\n"

      "🚨 ```Type``` "+"```"+random+"```"+"```help to see the list of commands bot can follow.```\n\n\n"+
      "🎀 ```Example :```\n\n"+
      "🎡 ```"+random+"```"+"```sticker crop```\n"+
      "🎪 ```"+random+"```"+"```rs```\n"+
      "🎢 ```"+random+"```"+"```crypto btc```\n"+
      "🎫 ```"+random+"```"+"```limit```\n"+
      "🎠 ```"+random+"```"+"```market details tcs```\n\n\n";
      index = 0;
      for (let admin of groupAdmins) {
        index += 1;
        newmsg += `👮 @${admin.split("@")[0]}\n`;
      }
  
    client.sendMessage(from, newmsg, text, {
      contextInfo: {
        mentionedJid: admins,
      },
    });
    resolve()
  });
module.exports.newgroup=newgroup;