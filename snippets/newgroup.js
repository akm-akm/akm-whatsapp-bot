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
    var newmsg = `\n💮 *Title:* ${groupMetadata.subject}\n\n🏊 *Participiants:* ${groupMetadata.participants.length}\n\n🏅 *Admins:* ${groupAdmins.length}\n\n`+
   "🚨🚨 *VERSION UPDATE BETA 2.0*\n\n"+
      "🚨🚨 ```This group has been assigned a prefix of``` " +
     
      random +
      "\n```So, every time the bot has to be called, the sentence must start with this prefix.```\n\n" +

      "🚨🚨 ```Type``` "+"```"+random+"```"+"```help to see the list of commands bot can follow.```\n\n\n"+
      "🎀 ```Example :```\n\n"+
      "🎡 ```"+random+"```"+"```sticker crop```\n"+
      "🎪 ```"+random+"```"+"```meme```\n"+
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