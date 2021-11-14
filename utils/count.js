const path = require("path");
const sql = require(path.join(__dirname, "./ps"));
const count = (Infor, credit = 1) =>
  new Promise(async (resolve, reject) => {
    const number = Infor.number;
    const no_of_msg_today = Infor.noofmsgtoday + 1 * credit;
    const totalmsg = Infor.totalmsg + 1;
    const no_of_msg_today_group = Infor.groupdata.totalmsgtoday + 1;
    const no_of_msg_group = Infor.groupdata.totalmsg + 1;
    const no_of_msg_today_by_bot = Infor.botdata.totalmsgtoday + 1;
    const no_of_msg_by_bot = Infor.botdata.totalmsg + 1;
    await sql.query(
      `UPDATE messagecount SET totalmsgtoday = ${no_of_msg_today} , totalmsg = ${totalmsg} WHERE phonenumber ='${number}';`
    );
    await sql.query(
      `UPDATE botdata SET totalmsgtoday = ${no_of_msg_today_by_bot} , totalmsg = ${no_of_msg_by_bot};`
    );
    Infor.from.endsWith("@g.us")
      ? sql.query(
          `UPDATE groupdata SET totalmsgtoday = ${no_of_msg_today_group} , totalmsg = ${no_of_msg_group} WHERE groupid ='${Infor.from}';`
        )
      : 0;
    resolve();
  });
module.exports.count = count;
