const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));

module.exports = {
  name: "mdr",
  usage: "mdr <@user>",
  desc: "The bot will promote the tagged user as a moderator of the bot.",
  eg: ["mdr @ankit", "mdr @messi", "mdr 15123479768"],
  group: false,
  owner: true,
  async handle(Bot) {
    try {
      const arg = Bot.arg;
      if (arg.length == 1) {
        Bot.wrongCommand();
        return;
      }

      const number = arg[1].replace("@", "").replace("+", "");

      sql.query(
        `UPDATE botdata SET moderators = array_append(moderators, '${number}');`
      );
      await sql.query(
        `UPDATE groupdata SET banned_users = array_remove(banned_users, '${number}');`
      );
      Bot.replytext(Bot.mess.success);
    } catch (error) {
      Bot.errorlog(error);
    }
  }
};
