const fs = require("fs");
const path = require("path");
const sql = require(path.join(__dirname, "./snippets/ps"));

const node_cron = require("node-cron");


sql.query('\d;').then((result) => {
   console.log(result)
  }).catch((err) => {
    console.log(err)
  });

  
if (process.env.CRON) {
  if (!node_cron.default.validate(process.env.CRON))
    return console.log(`Invalid Cron String: ${process.env.CRON}`);
  console.log(`Cron Job for clearing all chats is set for ${process.env.CRON}`);
  node_cron.default.schedule(process.env.CRON, () => {
    sql.query(
      `UPDATE messagecount set totalmsgtoday='0';`
    );
    console.log("Clearing All Chats...");
    client.modifyAllChats("clear");
    console.log("Cleared all Chats!");
  });
}
