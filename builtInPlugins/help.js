const path = require("path");
const fs = require('fs');
const admin = [], user = [], owner = [];
const chalk = require('chalk');
const version = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../package.json"))
).version;
const plugins = fs.readdirSync(path.join(__dirname, '../plugin'))
const pluginsinfo = require(path.join(__dirname, '../utils/pluginInfo'));

for (let file of plugins) {
  const command = require(path.join(__dirname, '../plugin/', `${file}`));
  if (command.name && command.usage && command.desc && typeof command.handle === "function" && command.eg && typeof command.group === "boolean" && typeof command.owner === "boolean") {
    if (command.owner) {
      owner.push(command.name);
    } else if (command.group) {
      admin.push(command.name);
    } else {
      user.push(command.name);
    }

  } else {
    console.log(
      chalk.blueBright.bold("Could not import plugin  "),
      chalk.redBright.bold(`${file}`)
    )
    continue;
  }

}
const builtInPlugins = fs.readdirSync(path.join(__dirname, '../builtInPlugins')).filter(file => file != 'help.js')
for (let file of builtInPlugins) {
  const command = require(path.join(__dirname, '../builtInPlugins/', `${file}`));
  if (command.name && command.usage && command.desc && typeof command.handle === "function" && command.eg && typeof command.group === "boolean" && typeof command.owner === "boolean") {
    if (command.owner) {
      owner.push(command.name);
    } else if (command.group) {
      admin.push(command.name);
    } else {
      user.push(command.name);
    }

  } else {
    console.log(
      chalk.blueBright.bold("Could not import plugin  "),
      chalk.redBright.bold(`${file}`)
    )
    continue;
  }

}

const userCommands = "📱 *Users* :\n```" + "help, limit, " + user.sort().join(", ") + "```\n\n";
const adminCommands = "👑 *Admin* :\n```" + admin.sort().join(", ") + " " + "```\n\n";
const ownerCommands = "🎩 *Owner* :\n```" + owner.sort().join(", ") + " " + "```\n\n";

module.exports = {
  "name": "help",
  "usage": "help <arguments>",
  "desc": "Shows the help menu.",
  "eg": [
    "help",
  ],
  "group": false,
  "owner": false,




  handle(Infor) {

    let prefix = Infor.groupdata.prefix;
    const useprefix = Infor.groupdata.useprefix;

    if (Infor.arg.length === 1) {

      const c = prefix == undefined ? "```Not needed in inbox```" : useprefix ? prefix : "( " + prefix + " )" + " ```Disabled```";
      if (prefix == undefined || !useprefix) prefix = "🎀";
      const grpcmds = (Infor.isGroup && (Infor.isGroupAdmins || Infor.number === process.env.OWNER_NUMBER || Infor.botdata.moderators.includes(Infor.number))) ? adminCommands : "";
      const owncmds = Infor.number === process.env.OWNER_NUMBER ? ownerCommands : "";



      let help = "🤖🤖🤖  *XXX 🤖 BOT*  🤖🤖🤖\n\n💡 *Prefix:*  " + c + "\n\n" + userCommands + grpcmds + owncmds + "🎁 *For detailed info :*\n" +
        prefix +
        "```help <command>```\n\n" +
        "🚄 *Example* :\n" + "```" +
        prefix + "help crypto\n" +
        prefix + "help shorturl\n" +
        prefix + "help sticker\n" +
        prefix + "help run```\n" +

        "\n📃 *Bot News* :" +
        "\n‼️ _Few admin commands are down_" +
      
        "\n\n⚙️ *Bot version* : " + version;
      Infor.replytext(help);

    }
    else {
      if (!pluginsinfo[Infor.arg[1]]) return Infor.replytext(Infor.mess.unknowncommand)
      if (prefix == undefined || !useprefix) prefix = "🎀";
      let body = "🔖 *Description* :\n" + "```" + pluginsinfo[Infor.arg[1]].desc + "```\n\n" + "📕 *Usage* :\n" +
        prefix + "```" +
        pluginsinfo[Infor.arg[1]].usage + "```\n\n" +
        "📚 *Example* :";

      pluginsinfo[Infor.arg[1]].eg.forEach(currentItem => {
        body += "\n```" + prefix + currentItem + "```";
      });
      Infor.replytext(body)

    }
  }
}