module.exports = {
  name: "rtrt",
  usage: "rtrt",
  desc: "The bot will restart in a minute.",
  eg: ["rtrt"],
  group: false,
  owner: true,
  async handle(Bot) {
    setInterval(() => {
      process.exit(0);
    }, 1000);
    Bot.replytext(Bot.mess.success);
  },
};
