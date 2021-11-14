const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));

module.exports = {
  name: "rst",
  usage: "rst",
  desc: "The bot will reset daily session. Daily credits will be reset back to 0.",
  eg: ["rst"],
  group: false,
  owner: true,
  async handle(Xxxbot) {
    sql.query("UPDATE groupdata SET totalmsgtoday=0;");
    sql.query("UPDATE botdata SET totalmsgtoday=0;");
    sql.query("UPDATE messagecount SET totalmsgtoday=0,dailylimitover=false;");
    Xxxbot.replytext(Xxxbot.mess.success);
  },
};
