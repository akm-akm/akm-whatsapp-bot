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
setTimeout(() => {
  axios.get(`https://api.github.com/repos/akm-akm/xxx-whatsapp-bot/stats/commit_activity`)
    .then((response) => {
      let data = response.data;

      data.forEach(obj => {
        total += obj.total;
      });
    
      version = total.toString().split("").join(".");
      console.log("v",version);
    });
}, 20000);

const help = (infor4, client, xxx3, syntax) =>
  new Promise(async (resolve, reject) => {
    const infor5 = { ...infor4 };
    const xxx = { ...xxx3 };
    const arg = infor5.arg;
    const from = infor5.from;
    const isGroup = from.endsWith("@g.us");
    const groupMetadata = isGroup ? await client.groupMetadata(from) : "";
    const groupMembers = isGroup ? groupMetadata.participants : "";
    const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : "";
    const isGroupAdmins = groupAdmins.includes(infor5.sender) || false;
    let prefix = infor5.groupdata.prefix;
    let useprefix = infor5.groupdata.useprefix;
    let msg;
    c = prefix == undefined ? "```Not needed in inbox```" : useprefix ? prefix : "( " + prefix + " )" + " ```Disabled```";
    if (prefix == undefined || !useprefix) prefix = "🎀";

    if (arg.length == 1) {
      cas = infor5.number === process.env.OWNER_NUMBER ?
        "🎩 *Owner* :\n```rst, dul, dgl, mgs, sql, mdr, rmdr, rtrt, stp```\n\n"
        : "";

      const grpcmds = (isGroupAdmins || infor5.number === process.env.OWNER_NUMBER || infor5.botdata.moderators.includes(infor5.number) )? "👑 *Admin* :\n```groupinfo, promote, demote, kick, removeall, changedp, grouplink, botleave, setprefix, useprefix, autosticker, nsfw, close, open, tagall, ban, unban, banlist, filterabuse, botaccess```\n\n" : "";
      msg =
        "🤖🤖🤖  *XXX 🤖 BOT*  🤖🤖🤖\n\n💡 *Prefix:*  " +
        c +
        "\n\n" +
        "📗 *General* :\n ```help, faq, limit, delete, sourcecode, invite```\n\n" +
        grpcmds +
        "📱 *Media* :\n```ss, sticker, rs, ytv, shorturl, testnsfw, run, crypto, pin, rashmika```\n\n" +
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
        "\n‼️ _testnsfw feature added_" +
        "\n‼️ _ss is not working_" +
        "\n‼️ _groupinfo added_"
        +
        "\n\n⚙️ *Bot version* : " + version;


      client.sendMessage(from, msg, text, {
        quoted: xxx,
      });
      resolve();
    } else {

      try {
        msg =
          syntax == undefined ? "🔖 *Description* :\n" +
            data[arg[1]].desc : "‼️ *Error* :\n```syntax error in the given command.```";
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