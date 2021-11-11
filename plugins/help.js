const fs = require("fs");
const path = require("path");
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/help.json"))
);
const { MessageType } = require("@adiwajshing/baileys");
const { text } = MessageType;
const getGroupAdmins = (participants) => {
  admins = [];
  for (let i of participants) {
    i.isAdmin ? admins.push(i.jid) : "";
  }
  return admins;
};
total = 0, version = "";
const axios = require('axios');

try {
  axios.get(`https://api.github.com/repos/akm-akm/xxx-whatsapp-bot/stats/commit_activity`)
    .then((response) => {
      let data = response.data;

      data.forEach(obj => {
        total += obj.total;
      });

      version = total.toString().split("").join(".");
    
    });
} catch (error) {
  axios.get(`https://api.github.com/repos/akm-akm/xxx-whatsapp-bot/stats/commit_activity`)
    .then((response) => {
      let data = response.data;

      data.forEach(obj => {
        total += obj.total;
      });

      version = total.toString().split("").join(".");
     
    });
}



const help = (Infor, client, xxx3, syntax) =>
  new Promise(async (resolve, reject) => {
    const xxx = { ...xxx3 };
    const arg = Infor.arg;
    const from = Infor.from;
    const isGroup = from.endsWith("@g.us");
    const groupMetadata = isGroup ? await client.groupMetadata(from) : "";
    const groupMembers = isGroup ? groupMetadata.participants : "";
    const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : "";
    const isGroupAdmins = groupAdmins.includes(Infor.sender) || false;
    let prefix = Infor.groupdata.prefix;
    let useprefix = Infor.groupdata.useprefix;
    let msg;
    const c = prefix == undefined ? "```Not needed in inbox```" : useprefix ? prefix : "( " + prefix + " )" + " ```Disabled```";
    if (prefix == undefined || !useprefix) prefix = "🎀";

    if (arg.length == 1) {
      cas = Infor.number === process.env.OWNER_NUMBER ?
        "🎩 *Owner* :\n```rst, dul, dgl, mgs, sql, mdr, rmdr, rtrt, stp```\n\n"
        : "";

      const grpcmds = (isGroup && (isGroupAdmins || Infor.number === process.env.OWNER_NUMBER || Infor.botdata.moderators.includes(Infor.number))) ? "👑 *Admin* :\n```groupinfo, promote, demote, kick, changedp, grouplink, botleave, setprefix, useprefix, autosticker, nsfw, close, open, tagall, ban, unban, banlist, filterabuse, botaccess```\n\n" : "";
      msg =
        "🤖🤖🤖  *XXX 🤖 BOT*  🤖🤖🤖\n\n💡 *Prefix:*  " +
        c +
        "\n\n" +
        "📗 *General* :\n ```help, faq, limit, delete, sourcecode, invite```\n\n" +
        grpcmds +
        "📱 *Media* :\n```ss, sticker, rs, lyrics, ytv, shorturl, testnsfw, run, crypto, pin, rashmika```\n\n" +
        cas +
        "🎁 *For detailed info :*\n" +
        prefix +
        "```help <command>```\n\n" +
        "🚄 *Example* :\n" +
        prefix + "help crypto\n" +
        prefix + "help shorturl\n" +
        prefix + "help sticker\n" +
        prefix + "help run\n" +
        "\n📃 *Bot News* :" +
        "\n‼️ _Few admin commands are down_" +
        "\n‼️ _ss feature will not work_" +
        "\n\n⚙️ *Bot version* : " + version;


      client.sendMessage(from, msg, text, {
        quoted: xxx,
      });
      resolve();
    } else {

      try {
        msg =
          syntax == undefined ? "🔖 *Description* :\n" +
            data[arg[1]].desc : "❎ *Error* :\n```syntax error in the given command.```\n" + "\n🔖 *Description* :\n" +
          data[arg[1]].desc
        msg += "\n\n" +
          "📕 *Usage* :\n" +
          prefix + "```" +
          data[arg[1]].usage +
          "```" +
          "\n\n" +
          "📚 *Example* :\n";
        data[arg[1]].eg.forEach(currentItem => {
          msg += "```" + prefix + currentItem + "```" + "\n";
        });
        client.sendMessage(from, msg, text, {
          quoted: xxx,
          detectLinks: false

        });
        resolve();
      } catch (e) {
        client.sendMessage(
          from,
          "🤖 ```No such command:``` " + arg[1],
          text,
          {
            quoted: xxx,
          }
        );
        resolve();
      }
    }
  });
module.exports.help = help;