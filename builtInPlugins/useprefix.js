module.exports = {
    "name": 'prefix',
    "usage": "prefix <condition>",
    "desc": "If you want to use the bot without a prefix then turn this off.",
    "eg": [
        "prefix on",
        "prefix off"
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
            sql.query(`UPDATE groupdata SET useprefix = false WHERE groupid = '${Infor.from}'`);
            Infor.replytext(Infor.mess.success);
            return;
        } else if (arg[1] == "on") {
            sql.query(`UPDATE groupdata SET useprefix = true WHERE groupid = '${Infor.from}'`);
            Infor.replytext(Infor.mess.success);
            return;
        } else {
            Infor.wrongCommand()

        }


    }
}