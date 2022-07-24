const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));

module.exports = {
  name: "mgs",
  usage: "mgs <number>",
  desc: "The bot will change the minimum group size for the bot to work in it. The bot will not leave the group if the bot is already added to it.",
  eg: ["mgs 5", "mgs 10", "mgs 20"],
  group: false,
  owner: true,
  async handle(Bot) {
    try {
      const arg = Bot.arg;

      if (arg.length == 1) {
        Bot.wrongCommand();
        return;
      }
      if ((typeof arg[1] !== "number" && arg[1] < 0) || arg[1] > 1000) {
        Bot.wrongCommand();
        return;
      }
      await sql.query(`update botdata set mingroupsize = '${arg[1]}'`);
      Bot.replytext(Bot.mess.success);
    } catch (error) {
      Bot.errorlog(error);
    }
  }
};
