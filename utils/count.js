const path = require("path");
const sql = require(path.join(__dirname, "./ps"));
const count = (Xxxbot, credit = 1) =>
  new Promise(async (resolve, reject) => {
    const number = Xxxbot.number;
    const no_of_msg_today = Xxxbot.noofmsgtoday + 1 * credit;
    const totalmsg = Xxxbot.totalmsg + 1;
    const no_of_msg_today_group = Xxxbot.groupdata.totalmsgtoday + 1;
    const no_of_msg_group = Xxxbot.groupdata.totalmsg + 1;
    const no_of_msg_today_by_bot = Xxxbot.botdata.totalmsgtoday + 1;
    const no_of_msg_by_bot = Xxxbot.botdata.totalmsg + 1;
    await sql.query(
      `UPDATE messagecount SET totalmsgtoday = ${no_of_msg_today} , totalmsg = ${totalmsg} WHERE phonenumber ='${number}';`
    );
    await sql.query(
      `UPDATE botdata SET totalmsgtoday = ${no_of_msg_today_by_bot} , totalmsg = ${no_of_msg_by_bot};`
    );
    Xxxbot.from.endsWith("@g.us")
      ? sql.query(
          `UPDATE groupdata SET totalmsgtoday = ${no_of_msg_today_group} , totalmsg = ${no_of_msg_group} WHERE groupid ='${Xxxbot.from}';`
        )
      : 0;
    resolve();
  });
module.exports.count = count;
