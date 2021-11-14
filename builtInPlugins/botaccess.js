module.exports = {
  name: "botaccess",
  usage: "botaccess <condition>",
  desc: "Non admins will not be able to use the bot if it is turned off.",
  eg: ["botaccess off", "botaccess on"],
  group: true,
  owner: false,
  async handle(Infor) {
    const arg = Infor.arg;

    if (arg.length == 1) {
      Infor.wrongCommand();
      return;
    }
    if (arg[1] == "off") {
      sql.query(
        `UPDATE groupdata SET membercanusebot = false WHERE groupid = '${Infor.from}'`
      );
      Infor.replytext(Infor.mess.success);
      return;
    } else if (arg[1] == "on") {
      sql.query(
        `UPDATE groupdata SET membercanusebot = true WHERE groupid = '${Infor.from}'`
      );
      Infor.replytext(Infor.mess.success);
      return;
    } else {
      Infor.wrongCommand();
    }
  },
};
