module.exports = {
    name:"grouplink",
    "usage": "grouplink",
    "desc": "Creates a group invite link for the group.",
    "eg": [
        "grouplink"
    ],
    "group": true,
    "owner": false,
    async handle(Infor) {


        if (!Infor.isBotGroupAdmins) {
            Infor.replytext(Infor.mess.only.Badmin);
            return;
        }
        const grplink = await Infor.client.groupInviteCode(Infor.from);
        Infor.replytext("🤖 ```https://chat.whatsapp.com/```" + "```" + grplink + "```")





    }
}