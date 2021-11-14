const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));

module.exports = {
  name: "dgl",
  usage: "dgl <number>",
  desc: "The bot will change the daily group limit.",
  eg: ["dgl 300", "dgl 200"],
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
      .query(`update botdata set dailygrouplimit = '${arg[1]}'`)
      .then(() => {
        Xxxbot.replytext(Xxxbot.mess.success);
      })
      .catch((err) => {
        Xxxbot.replytext(Xxxbot.mess.error.error);
      });
  },
};
