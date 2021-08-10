const fs = require("fs");
const path = require("path");
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/help.json"))
);
const { MessageType } = require("@adiwajshing/baileys");
const { text } = MessageType;



const help = (infor, client, xxx,syntax) =>
  new Promise((resolve, reject) => {
   
    arg = infor.arg;
    from = infor.from;
    prefix = infor.groupdata.prefix;
    useprefix = infor.groupdata.useprefix;
    var msg;
    c = prefix == undefined ? "```Not needed in inbox```" : useprefix ? prefix : "```Disabled```";
    if (prefix == undefined || !useprefix) prefix = "📍";

    if (arg.length == 1) {
      
      msg =
        "🤖🤖🤖  *XXX 🤖 BOT*  🤖🤖🤖\n\n💡 *Prefix:*  " +
        c +
      "\n\n" +
        "📗 *General*\n ```help, faq, limit, delete, sourcecode```\n\n" +
        "👑 *Group Admin*\n```promote, demote, kick, grouplink, botleave, setprefix, prefix, autosticker, close, open, add, purge, tagall, ban, unban, banlist, filterabuse, botaccess```\n\n" +
        "📱 *Media*\n```sticker, rs, ytv, shorturl, crypto, market, pin, rashmika```\n\n" +
        "🎁 *For detailed info :*\n" +
        prefix +
        "```help <command>```\n\n" +
        "🚄 *Example* :\n" +
        prefix +
        "help crypto\n" +
        prefix +
        "help shorturl\n"
        + prefix + "help sticker\n";

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