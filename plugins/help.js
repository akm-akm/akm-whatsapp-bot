const fs = require("fs");
const path = require("path");
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/help.json"))
);
const { MessageType } = require("@adiwajshing/baileys");
const { text } = MessageType;
zz = "\n💻 *Running since:* " + Math.floor(process.uptime()) + " ```seconds```";
const help = (infor, client, xxx) =>
  new Promise((resolve, reject) => {
    arg = infor.arg;
    from = infor.from;
    prefix = infor.groupdata.prefix;
    var msg;
    if (arg.length == 1) {
      c = prefix == undefined ? "```Not needed in inbox```" : prefix;
      if (prefix == undefined) prefix = "✨";
      msg =
        "🤖 *XXX-BOT Command List* 🤖\n\n💡 *Prefix:*  " +
        c +
        "\n\n📗 *General*\n ```help, faq, limit, delete, sourcecode```\n\n" +
        "👑 *Group Admin*\n```promote, demote, kick, grouplink, changedp, botleave, close, open, add, purge, tagall, ban, unban, banlist, allowabuse, denyabuse```\n\n" +
        "📱 *Media*\n```sticker, rs, ytv, shorturl, crypto, market, pin, rashmika```\n\n" +
        "🔗 *For detailed info*\n" +
        prefix +
        "```help <command>```\n\n" +
        "🎲 *Example*\n" +
        prefix +
        "help crypto\n" +
        prefix +
        "help shorturl\n" +
        prefix +
        "help sticker\n\nFew group admin commands have been disabled.";

      client.sendMessage(from, msg, text, {
        quoted: xxx,
      });
      resolve();
    } else {
      try {
        msg =
          "\n🔖 *Description* :\n" +
          data[arg[1]].desc +
          "\n\n" +
          "📕 *Usage* :\n" +
          "```" +
          data[arg[1]].usage +
          "```" +
          "\n\n" +
          "📚 *Example* :\n" +
          "```" +
          data[arg[1]].eg +
          "```" +
          "\n";
        client.sendMessage(from, msg, text, {
          quoted: xxx,
        });
        resolve();
      } catch (e) {
        client.sendMessage(
          from,
          "```Command``` " + "```" + arg[1] + "```" + " ```not found.```",
          text,
          {
            quoted: xxx,
          }
        );
        reject();
      }
    }
  });
module.exports.help = help;
