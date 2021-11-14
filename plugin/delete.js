module.exports = {
  name: "delete",
  usage: "delete",
  desc: "The bot will delete the tagged message.",
  eg: ["delete"],
  group: false,
  owner: false,
  async handle(Infor) {
    if (!Infor.stanzaId) {
      Infor.wrongCommand();
      return;
    }
    try {
      await Infor.client.deleteMessage(Infor.from, {
        id: Infor.stanzaId,
        remoteJid: Infor.from,
        fromMe: true,
      });
    } catch (error) {
      Infor.replytext(Infor.mess.error.error);
    }
  },
};
