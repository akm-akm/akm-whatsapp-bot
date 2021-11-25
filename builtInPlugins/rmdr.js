const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));

module.exports = {
  name: "rmdr",
  usage: "rmdr <@user>",
  desc: "The bot will remove the tagged user a moderator of the bot.",
  eg: ["rmdr @ankit", "rmdr @messi", "rmdr 15123479768"],
  group: false,
  owner: true,
  async handle(Bot) {
    const arg = Bot.arg;

    if (arg.length == 1) {
      Bot.wrongCommand();
      return;
    }

    const number = arg[1].replace("@", "").replace("+", "");

    sql
      .query(
        `UPDATE botdata SET moderators = array_remove(moderators, '${number}');`
      )
      .then((result) => {
        Bot.replytext(Bot.mess.success);
      })
      .catch((err) => {
        Bot.replytext(Bot.mess.error.error);
      });
  },
};
