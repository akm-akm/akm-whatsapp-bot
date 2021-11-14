const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));

module.exports = {
  name: "mgs",
  usage: "mgs <number>",
  desc: "The bot will change the minimum group size for the bot to work in it.",
  eg: ["mgs 5", "mgs 10", "mgs 20"],
  group: false,
  owner: true,
  async handle(Xxxbot) {
    const arg = Xxxbot.arg;

    if (arg.length == 1) {
      Xxxbot.wrongCommand();

      return;
    }
    if ((typeof arg[1] !== "number" && arg[1] < 0) || arg[1] > 1000) {
      Xxxbot.wrongCommand();

      return;
    }
    sql
      .query(`update botdata set mingroupsize = '${arg[1]}'`)
      .then((result) => {
        Xxxbot.replytext(Xxxbot.mess.success);
      })
      .catch((err) => {
        Xxxbot.replytext(Xxxbot.mess.error.error);
      });
  },
};
