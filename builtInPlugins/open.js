

const {
    GroupSettingChange,
} = require("@adiwajshing/baileys");

module.exports = {
    name: "open",
    "usage": "open",
    "desc": "Changes the setting so that members can message.",
    "eg": [
        "open"
    ],
    "group": true,
    "owner": false,
    async handle(Infor) {

        if (!Infor.isBotGroupAdmins) {
            Infor.replytext(Infor.mess.only.Badmin);

            return;
        }

        Infor.client.groupSettingChange(Infor.from, GroupSettingChange.messageSend, false);

        Infor.replytext(Infor.mess.success);





    }
}