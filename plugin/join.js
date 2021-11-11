const path = require("path");
const fs = require("fs");
const { help } = require(path.join(__dirname, "../utils/help"));
const mess = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/messages.json"))
);

module.exports = {
    "name": "invite",
    "usage": "invite <link>",
    "desc": "The bot will join the group with the invite link.",
    "eg": [
        "join "
    ],
    "group": false,
    async handle(Infor) {
        const arg = Infor.arg;

        if (arg.length == 1) {
            Infor.arg = ["help", arg[0]]
            help(Infor, client, Infor.reply, 1);
            return
        }
        if (!arg[1].includes("https://chat.whatsapp.com/")) {
            Infor.replytext(mess.error.invalid)
            return
        }
        try {
            await Infor.client.acceptInvite(arg[1].split(".com/")[1]);
            Infor.replytext(mess.success)
        } catch (error) {
            Infor.replytext(mess.error.error)


        }

    }
}