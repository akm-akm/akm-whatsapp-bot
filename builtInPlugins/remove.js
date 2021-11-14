module.exports = {
    "name": 'remove',
    "usage": "remove <@user>",
  //  "desc": "Removes the tagged member from the group.",
    "eg": [
        "remove @ankit",
        "remove @dibyam"
    ],
    "group": true,
    "owner": false,
    async handle(Infor) {


        if (!isBotGroupAdmins) {
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

        Infor.client.groupRemove(Infor.from, mentioned);

        Infor.replytext(Infor.mess.success)

    }
}