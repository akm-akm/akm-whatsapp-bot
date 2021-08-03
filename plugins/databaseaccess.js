const { MessageType } = require("@adiwajshing/baileys");
const { text } = MessageType;
const ownerNumber = [`${process.env.ownerNumber}@s.whatsapp.net`];
const mess = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/warningmessages.json"))
);
const sql = require(path.join(__dirname, "../snippets/ps"));

const databaseaccess = (infor, client, xxx) =>
    new Promise(async (resolve, reject) => {
        const isOwner = ownerNumber.includes(infor.sender);
        if (!isOwner) {
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