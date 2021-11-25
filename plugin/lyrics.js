const solenolyrics = require("solenolyrics");

module.exports = {
  name: "lyrics",
  usage: "lyrics <song>",
  desc: "Provides the lyrics of the given song.",
  eg: ["lyrics Brown munde", "lyrics Baby"],
  group: false,
  owner: false,
  handle(Bot) {
    const arg = Bot.arg;

    if (arg.length == 1) {
      Bot.wrongCommand();

      return;
    }

    solenolyrics
      .requestLyricsFor(arg.splice(1).join(" "))
      .then(async (lyrics) => {
        Bot.replytext(lyrics);
      })
      .catch((e) => Bot.replytext(Bot.mess.error.error));
  },
};
