module.exports = {
    "name": 'autosticker',
    "usage": "autosticker <condition>",
    "desc": "Automatically makes sticker of any media sent in the group.",
    "eg": [
        "autosticker on",
        "autosticker off"
    ],
    "group": true,
    "owner": false,
    async handle(Infor) {



        const arg = Infor.arg;


        if (arg.length == 1) {
            Infor.wrongCommand()
            return;
        }
        if (arg[1] == "off") {
            sql.query(`UPDATE groupdata SET autosticker = false WHERE groupid = '${Infor.from}'`);
            Infor.replytext(Infor.mess.success);
            return;
        } else if (arg[1] == "on") {
            sql.query(`UPDATE groupdata SET autosticker = true WHERE groupid = '${Infor.from}'`);
            Infor.replytext(Infor.mess.success);
            return;
        } else {
            Infor.wrongCommand()

        }


    }
}