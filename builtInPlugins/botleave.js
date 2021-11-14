module.exports = {
  name: "botleave",
  usage: "botleave",
  desc: "The bot will leave the group.",
  eg: ["botleave"],
  group: true,
  owner: false,
  async handle(Xxxbot) {
    await Xxxbot.replytext("🤧 ```Bye, Miss you all ```");
    Xxxbot.client.groupLeave(Xxxbot.from);
  },
};
