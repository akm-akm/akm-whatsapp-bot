const solenolyrics = require("solenolyrics");

module.exports = {
  name: "lyrics",
  usage: "lyrics <song>",
  desc: "Provides the lyrics of the given song.",
  eg: ["lyrics Brown munde", "lyrics Baby"],
  group: false,
  owner: false,
  handle(Xxxbot) {
    const arg = Xxxbot.arg;

    if (arg.length == 1) {
      Xxxbot.wrongCommand();

      return;
    }

    solenolyrics
      .requestLyricsFor(arg.splice(1).join(" "))
      .then(async (lyrics) => {
        Xxxbot.replytext(lyrics);
      })
      .catch((e) => Xxxbot.replytext(Xxxbot.mess.error.error));
  },
};
