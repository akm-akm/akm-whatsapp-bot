const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));

module.exports = {
  name: "abuseback",
  usage: "abuseback <condition>",
  desc: "If turned on, the bot will search for cuss words in the command and reply back with the same word!",
  eg: ["abuseback on", "abuseback off"],
  group: true,
  owner: false,
  async handle(Bot) {
    const arg = Bot.arg;

    if (arg.length == 1) {
      Bot.wrongCommand();
      return;
    }
    if (arg[1] == "off") {
      await sql.query(
        `UPDATE groupdata SET allowabuse = true WHERE groupid = '${Bot.from}'`
      );
      Bot.replytext(Bot.mess.success);
      return;
    } else if (arg[1] == "on") {
      await sql.query(
        `UPDATE groupdata SET allowabuse = false WHERE groupid = '${Bot.from}'`
      );
      Bot.replytext(Bot.mess.success);
      return;
    } else {
      Bot.wrongCommand();
    }
  }
};
