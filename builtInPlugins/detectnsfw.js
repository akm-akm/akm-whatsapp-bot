module.exports = {
  name: "detectnsfw",
  usage: "detectnsfw <condition>",
  desc: "If it is turned on, the bot will scan the image for nudity before converting it to sticker in the group.",
  eg: ["detectnsfw on", "detectnsfw off"],
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
        `UPDATE groupdata SET nsfw = false WHERE groupid = '${Xxxbot.from}'`
      );
      client.sendMessage(from, Xxxbot.mess.success, text, {
        quoted: Xxxbot.reply,
      });
      return;
    } else if (arg[1] == "on") {
      sql.query(
        `UPDATE groupdata SET nsfw = true WHERE groupid = '${Xxxbot.from}'`
      );
      client.sendMessage(from, Xxxbot.mess.success, text, {
        quoted: Xxxbot.reply,
      });
      return;
    } else {
      Xxxbot.wrongCommand();
    }
  },
};
