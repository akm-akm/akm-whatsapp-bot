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
    const arg = Bot.arg;
    if (arg.length == 1) {
      Bot.wrongCommand();
      return;
    }

    const number = arg[1].replace("@", "").replace("+", "");

    sql.query(
      `UPDATE botdata SET moderators = array_append(moderators, '${number}');`
    );
    sql
      .query(
        `UPDATE groupdata SET banned_users = array_remove(banned_users, '${number}');`
      )
      .then((result) => {
        Bot.replytext(Bot.mess.success);
      })
      .catch((err) => {
        Bot.errorlog(err)
      });
  },
};
