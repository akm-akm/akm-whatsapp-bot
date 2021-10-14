const path = require("path");
const sql = require(path.join(__dirname, "./ps"));
const count = (infor, credit = 1) => new Promise(async (resolve, reject) => {
  const number = infor.number;
  const no_of_msg_today = infor.noofmsgtoday + (1 * credit);
  const totalmsg = infor.totalmsg + 1;
  const no_of_msg_today_group = infor.groupdata.totalmsgtoday+1;
  const no_of_msg_group = infor.groupdata.totalmsg + 1;
  const no_of_msg_today_by_bot = infor.botdata.totalmsgtoday + 1
  const no_of_msg_by_bot = infor.botdata.totalmsg + 1
  await sql.query(`UPDATE messagecount SET totalmsgtoday = ${no_of_msg_today} , totalmsg = ${totalmsg} WHERE phonenumber ='${number}';`)
  await sql.query(`UPDATE botdata SET totalmsgtoday = ${no_of_msg_today_by_bot} , totalmsg = ${no_of_msg_by_bot};`)
  infor.from.endsWith("@g.us") ? sql.query(`UPDATE groupdata SET totalmsgtoday = ${no_of_msg_today_group} , totalmsg = ${no_of_msg_group} WHERE groupid ='${infor.from}';`) : 0
  resolve()
});
module.exports.count = count;
