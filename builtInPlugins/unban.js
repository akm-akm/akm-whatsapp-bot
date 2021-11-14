const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));

module.exports = {
  name: "unban",
  usage: "unban <@user>",
  desc: "Unbans the tagged user from using the bot in this group.",
  eg: ["unban @ankit", "unban @dibyam", "unban @saket"],
  group: true,
  owner: false,
  async handle(Xxxbot) {
    const arg = Xxxbot.arg;
    const from = Xxxbot.from;
    if (arg.length == 1) {
      Xxxbot.wrongCommand();
      return;
    }

    try {
      const mentioned =
        Xxxbot.reply.message.extendedTextMessage.contextInfo.mentionedJid;

      if (!mentioned) {
        Xxxbot.wrongCommand();
        return;
      }
      const z = mentioned[0].split("@")[0];

      if (z === Xxxbot.botNumber) {
        Xxxbot.replytext(Xxxbot.mess.error.error);
        return;
      }

      if (z == Xxxbot.number) {
        Xxxbot.replytext(Xxxbot.mess.error.error);
        return;
      }
      sql.query(
        `UPDATE groupdata SET banned_users = array_remove(banned_users, '${z}') where groupid = '${from}';`
      );

      Xxxbot.replytext(Xxxbot.mess.success);
    } catch (error) {
      console.log(error);
      Xxxbot.replytext(Xxxbot.mess.error.error);
      Xxxbot.errorlog();
    }
  },
};
