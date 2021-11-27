const path = require("path");
const sql = require(path.join(__dirname, "./ps"));
const count = async (Bot, credit = 1) => {
  const number = Bot.number;
  const no_of_msg_today = Bot.noofmsgtoday + 1 * credit;
  const totalmsg = Bot.totalmsg + 1;
  const no_of_msg_today_group = Bot.groupdata.totalmsgtoday + 1;
  const no_of_msg_group = Bot.groupdata.totalmsg + 1;
  const no_of_msg_today_by_bot = Bot.botdata.totalmsgtoday + 1;
  const no_of_msg_by_bot = Bot.botdata.totalmsg + 1;
  await sql.query(
    `UPDATE messagecount SET totalmsgtoday = ${no_of_msg_today} , totalmsg = ${totalmsg} WHERE phonenumber ='${number}';`
  );
  await sql.query(
    `UPDATE botdata SET totalmsgtoday = ${no_of_msg_today_by_bot} , totalmsg = ${no_of_msg_by_bot};`
  );
  Bot.isGroup
    ? sql.query(
        `UPDATE groupdata SET totalmsgtoday = ${no_of_msg_today_group} , totalmsg = ${no_of_msg_group} WHERE groupid ='${Bot.from}';`
      )
    : 0;
};
module.exports.count = count;
