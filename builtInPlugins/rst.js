const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));
const sqlc = require(path.join(__dirname, "./sql"));
module.exports = {
  name: "rst",
  usage: "rst",
  desc: "The bot will reset daily session. Daily credits will be reset back to 0.",
  eg: ["rst"],
  group: false,
  owner: true,
  async handle(Bot) {
    try {
      console.log("resest");
      Bot.arg = "sql UPDATE groupdata SET totalmsgtoday = 0".split(" ");
      sqlc.handle(Bot);
      Bot.arg = "sql UPDATE botdata SET totalmsgtoday = 0".split(" ");
      sqlc.handle(Bot);
      Bot.arg =
        "sql UPDATE messagecount SET totalmsgtoday = 0, dailylimitover = false".split(
          " "
        );
      sqlc.handle(Bot);

      //  Bot.replytext(Bot.mess.success);
    } catch (error) {
      Bot.errorlog(error);
    }
  }
};
