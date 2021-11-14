const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));

module.exports = {
  name: "dul",
  usage: "dul <number>",
  desc: "The bot will change the daily user limit.",
  eg: ["dul 50", "dul 100"],
  group: false,
  owner: true,
  async handle(Infor) {
    const arg = Infor.arg;

    if (arg.length == 1) {
      Infor.wrongCommand();

      return;
    }
    if ((typeof arg[1] !== "number" && arg[1] < 0) || arg[1] > 1000) {
      Infor.wrongCommand();

      return;
    }
    sql
      .query(`update botdata set dailylimit = '${arg[1]}'`)
      .then((result) => {
        Infor.replytext(Infor.mess.success);
      })
      .catch((err) => {
        Infor.replytext(Infor.mess.error.error);
      });
  },
};
