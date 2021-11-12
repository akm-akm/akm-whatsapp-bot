
module.exports = {
    "name": "invite",
    "usage": "invite <link>",
    "desc": "The bot will join the group with the invite link.",
    "eg": [
        "join "
    ],
    "group": false,
    "owner": false,
    async handle(Infor) {
        const arg = Infor.arg;

        if (arg.length == 1) {
            Infor.wrongCommand()

            return
        }
        if (!arg[1].includes("https://chat.whatsapp.com/")) {
            Infor.replytext(Infor.mess.error.invalid)
            return
        }
        try {
            await Infor.client.acceptInvite(arg[1].split(".com/")[1]);
            Infor.replytext(Infor.mess.success)
        } catch (error) {
            Infor.replytext(Infor.mess.error.error)


        }

    }
}