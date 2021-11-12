module.exports = {
    "name": 'promote',
    "usage": "promote <@user>",
    "desc": "Promotes the tagged member as an admin.",
    "eg": [
        "promote @ankit",
        "promote @dibyam"
    ],
    "group": true,
    "owner": false,
    async handle(Infor) {





        if (!Infor.isBotGroupAdmins) {
            Infor.replytext(Infor.mess.only.Badmin);

            return;
        }
        if (Infor.arg.length == 1) {
            Infor.wrongCommand()
            return;

        }


        const mentioned = Infor.taggedUser;

        if (!mentioned) {
            Infor.wrongCommand();
            return
        }
        const z = mentioned[0].split("@")[0];
        if (z == Infor.botNumber) {
            Infor.replytext(Infor.mess.error.error)
            return;
        }
       

        Infor.client.groupMakeAdmin(Infor.from, mentioned);

        Infor.replytext(Infor.mess.success)




    }
}