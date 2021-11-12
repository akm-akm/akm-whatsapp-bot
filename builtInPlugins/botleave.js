module.exports = {
    "name": 'botleave',
    "usage": "botleave",
    "desc": "The bot will leave the group.",
    "eg": [
        "botleave"
    ],
    "group": true,
    "owner": false,
    async handle(Infor) {



        await Infor.replytext("🤧 ```Bye, Miss you all ```");
        Infor.client.groupLeave(Infor.from);



    }
}