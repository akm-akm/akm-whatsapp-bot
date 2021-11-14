
const {
    MessageType
} = require("../@adiwajshing/baileys");

module.exports = {
    "name": 'tagall',
    "usage": "tagall <text>",
    "desc": "Tags all the members in the group invisibely.",
    "eg": [
        "tagall class at 7am",
        "tagall holiday today"
    ],
    "group": true,
    "owner": false,
    async handle(Infor) {
        const memberslist = [];
        const arg = Infor.arg;
        if (arg.length > 1) {
            arg.shift();
            msg = "👋  ```" + arg.join(" ").charAt(0).toUpperCase() + arg.join(" ").slice(1) + "```";
        } else msg = "👋  ```Hello Everyone```";
        for (let member of Infor.groupMembers) {
            memberslist.push(member.jid);
        }
        Infor.client.sendMessage(Infor.from, msg, MessageType.extendedText, {
            quoted: Infor.reply,
            contextInfo: {
                mentionedJid: memberslist,
            },
        });
    }
}