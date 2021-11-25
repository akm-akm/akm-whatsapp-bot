module.exports = {
  name: "botleave",
  usage: "botleave",
  desc: "The bot will leave the group.",
  eg: ["botleave"],
  group: true,
  owner: false,
  async handle(Bot) {
    await Bot.replytext("🤧 ```Bye, Miss you all ```");
    Bot.client.groupLeave(Bot.from);
  },
};
