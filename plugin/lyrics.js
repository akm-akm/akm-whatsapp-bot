const solenolyrics = require("solenolyrics");

module.exports = {
  name: "lyrics",
  usage: "lyrics <song>",
  desc: "Provides the lyrics of the given song.",
  eg: ["lyrics Brown munde", "lyrics Baby"],
  group: false,
  owner: false,
  async handle(Bot) {
    const arg = Bot.arg;

    if (arg.length == 1) {
      Bot.wrongCommand();
      return;
    }
    try {
      const lyrics = await solenolyrics.requestLyricsFor(
        arg.splice(1).join(" ")
      );
      Bot.replytext(lyrics);
    } catch (error) {
      Bot.errorlog(error);
    }
  },
};
