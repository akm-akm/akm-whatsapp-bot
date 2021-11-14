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
  async handle(Infor) {
    const arg = Infor.arg;
    if (arg.length == 1) {
      Infor.wrongCommand();
      return;
    }
    arg.shift();
    const cmd = arg.join(" ");

    sql
      .query(cmd)
      .then((result) => {
        Infor.replytext(JSON.stringify(result.rows, null, "\t"));
      })
      .catch((err) => {
        Infor.replytext(Infor.mess.error.error);
      });
  },
};
