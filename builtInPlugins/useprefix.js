module.exports = {
  name: "prefix",
  usage: "prefix <condition>",
  desc: "If you want to use the bot without a prefix then turn this off.",
  eg: ["prefix on", "prefix off"],
  group: true,
  owner: false,
  async handle(Xxxbot) {
    const arg = Xxxbot.arg;

    if (arg.length == 1) {
      Xxxbot.wrongCommand();
      return;
    }
    if (arg[1] == "off") {
      sql.query(
        `UPDATE groupdata SET useprefix = false WHERE groupid = '${Xxxbot.from}'`
      );
      Xxxbot.replytext(Xxxbot.mess.success);
      return;
    } else if (arg[1] == "on") {
      sql.query(
        `UPDATE groupdata SET useprefix = true WHERE groupid = '${Xxxbot.from}'`
      );
      Xxxbot.replytext(Xxxbot.mess.success);
      return;
    } else {
      Xxxbot.wrongCommand();
    }
  },
};
