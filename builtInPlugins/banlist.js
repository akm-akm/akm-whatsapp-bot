module.exports = {
  name: "banlist",
  usage: "banlist",
  desc: "Displays the list of members banned from using the bot in this group.",
  eg: ["banlist"],
  group: true,
  owner: false,
  async handle(Bot) {
    try {
      const bannedlist = Bot.groupdata.banned_users;
      if (bannedlist.length == 1) {
        Bot.replytext("🤖 *No users banned*");
      } else {
        let msg = "🤖 *Users banned:*\n";
        bannedlist.shift();
        bannedlist.forEach((currentItem) => {
          msg += "\n🚨 " + currentItem;
        });
        Bot.replytext(msg);
      }
    } catch (error) {
      Bot.replytext(Bot.mess.error.error);
    }
  }
};
