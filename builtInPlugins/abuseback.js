module.exports = {
  name: "abuseback",
  usage: "abuseback <condition>",
  desc: "If turned on, the bot will search for cuss words in the command and reply back with the same word!",
  eg: ["abuseback on", "abuseback off"],
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
        `UPDATE groupdata SET allowabuse = false WHERE groupid = '${Xxxbot.from}'`
      );
      Xxxbot.replytext(Xxxbot.mess.success);
      return;
    } else if (arg[1] == "on") {
      sql.query(
        `UPDATE groupdata SET allowabuse = true WHERE groupid = '${Xxxbot.from}'`
      );
      Xxxbot.replytext(Xxxbot.mess.success);
      return;
    } else {
      Xxxbot.wrongCommand();
    }
  },
};
