module.exports = {
  name: "tagall",
  usage: "tagall <text>",
  desc: "Tags all the members in the group invisibely.",
  eg: ["tagall class at 7am", "tagall holiday today"],
  group: true,
  owner: false,
  async handle(Bot) {
    try {
      const memberslist = [];
      const arg = Bot.arg;
      let msg;
      if (arg.length > 1) {
        arg.shift();
        msg =
          "👋  ```" +
          arg.join(" ").charAt(0).toUpperCase() +
          arg.join(" ").slice(1) +
          "```";
      } else msg = "👋  ```Hello Everyone```";
      for (let member of Bot.groupMembers) {
        memberslist.push(member.id);
      }
      Bot.client.sendMessage(
        Bot.from,
        { text: msg, mentions: memberslist },
        {
          quoted: Bot.reply
        }
      );
    } catch (error) {
      Bot.errorlog(error);
    }
  }
};
