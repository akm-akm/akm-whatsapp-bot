const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));

module.exports = {
  name: "ban",
  usage: "ban <@user>",
  desc: "Bans the tagged user from using the bot in this group.",
  eg: ["ban @ankit", "ban @dibyam", "ban @saket"],
  group: true,
  owner: false,
  async handle(Bot) {
    const arg = Bot.arg;
    const from = Bot.from;
    if (arg.length == 1) {
      Bot.wrongCommand();
      return;
    }

    try {
      const mentioned = Bot.taggedUser;
      if (!mentioned) {
        Bot.wrongCommand();
        return;
      }
      const z = mentioned[0].split("@")[0];

      if (z === Bot.botNumber) {
        Bot.replytext(
          "🤖 ```I can't ban myself, but I can ban you! There you go!``` _BANNED_"
        );
        sql.query(
          `UPDATE groupdata SET banned_users = array_append(banned_users, '${Bot.number}') where groupid = '${from}';`
        );
        return;
      }
      if (Bot.botdata.moderators.includes(z) || z == process.env.OWNER_NUMBER) {
        Bot.replytext(Bot.mess.error.error);
        return;
      }
      if (z == Bot.number) {
        Bot.replytext(Bot.mess.error.error);
        return;
      }
      await sql.query(
        `UPDATE groupdata SET banned_users = array_remove(banned_users, '${z}') where groupid = '${from}';`
      );
      sql.query(
        `UPDATE groupdata SET banned_users = array_append(banned_users, '${z}') where groupid = '${from}';`
      );
      Bot.replytext(Bot.mess.success);
    } catch (error) {
      console.log(error);
      Bot.replytext(Bot.mess.error.error);
      Bot.errorlog();
    }
  },
};
