const { MessageType } = require("../@adiwajshing/baileys");

module.exports = {
  name: "tagall",
  usage: "tagall <text>",
  desc: "Tags all the members in the group invisibely.",
  eg: ["tagall class at 7am", "tagall holiday today"],
  group: true,
  owner: false,
  async handle(Xxxbot) {
    const memberslist = [];
    const arg = Xxxbot.arg;
    if (arg.length > 1) {
      arg.shift();
      msg =
        "👋  ```" +
        arg.join(" ").charAt(0).toUpperCase() +
        arg.join(" ").slice(1) +
        "```";
    } else msg = "👋  ```Hello Everyone```";
    for (let member of Xxxbot.groupMembers) {
      memberslist.push(member.jid);
    }
    Xxxbot.client.sendMessage(Xxxbot.from, msg, MessageType.extendedText, {
      quoted: Xxxbot.reply,
      contextInfo: {
        mentionedJid: memberslist,
      },
    });
  },
};
