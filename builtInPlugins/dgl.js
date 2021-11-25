const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));

module.exports = {
  name: "dgl",
  usage: "dgl <number>",
  desc: "The bot will change the daily group limit.",
  eg: ["dgl 300", "dgl 200"],
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
      .query(`update botdata set dailygrouplimit = '${arg[1]}'`)
      .then(() => {
        Bot.replytext(Bot.mess.success);
      })
      .catch((err) => {
        Bot.replytext(Bot.mess.error.error);
      });
  },
};
