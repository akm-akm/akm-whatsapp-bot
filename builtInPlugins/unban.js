const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));

module.exports = {
  name: "unban",
  usage: "unban <@user>",
  desc: "Unbans the tagged user from using the bot in this group.",
  eg: ["unban @ankit", "unban @dibyam", "unban @saket"],
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
      const mentioned =
        Bot.reply.message.extendedTextMessage.contextInfo.mentionedJid;

      if (!mentioned) {
        Bot.wrongCommand();
        return;
      }
      const z = mentioned[0].split("@")[0];

      if (z === Bot.botNumber) {
        Bot.replytext(Bot.mess.error.error);
        return;
      }

      if (z == Bot.number) {
        Bot.replytext(Bot.mess.error.error);
        return;
      }
      sql.query(
        `UPDATE groupdata SET banned_users = array_remove(banned_users, '${z}') where groupid = '${from}';`
      );

      Bot.replytext(Bot.mess.success);
    } catch (error) {
      Bot.errorlog();
    }
  },
};
