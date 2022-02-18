const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));

module.exports = {
  name: "dgl",
  usage: "dgl <number>",
  desc: "The bot will change the daily group limit. The number should be between 1 and 10000.",
  eg: ["dgl 300", "dgl 200"],
  group: false,
  owner: true,
  async handle(Bot) {
    const arg = Bot.arg;

    if (arg.length == 1) {
      Bot.wrongCommand();

      return;
    }
    if ((typeof arg[1] !== "number" && arg[1] < 0) || arg[1] > 10000) {
      Bot.wrongCommand();
      return;
    }

    try {
      await sql.query(`update botdata set dailygrouplimit = '${arg[1]}'`);
      Bot.replytext(Bot.mess.success);
    } catch (error) {
      Bot.errorlog(error);
    }
  },
};
