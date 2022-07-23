const fs = require("fs");
const path = require("path");

const settings = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/settings.json"))
);

module.exports = {
  name: "setprefix",
  //usage: "setprefix <symbol>",
  desc: "Sets the prefix to be used for bot commands.",
  eg: ["setprefix !", "setprefix .", "setprefix #"],
  group: true,
  owner: false,
  async handle(Bot) {
    const arg = Bot.arg;

    if (arg.length == 1) {
      Bot.wrongCommand();

      return;
    }
    if (!settings.prefixchoice.split("").includes(arg[1])) {
      Bot.replytext(
        "🤖 ```Select prefix from ```" +
          settings.prefixchoice.split("").join(" ")
      );
      return;
    }
    sql.query(
      `UPDATE groupdata SET prefix = '${arg[1]}' where groupid = '${Bot.from}';`
    );
    Bot.replytext("🚨 ```Prefix set to " + arg[1] + "```");
  },
};
