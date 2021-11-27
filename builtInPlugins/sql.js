const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));

module.exports = {
  name: "sql",
  usage: "sql <query>",
  desc: "The bot will perform the given sqlquery on its postgres databse.",
  eg: [
    "sql select * from groupdata;",
    "sql select * from messagecount;",
    "sql select * from botdata;",
    "sql update botdata set totalmessage = 0;",
  ],
  group: false,
  owner: true,
  async handle(Bot) {
    const arg = Bot.arg;
    if (arg.length == 1) {
      Bot.wrongCommand();
      return;
    }
    arg.shift();
    const cmd = arg.join(" ");

    sql
      .query(cmd)
      .then((result) => {
        Bot.replytext(JSON.stringify(result.rows, null, "\t"));
      })
      .catch((err) => {
        Bot.errorlog(err);
      });
  },
};
