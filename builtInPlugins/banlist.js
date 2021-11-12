module.exports = {
    "name": 'banlist',
    "usage": "banlist",
    "desc": "Displays the list of members banned from using the bot in this group.",
    "eg": [
        "banlist"
    ],
    "group": true,
    "owner": false,
    async handle(Infor) {
        const bannedlist = Infor.groupdata.banned_users;
        if (bannedlist.length == 1) {
            Infor.replytext("🤖 *No users banned*")
        } else {
            let msg = "🤖 *Users banned:*\n";
            bannedlist.shift()
            bannedlist.forEach((currentItem) => {
                msg += "\n🚨 " + currentItem;
            });
            Infor.replytext(msg);
        }
    }
}