module.exports = {
  name: "detectnsfw",
  usage: "detectnsfw <condition>",
  desc: "If it is turned on, the bot will scan the image for nudity before converting it to sticker in the group.",
  eg: ["detectnsfw on", "detectnsfw off"],
  group: true,
  owner: false,
  async handle(Bot) {
    const arg = Bot.arg;

    if (arg.length == 1) {
      Bot.wrongCommand();
      return;
    }
    if (arg[1] == "off") {
      sql.query(
        `UPDATE groupdata SET nsfw = false WHERE groupid = '${Bot.from}'`
      );
      client.sendMessage(from, Bot.mess.success, text, {
        quoted: Bot.reply,
      });
      return;
    } else if (arg[1] == "on") {
      sql.query(
        `UPDATE groupdata SET nsfw = true WHERE groupid = '${Bot.from}'`
      );
      client.sendMessage(from, Bot.mess.success, text, {
        quoted: Bot.reply,
      });
      return;
    } else {
      Bot.wrongCommand();
    }
  },
};
