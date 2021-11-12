module.exports = {
    "name": 'demote',
    "usage": "demote <@user>",
    "desc": "Demotes the tagged member from admin.",
    "eg": [
        "demote @ankit",
        "demote @dibyam"
    ],
    "group": true,
    "owner": false,
    async handle(Infor) {





        if (!Infor.isBotGroupAdmins) {
            Infor.replytext(Infor.mess.only.Badmin);

            return;
        }
        if (arg.length == 1) {
            Infor.wrongCommand()
            return;

        }



        const mentioned = Infor.reply.message.extendedTextMessage.contextInfo.mentionedJid;

        if (!mentioned) {
            Infor.wrongCommand();
            return
        }
        const z = mentioned[0].split("@")[0];
        if (z === `${Infor.client.user.jid}`.split("@")[0]) {
            Infor.replytext(Infor.mess.error.error)
            return;
        }
        if (z === isSuperAdmin) {
            Infor.replytext(Infor.mess.error.error)

            return
        }
       
        Infor.client.groupDemoteAdmin(Infor.from, mentioned);

        Infor.replytext(Infor.mess.success)











    }
}