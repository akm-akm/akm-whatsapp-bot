const fs = require("fs");
const path = require("path");
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/help.json"))
)
const help = (arg, prefix) =>
  new Promise( (resolve, reject) => {
    var msg;
    
    if (arg.length ==1) {
    c=  prefix==undefined? "```Not needed in inbox```" : prefix 
    if(prefix==undefined) prefix='✨'
      msg =
        "🤖 *AKM-BOT Command List* 🤖\n\n🎀 *Prefix:* " 
        +c+
        "\n\n📗 *General*\n ```help, groupinfo, invite, adminlist```\n\n👑 *Group Admin*\n```promote, demote, kick, grouplink, changedp, botleave, close, open, add, purge, tagall, ban, unban, banlist, allowabuse, denyabuse```\n\n📱 *Media*\n```sticker, rs, ytaudio, ytvideo, shorturl, crypto, meme, pin, rashmika```\n\n🔗 *For detailed info*\n```help <command>```\n\n🎲 *Example*\n"+prefix+"help crypto\n"+prefix+"help shorturl\n"+prefix+"help sticker\n";
      resolve(msg);
    }
    try {
      msg =
        "\n🏀 *Description* :\n" +
        data[arg[1]].desc +
        "\n\n" +
        "🏀 *Usage* :\n" +
        "```" +
        data[arg[1]].usage +
        "```" +
        "\n\n" +
        "🏀 *Example* :\n" +
        "```" +
        data[arg[1]].eg +
        "```" +
        "\n";
      resolve(msg);
    } catch (e) {
      reject("```Command``` " + "```"+arg[1] + "```"+ " ```not found.```");
    }
  });
module.exports.help = help;