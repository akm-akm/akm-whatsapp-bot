module.exports = {
  name: "prefix",
  usage: "prefix <condition>",
  desc: "If you want to use the bot without a prefix then turn this off.",
  eg: ["prefix on", "prefix off"],
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
        `UPDATE groupdata SET useprefix = false WHERE groupid = '${Bot.from}'`
      );
      Bot.replytext(Bot.mess.success);
      return;
    } else if (arg[1] == "on") {
      await sql.query(
        `UPDATE groupdata SET useprefix = true WHERE groupid = '${Bot.from}'`
      );
      Bot.replytext(Bot.mess.success);
      return;
    } else {
      Bot.wrongCommand();
    }
  },
};
