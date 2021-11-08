const path = require("path");
const fs = require('fs');
const { count } = require(path.join(__dirname, "./count"));
const mess = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/messages.json"))
);



const chalk = require('chalk');
const sql = require(path.join(__dirname, "./ps"));
const commandHandler = new Map();
const plugins = fs.readdirSync(path.join(__dirname, '../plugin')).filter((file) => file.endsWith('.js'))
for (let file of plugins) {
    try {
        const command = require(path.join(__dirname, '../plugin/', `${file}`));

        console.log(
            chalk.magentaBright("Successfully imported module"),
            chalk.cyanBright.bold(`${file}`,)
        )
        commandHandler.set(command.name, command);
    } catch (error) {
        console.log(
            chalk.blueBright.bold("Could not import module"),
            chalk.redBright.bold(`${file}`)
        )
        console.log(`[ERROR] `, error);
        continue;
    }
}

exports.messagehandler = async (Infor, client) => {



    if (!(!Infor.isGroup || (Infor.isGroup && (Infor.groupdata.totalmsgtoday <= Infor.botdata.dailygrouplimit)) &&
        (Infor.arg.length !== 0 || (Infor.isGroup && Infor.isMedia && Infor.groupdata.autosticker)))
    ) return
    if (Infor.isGroup && Infor.groupdata.banned_users.includes(Infor.number)) return
    if (Infor.isGroup && Infor.groupdata.membercanusebot === false && !Infor.isGroupAdmins && Infor.number !== process.env.OWNER_NUMBER && !Infor.botdata.moderators.includes(Infor.number)) return
    if (Infor.arg[0] === "limit") {
        const x =
            mess.limit + Infor.noofmsgtoday + " / *" + Infor.botdata.dailylimit + "*";
        client.sendMessage(Infor.from, x, text, {
            quoted: Infor.reply
        });
        return;
    }
    if (
        Infor.noofmsgtoday >= Infor.botdata.dailylimit &&
        Infor.number !== process.env.OWNER_NUMBER &&
        !Infor.botdata.moderators.includes(Infor.number) &&
        Infor.dailylimitover === false
    ) {
        sql.query(`UPDATE messagecount SET dailylimitover = true WHERE phonenumber ='${Infor.number}';`)
        client.sendMessage(Infor.sender, mess.userlimit, text, {
            quoted: xxx5,
        });
        return
    }
    if (Infor.dailylimitover === true) return
    if (Infor.isGroup && Infor.groupdata.totalmsgtoday >= Infor.botdata.dailygrouplimit) {
        client.sendMessage(Infor.from, mess.grouplimit, text);
        count(Infor)
        return
    }

    const command = commandHandler.get(Infor.arg[0]);

    command.handle(Infor, client)
        .then((result) => {
        count(Infor)
    }).catch((err) => {
        
    });

}