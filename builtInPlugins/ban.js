const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));

module.exports = {
  name: "ban",
  usage: "ban <@user>",
  desc: "Bans the tagged user from using the bot in this group.",
  eg: ["ban @ankit", "ban @dibyam", "ban @saket"],
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
      const mentioned = Xxxbot.taggedUser;
      if (!mentioned) {
        Xxxbot.wrongCommand();
        return;
      }
      const z = mentioned[0].split("@")[0];

      if (z === Xxxbot.botNumber) {
        Xxxbot.replytext(
          "🤖 ```I can't ban myself, but I can ban you! There you go!``` _BANNED_"
        );
        sql.query(
          `UPDATE groupdata SET banned_users = array_append(banned_users, '${Xxxbot.number}') where groupid = '${from}';`
        );
        return;
      }
      if (
        Xxxbot.botdata.moderators.includes(z) ||
        z == process.env.OWNER_NUMBER
      ) {
        Xxxbot.replytext(Xxxbot.mess.error.error);
        return;
      }
      if (z == Xxxbot.number) {
        Xxxbot.replytext(Xxxbot.mess.error.error);
        return;
      }
      await sql.query(
        `UPDATE groupdata SET banned_users = array_remove(banned_users, '${z}') where groupid = '${from}';`
      );
      sql.query(
        `UPDATE groupdata SET banned_users = array_append(banned_users, '${z}') where groupid = '${from}';`
      );
      Xxxbot.replytext(Xxxbot.mess.success);
    } catch (error) {
      console.log(error);
      Xxxbot.replytext(Xxxbot.mess.error.error);
      Xxxbot.errorlog();
    }
  },
};
