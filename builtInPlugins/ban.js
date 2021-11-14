const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));

module.exports = {
  name: "ban",
  usage: "ban <@user>",
  desc: "Bans the tagged user from using the bot in this group.",
  eg: ["ban @ankit", "ban @dibyam", "ban @saket"],
  group: true,
  owner: false,
  async handle(Infor) {
    const arg = Infor.arg;
    const from = Infor.from;
    if (arg.length == 1) {
      Infor.wrongCommand();
      return;
    }

    try {
      const mentioned = Infor.taggedUser;
      if (!mentioned) {
        Infor.wrongCommand();
        return;
      }
      const z = mentioned[0].split("@")[0];

      if (z === Infor.botNumber) {
        Infor.replytext(
          "🤖 ```I can't ban myself, but I can ban you! There you go!``` _BANNED_"
        );
        sql.query(
          `UPDATE groupdata SET banned_users = array_append(banned_users, '${Infor.number}') where groupid = '${from}';`
        );
        return;
      }
      if (
        Infor.botdata.moderators.includes(z) ||
        z == process.env.OWNER_NUMBER
      ) {
        Infor.replytext(Infor.mess.error.error);
        return;
      }
      if (z == Infor.number) {
        Infor.replytext(Infor.mess.error.error);
        return;
      }
      await sql.query(
        `UPDATE groupdata SET banned_users = array_remove(banned_users, '${z}') where groupid = '${from}';`
      );
      sql.query(
        `UPDATE groupdata SET banned_users = array_append(banned_users, '${z}') where groupid = '${from}';`
      );
      Infor.replytext(Infor.mess.success);
    } catch (error) {
      console.log(error);
      Infor.replytext(Infor.mess.error.error);
      Infor.errorlog();
    }
  },
};
