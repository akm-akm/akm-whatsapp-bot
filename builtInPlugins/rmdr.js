const path = require("path");
const sql = require(path.join(__dirname, "../utils/ps"));


module.exports = {
    "name": 'rmdr',
    "usage": "rmdr <@user>",
    "desc": "The bot will remove the tagged user a moderator of the bot.",
    "eg": [
        "rmdr @ankit",
        "rmdr @messi",
        "rmdr 15123479768"
    ],
    "group": false,
    "owner": true,
    async handle(Infor) {

        const arg = Infor.arg;


        if (arg.length == 1) {
            Infor.wrongCommand()
            return;
        }


        const number = arg[1].replace('@', '').replace('+', '');

        sql.query(
            `UPDATE botdata SET moderators = array_remove(moderators, '${number}');`)
            .then((result) => {
            Infor.replytext(Infor.mess.success);

        }).catch((err) => {
            Infor.replytext(Infor.mess.error.error);

        });





    }
}