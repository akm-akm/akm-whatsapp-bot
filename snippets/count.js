const path = require("path");
const sql = require(path.join(__dirname, "./ps"));
const count = (infor, abused = 1) => new Promise(async (resolve, reject) => {
  number = infor.number;
  no_of_msg_today = infor.noofmsgtoday + (1 * abused);
  totalmsg = infor.totalmsg + 1;
  no_of_msg_today_group = infor.groupdata.totalmsgtoday + 1
  no_of_msg_group= infor.groupdata.totalmsg + 1;
  await sql.query(`UPDATE messagecount SET totalmsgtoday = ${no_of_msg_today} , totalmsg = ${totalmsg} WHERE phonenumber ='${number}';`)
  infor.from.endsWith("@g.us") ? sql.query(`UPDATE groupdata SET totalmsgtoday = ${no_of_msg_today_group} , totalmsg = ${no_of_msg_group} WHERE groupid ='${infor.from}';`):0
  resolve()
});
module.exports.count = count;
