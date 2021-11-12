module.exports = {
    "name": 'detectnsfw',
    "usage": "detectnsfw <condition>",
    "desc": "If it is turned on, the bot will scan the image for nudity before converting it to sticker in the group.",
    "eg": [
        "detectnsfw on",
        "detectnsfw off"
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
            sql.query(`UPDATE groupdata SET nsfw = false WHERE groupid = '${Infor.from}'`);
            client.sendMessage(from, Infor.mess.success, text, {
                quoted: Infor.reply,
            });
            return;
        } else if (arg[1] == "on") {
            sql.query(`UPDATE groupdata SET nsfw = true WHERE groupid = '${Infor.from}'`);
            client.sendMessage(from, Infor.mess.success, text, {
                quoted: Infor.reply,
            });
            return;
        } else {
            Infor.wrongCommand()
        }













    }
}