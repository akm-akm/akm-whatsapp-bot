module.exports = {
  name: "autosticker",
  usage: "autosticker <condition>",
  desc: "Automatically makes sticker of any media sent in the group.",
  eg: ["autosticker on", "autosticker off"],
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
          `UPDATE groupdata SET autosticker = false WHERE groupid = '${Bot.from}'`
        );
        Bot.replytext(Bot.mess.success);
        return;
      } else if (arg[1] == "on") {
        await sql.query(
          `UPDATE groupdata SET autosticker = true WHERE groupid = '${Bot.from}'`
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
