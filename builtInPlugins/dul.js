const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));

module.exports = {
  name: "dul",
  usage: "dul <number>",
  desc: "The bot will change the daily user limit.",
  eg: ["dul 50", "dul 100"],
  group: false,
  owner: true,
  async handle(Bot) {
    const arg = Bot.arg;

    if (arg.length == 1) {
      Bot.wrongCommand();

      return;
    }
    if ((typeof arg[1] !== "number" && arg[1] < 0) || arg[1] > 1000) {
      Bot.wrongCommand();

      return;
    }
    sql
      .query(`update botdata set dailylimit = '${arg[1]}'`)
      .then((result) => {
        Bot.replytext(Bot.mess.success);
      })
      .catch((err) => {
        Bot.replytext(Bot.mess.error.error);
      });
  },
};
