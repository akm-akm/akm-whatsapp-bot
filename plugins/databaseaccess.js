const { MessageType } = require("@adiwajshing/baileys");
const { text } = MessageType;
const fs = require("fs");
const path = require("path");
const mess = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/warningmessages.json"))
);
const sql = require(path.join(__dirname, "../snippets/ps"));
const databaseaccess = (infor, client, xxx) =>
    new Promise(async (resolve, reject) => {
        console.log(process.env.OWNER_NUMBER);
        if (infor.number !== process.env.OWNER_NUMBER) {
            client.sendMessage(from, mess.only.ownerB, text, {
                quoted: xxx,
            });
            resolve();
            return;
        }
        let cmd = infor.arg.slice(1).join(" ");
        console.log(`Command: ${cmd}`);
        sql.query(cmd).then(result => {
            client.sendMessage(from, JSON.stringify(result.rows, null, "\t"), text, {
                quoted: xxx,
            });
            resolve();
        })
    })
 
module.exports.databaseaccess = databaseaccess;