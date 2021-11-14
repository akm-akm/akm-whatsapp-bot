const path = require("path");
const fs = require('fs');
const { count } = require(path.join(__dirname, "./count"));

const chalk = require('chalk');
const sql = require(path.join(__dirname, "./ps"));

const commandHandler = new Map();
const plugins = fs.readdirSync(path.join(__dirname, '../plugin'))
for (let file of plugins) {


    const command = require(path.join(__dirname, '../plugin/', `${file}`));
    if (command.name && command.usage && command.desc && typeof command.handle === "function" && command.eg && typeof command.group === "boolean" && typeof command.owner === "boolean") {
        commandHandler.set(command.name, command);
    }
}
const builtInPlugins = fs.readdirSync(path.join(__dirname, '../builtInPlugins'))
for (let file of builtInPlugins) {
    const command = require(path.join(__dirname, '../builtInPlugins/', `${file}`));
    if (command.name && command.usage && command.desc && typeof command.handle === "function" && command.eg && typeof command.group === "boolean" && typeof command.owner === "boolean") {
        commandHandler.set(command.name, command);
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
    if (Infor.isGroup && Infor.groupdata.membercanusebot === false && !Infor.isGroupAdmins) return



    /* This line checks the following-
    (is the message sent 'limit' ?)
    If yes then send back the credits used
    */
    if (Infor.arg[0] === "limit") {
        const x =
            Infor.mess.limit + Infor.noofmsgtoday + " / *" + Infor.botdata.dailylimit + "*";
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
        !Infor.botdata.moderators.includes(Infor.number) &&
        Infor.dailylimitover === false
    ) {
        sql.query(`UPDATE messagecount SET dailylimitover = true WHERE phonenumber ='${Infor.number}';`)
        Infor.replytext(Infor.mess.userlimit)
    }



    /* This line checks the following-
    (IS the daily limit over?)
    If yes then return
    */
    if (Infor.dailylimitover === true) return




    if (Infor.isGroup && Infor.groupdata.totalmsgtoday >= Infor.botdata.dailygrouplimit) {
        Infor.text(Infor.mess.grouplimit);
        count(Infor);
        return
    }

    console.log("🤖  " + chalk.bgRed("[" + Infor.number + ']') + "  " + chalk.bgGreen("[" + Infor.isGroup?Infor.groupName:"INBOX" + ']') + "  " + chalk.bgBlue("[" + Infor.arg.slice(0, 6).join(" ") + ']'));


    if (Infor.abusepresent.length != 0 && !Infor.isBotModerator) {
        Infor.replytext("⚠️  ```" + Infor.abusepresent.join(" ") + "```")
        count(Infor)
        return;
    }


    if (Infor.isGroup && Infor.groupdata.autosticker && Infor.isMedia && Infor.arg[0] !== "sticker" && Infor.arg[0] !== "testnsfw") {
        commandHandler.get('sticker').handle(Infor);
        count(Infor)
        return;
    }


    if (Infor.arg == "hi" || Infor.arg == "hey" || Infor.arg == "hello" || Infor.arg == "helloo" || Infor.arg == "hellooo" || Infor.arg == "hii" || Infor.arg == "hiii" || Infor.arg == "heyy" || Infor.arg == "heyyy" ) {
        Infor.replytext(Infor.mess.salutations[Math.floor(Math.random() * Infor.mess.salutations.length)])
        count(Infor);
        return;
    }



    if (commandHandler.has(Infor.arg[0])) {

        if (commandHandler.get(Infor.arg[0]).owner && Infor.isOwner) {
            Infor.replytext(Infor.mess.only.ownerB);
            count(Infor);
            return
        } else if (commandHandler.get(Infor.arg[0]).owner && Infor.isOwner) {
            commandHandler.get(Infor.arg[0]).handle(Infor);
            count(Infor);
            return
        } else if (commandHandler.get(Infor.arg[0]).group && (!Infor.isGroup)) {
            Infor.replytext(Infor.mess.only.group);
            count(Infor);
            return;
        } else if (commandHandler.get(Infor.arg[0]).group && Infor.isGroup && !Infor.isGroupAdmins) {
            Infor.replytext(Infor.mess.only.admin);
            count(Infor);
        } else if (commandHandler.get(Infor.arg[0]).group && Infor.isGroup && Infor.isGroupAdmins) {
            commandHandler.get(Infor.arg[0]).handle(Infor);
            count(Infor);

        } else {
            commandHandler.get(Infor.arg[0]).handle(Infor);
            count(Infor);
            return;
        }
    } else if ((Infor.isGroup && Infor.groupdata.useprefix) || !Infor.isGroup) {
        Infor.replytext(Infor.mess.unknowncommand);
        count(Infor);
    }

}