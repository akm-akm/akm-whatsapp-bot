const path = require("path");
const sql = require(path.join(__dirname, "./ps"));
const count= (infor) =>new Promise((resolve, reject) => {
  number=infor.number;
  no_of_msg_today=parseInt( infor.noofmsgtoday )+1 ;
  sql.query(`UPDATE messagecount SET totalmsgtoday = '${no_of_msg_today}' WHERE phonenumber ='${number}';`)
  resolve()
});
module.exports.count = count;
