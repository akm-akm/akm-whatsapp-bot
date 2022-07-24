module.exports = {
  name: "botaccess",
  usage: "botaccess <condition>",
  desc: "Non admins will not be able to use the bot if it is turned off.",
  eg: ["botaccess off", "botaccess on"],
  group: true,
  owner: false,
  async handle(Bot) {
    try {
      const arg = Bot.arg;

      if (arg.length == 1) {
        Bot.wrongCommand();
        return;
      }
      if (arg[1] == "off") {
        await sql.query(
          `UPDATE groupdata SET membercanusebot = false WHERE groupid = '${Bot.from}'`
        );
        Bot.replytext(Bot.mess.success);
        return;
      } else if (arg[1] == "on") {
        await sql.query(
          `UPDATE groupdata SET membercanusebot = true WHERE groupid = '${Bot.from}'`
        );
        Bot.replytext(Bot.mess.success);
        return;
      } else {
        Bot.wrongCommand();
      }
    } catch (error) {
      Bot.replytext(Bot.mess.error.error);
    }
  }
};
