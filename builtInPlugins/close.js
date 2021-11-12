

const {
    GroupSettingChange,
} = require("@adiwajshing/baileys");

module.exports = {
    "name": 'close',
    "usage": "close",
    "desc": "Changes the setting so that only admins can message.",
    "eg": [
        "close"
    ],
    "group": true,
    "owner": false,
    async handle(Infor) {
        if (!Infor.isBotGroupAdmins) {
            Infor.replytext(Infor.mess.only.Badmin);
            return;
        }
        Infor.client.groupSettingChange(Infor.from, GroupSettingChange.messageSend, true);
        Infor.replytext(Infor.mess.success);
    }
}