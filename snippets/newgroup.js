const {
  MessageType
} = require("@adiwajshing/baileys");
const {
  text,
  
} = MessageType;
const getGroupAdmins = (participants) => {
  admins = [];
  for (let i of participants) {
    i.isAdmin ? admins.push(i.jid) : "";
  }
  return admins;
};
const newgroup = (infor,client) =>
  new Promise(async (resolve, reject) => {
    
    from =infor.from;
    const groupMetadata = await client.groupMetadata(from);
    const groupMembers = groupMetadata.participants;
    const groupAdmins = getGroupAdmins(groupMembers);
    var newmsg = `\n💮 Title: ${groupMetadata.subject}\n\n🏊 Participiants: ${groupMetadata.participants.length}\n\n🏅 Admins: ${groupAdmins.length}\n\n`+
   "🚨🚨 *VERSION UPDATE BETA 2.0*\n\n"+
      "🚨🚨 ```This group has been assigned a prefix of``` " +
      "*" +
      infor.groupdata.prefix +
      "\n```So, every time the bot has to be called, the sentence must start with this prefix.```\n\n" +

      "🚨🚨 ```Type``` "+"```"+infor.groupdata.prefix+"```"+"```help to see the list of commands bot can follow.```\n\n\n"+
      "🎀 ```Example :```\n\n"+
      "🎡 ```"+infor.groupdata.prefix+"```"+"```sticker crop```\n"+
      "🎪 ```"+infor.groupdata.prefix+"```"+"```meme```\n"+
      "🎢 ```"+infor.groupdata.prefix+"```"+"```crypto btc```\n"+
      "🎫 ```"+infor.groupdata.prefix+"```"+"```groupinfo```\n"+
      "🎠 ```"+infor.groupdata.prefix+"```"+"```market details tcs```\n\n\n";
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
  });
module.exports.newgroup=newgroup;