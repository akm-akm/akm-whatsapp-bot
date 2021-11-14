module.exports = {
  name: "grouplink",
  usage: "grouplink",
  desc: "Creates a group invite link for the group.",
  eg: ["grouplink"],
  group: true,
  owner: false,
  async handle(Xxxbot) {
    if (!Xxxbot.isBotGroupAdmins) {
      Xxxbot.replytext(Xxxbot.mess.only.Badmin);
      return;
    }
    const grplink = await Xxxbot.client.groupInviteCode(Xxxbot.from);
    Xxxbot.replytext(
      "🤖 ```https://chat.whatsapp.com/```" + "```" + grplink + "```"
    );
  },
};
