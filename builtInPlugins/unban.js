const path = require('path');
const sql = require(path.join(__dirname, "../utils/ps"));

module.exports = {
    "name": 'unban',
    "usage": "unban <@user>",
    "desc": "Unbans the tagged user from using the bot in this group.",
    "eg": [
        "unban @ankit",
        "unban @dibyam",
        "unban @saket"
    ],
    "group": true,
    "owner": false,
    async handle(Infor) {

        const arg = Infor.arg;
        const from = Infor.from;
        if (arg.length == 1) {
            Infor.wrongCommand()
            return;
        }

        try {

            const mentioned = Infor.reply.message.extendedTextMessage.contextInfo.mentionedJid;

            if (!mentioned) {
                Infor.wrongCommand();
                return
            }
            const z = mentioned[0].split("@")[0];

            if (z === Infor.botNumber) {
                Infor.replytext(Infor.mess.error.error)
                return;
            }

            if (z == Infor.number) {
                Infor.replytext(Infor.mess.error.error)
                return;
            }
            sql.query(
                `UPDATE groupdata SET banned_users = array_remove(banned_users, '${z}') where groupid = '${from}';`
            );

            Infor.replytext(Infor.mess.success)


        } catch (error) {
            console.log(error);
            Infor.replytext(Infor.mess.error.error)
            Infor.errorlog()
        }
    }
}