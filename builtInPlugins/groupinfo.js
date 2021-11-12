const http = require('http');

module.exports = {
    "name": 'groupinfo',
    "usage": "groupinfo",
    "desc": "Provides all the information about setting of the group.",
    "eg": [
        "groupinfo"
    ],
    "group": true,
    "owner": false,
    async handle(Infor) {






        const grpdata =
            "\n💮 *Title* : " + "*" + Infor.groupMetadata.subject + "*" +
            "\n\n🏊 *Member* : " + "```" + Infor.groupMetadata.participants.length + "```" +
            "\n🏅 *Admins*  : " + "```" + Infor.groupAdmins.length + "```" +
            "\n🎀 *Prefix*      : " + "```" + Infor.groupdata.prefix + "```" +
            "\n💡 *Useprefix*        : " + "```" + Infor.groupdata.useprefix + "```" +
            "\n🐶 *Autosticker*    : " + "```" + Infor.groupdata.autosticker + "```" +
            "\n🤖 *Botaccess*      : " + "```" + Infor.groupdata.membercanusebot + "```" +
            "\n🌏 *Filterabuse*     : " + "```" + Infor.groupdata.allowabuse + "```" +
            "\n⚠️ *NSFW detect*  : " + "```" + Infor.groupdata.nsfw + "```" +
            "\n🎫 *Credits used*  : " + "```" + Infor.groupdata.totalmsgtoday + "```" +
            "\n🧶 *Total credits*  : " + "```" + Infor.botdata.dailygrouplimit + "```" +
            "\n🚨 *Banned users* : " + "```" + (Number(Infor.groupdata.banned_users.length) - 1) + "```\n";



        try {

            const ppUrl = await Infor.client.getProfilePicture(from);
            ran = getRandom(".jpeg");
            const file = fs.createWriteStream(ran);
            http.get(ppUrl, function (response) {

                response.pipe(file);
                file.on("finish", function () {
                    file.close(async () => {
                        await Infor.replyimage(ran, grpdata)
                        fs.unlinkSync(ran);
                    })
                });
            })

        } catch (error) {

            Infor.replytext(grpdata)

        }





    }
}