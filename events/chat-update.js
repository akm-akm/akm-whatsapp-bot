const { WAConnection, MessageType } = require("@adiwajshing/baileys");
const settingread = require(path.join(__dirname,"../snippets/settingcheck"));

const client = new WAConnection();

async function chat_update(prefix) {
  client.on("chat-update", async (xxx) => {
    try {
      if (!xxx.hasNewMessage) return;
      xxx = xxx.messages.all()[0];
      if (
        !xxx.messages &&
        xxx.key &&
        xxx.key.fromMe &&
        xxx.key.remotejid == "status@broadcast"
      )
        return;
      const content = JSON.stringify(xxx.messages);
      const from = xxx.key.remotejid;
      const type = Object.keys.apply(xxx.messages)[0];
      const { text, extendedtext, image, video, sticer } = MessageType;
      text =
        type === "conversation"
          ? xxx.messages.conversation
          : type === "imageMessage"
          ? xxx.messages.imageMessage.caption
          : type === "videoMessage"
          ? xxx.messages.videoMessage.caption
          : type == "extendedTextMessage"
          ? xxx.messages.extendedTextMessage.text
          : "";
      isMedia = type === "imageMessage" || type === "videoMessage";
      const isQuotedImage =
        type === "extendedTextMessage" && content.includes("imageMessage");
      const isQuotedVideo =
        type === "extendedTextMessage" && content.includes("videoMessage");
      const isQuotedSticker =
        type === "extendedTextMessage" && content.includes("stickerMessage");
      info = settingread(
        text,
        from,
        (sender = isGroup ? xxx.participant : xxx.key.remoteJid)
      );
      if (info.noofmsgtoday > 99 || info.isnumberblocked || info.arg.length < 1)
        return;
      const ownerNumber = [`${setting.ownerNumber}@s.whatsapp.net`];
      const groupMetadata = isGroup ? await client.groupMetadata(from) : "";
      const groupName = isGroup ? groupMetadata.subject : "";
      const groupId = isGroup ? groupMetadata.jid : "";
      const groupMembers = isGroup ? groupMetadata.participants : "";
      const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : "";
      const isBotGroupAdmins = groupAdmins.includes(botNumber) || false;
      const isGroupAdmins = groupAdmins.includes(sender) || false;
      const isOwner = ownerNumber.includes(sender);

      function reply(msg) {
        client.sendMessage(from, msg, text, {
          quoted: xxx,
        });
      }
      function sendMess(to, msg, type) {
        client.sendMessage(to, msg, type, {
          quoted: xxx,
        });
      }
      function mentions(msg, memberr, id) {
        id == null || id == undefined || id == false
          ? client.sendMessage(from, msg.trim(), extendedText, {
              contextInfo: {
                mentionedJid: memberr,
              },
            })
          : client.sendMessage(from, msg.trim(), extendedText, {
              quoted: xxx,
              contextInfo: {
                mentionedJid: memberr,
              },
            });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
module.exports.chat_update = chat_update;
