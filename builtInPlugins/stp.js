const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));

module.exports = {
  name: "stp",
  usage: "stp",
  desc: "Stops the bot, To restart it you have to login to the bot website.",
  eg: ["stp"],
  group: false,
  owner: true,
  async handle(Bot) {
    await sql.query("update botdata set isconnected = false;");
    setTimeout(() => {
      Bot.client.ws.close();
      Bot.client.ev.removeAllListeners();
     // sql.query("DROP TABLE creds;");
      sql.query("UPDATE botdata SET isconnected = false;");
    }, 3000);
    Bot.replytext(Bot.mess.success);
  }
};
