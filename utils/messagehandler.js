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
        commandHandler.set(command.name, command);
    } catch (error) {
        console.log(
            chalk.blueBright.bold("Could not import plugin  "),
            chalk.redBright.bold(`${file}`)
        )
        console.log(`[ERROR] `, error);
        continue;
    }
}

exports.messagehandler = async (Infor) => {




    /* This line checks the following- 
    (If the message is sent in a group, is the group limit exhausted ?) return
    (Is the message sent in the group more than a word?) continue
    (Is the message sent in a group a media and the autosticker feature turned on?) continue
    */
    if (!(!Infor.isGroup || (Infor.isGroup && (Infor.groupdata.totalmsgtoday <= Infor.botdata.dailygrouplimit)) &&
        (Infor.arg.length !== 0 || (Infor.isGroup && Infor.isMedia && Infor.groupdata.autosticker)))
    ) return



    /* This line checks the following-
    (is the message sent in a group?) and
    (is the user sending the message banned in that group to use the bot?)
    If yes then return
    */
    if (Infor.isGroup && Infor.groupdata.banned_users.includes(Infor.number)) return



    /* This line checks the following-
    (is the message sent in a group?) and
    (Can non admins use the bot in the group?)
    (If non admins cannot use the bot then is the sender an admin or a bot moderator?)
    If yes then continue
    */
    if (Infor.isGroup && Infor.groupdata.membercanusebot === false && !Infor.isGroupAdmins && Infor.number !== process.env.OWNER_NUMBER && !Infor.botdata.moderators.includes(Infor.number)) return



    /* This line checks the following-
    (is the message sent 'limit' ?)
    If yes then send back the credits used
    */
    if (Infor.arg[0] === "limit") {
        const x =
            mess.limit + Infor.noofmsgtoday + " / *" + Infor.botdata.dailylimit + "*";
        Infor.replytext(x)
        return;
    }



    /* This line checks the following-
    (IS the number of message sent by the bot less than the daily limit) and
    (the sender is not bot moderator) and
    (the sender is not the owner) and
    (Daily limity is not over)
    If yes then continue
    */
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



    /* This line checks the following-
    (IS the daily limit over?)
    If yes then return
    */
    if (Infor.dailylimitover === true) return




    if (Infor.isGroup && Infor.groupdata.totalmsgtoday >= Infor.botdata.dailygrouplimit) {
        client.sendMessage(Infor.from, mess.grouplimit, text);
        count(Infor)
        return
    }
    console.log("🤖  " + chalk.bgRed("[" + Infor.number + ']') + "  " + chalk.bgGreen("[" + Infor.groupName + ']') + "  " + chalk.bgBlue("[" + Infor.arg.slice(0, 6).join(" ") + ']'));

    commandHandler.has(Infor.arg[0]) ? commandHandler.get(Infor.arg[0]).handle(Infor) : "";

}