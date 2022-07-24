module.exports = {
  name: "detectnsfw",
  usage: "detectnsfw <condition>",
  desc: "If it is turned on, the bot will scan the image for nudity before converting it to sticker in the group. If it detects 50% or more of the image is nsfw, it will not convert it to sticker.",
  eg: ["detectnsfw on", "detectnsfw off"],
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
        sql.query(
          `UPDATE groupdata SET nsfw = false WHERE groupid = '${Bot.from}'`
        );
        Bot.repytext(Bot.mess.success);
        return;
      } else if (arg[1] == "on") {
        sql.query(
          `UPDATE groupdata SET nsfw = true WHERE groupid = '${Bot.from}'`
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
