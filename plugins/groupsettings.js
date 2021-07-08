const fs = require("fs");
const path = require("path");
const sql = require(path.join(__dirname, "../snippets/ps"));

const mess = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/warningmessages.json"))
);

const setting = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/settings.json"))
);

const {
  GroupSettingChange,
  MessageType
} = require("@adiwajshing/baileys");

const getGroupAdmins = (participants) => {
  admins = [];
  for (let i of participants) {
    i.isAdmin ? admins.push(i.jid) : "";
  }
  return admins;
};

const grp = (arg, xxx, client, from, sender) =>
  new Promise(async (resolve, reject) => {
    const isGroup = from.endsWith("@g.us");
    const groupMetadata = isGroup ? await client.groupMetadata(from) : "";
    const groupMembers = isGroup ? groupMetadata.participants : "";
    const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : "";
    const isGroupAdmins = groupAdmins.includes(sender) || false;
    const type = Object.keys(xxx.message)[0];
    const content = JSON.stringify(xxx.message);
    const botNumber = client.user.jid;
    const ownerNumber = [`${setting.ownerNumber}@s.whatsapp.net`];
    const isBotGroupAdmins = groupAdmins.includes(botNumber) || false;
    const isOwner = ownerNumber.includes(sender);
    if (!isGroup) reject(mess.only.group);
    if (!isGroupAdmins || isOwner) reject(mess.only.admin);
    const {
      extendedText,
      text
    } = MessageType;

    switch (arg[0]) {
      case "promote":
        if (!isBotGroupAdmins) reject(mess.only.Badmin);
        mentioned = xxx.message.extendedTextMessage.contextInfo.mentionedJid;
        client.groupMakeAdmin(from, mentioned);
        resolve("👮");
        break;

      case "demote":
        if (!isBotGroupAdmins) reject(mess.only.Badmin);
        mentioned = xxx.message.extendedTextMessage.contextInfo.mentionedJid;
        client.groupDemoteAdmin(from, mentioned);
        resolve("😐");
        break;

      case "kick":
        if (!isBotGroupAdmins) reject(mess.only.Badmin);
        mentioned = xxx.message.extendedTextMessage.contextInfo.mentionedJid;
        client.groupRemove(from, mentioned);
        resolve("🥲");
        break;

      case "grouplink":
        if (!isBotGroupAdmins) reject(mess.only.Badmin);

        grplink = await client.groupInviteCode(from);
        resolve("https://chat.whatsapp.com/" + grplink);
        break;

      case "changedp":
        if (!isBotGroupAdmins) reject(mess.only.Badmin);

        const isMedia = type === "imageMessage" || type === "videoMessage";
        const isQuotedImage =
          type === "extendedTextMessage" && content.includes("imageMessage");
        if (!(isMedia || isQuotedImage))
          reject("```Tag the image or send it with the the command.```");
        const encmedia = isQuotedImage ?
          JSON.parse(JSON.stringify(xxx).replace("quotedM", "m")).message
          .extendedTextMessage.contextInfo :
          xxx;
        const media = client.downloadAndSaveMediaMessage(encmedia);
        const img = fs.readFileSync(media);
        await client.updateProfilePicture(from, img);
        resolve("```success```");
        break;

      case "botleave":
        await client.sendMessage(from, "```Bye, Miss you all ```🤧", text);
        client.groupLeave(from);
        resolve();
        break;

      case "close":
        if (!isBotGroupAdmins) reject(mess.only.Badmin);
        client.groupSettingChange(from, GroupSettingChange.messageSend, true);
        resolve("🤫");
        break;

      case "open":
        if (!isBotGroupAdmins) reject(mess.only.Badmin);
        client.groupSettingChange(from, GroupSettingChange.messageSend, false);
        resolve("🗣️");
        break;

      case "add":
        if (!isBotGroupAdmins) reject(mess.only.Badmin);

        try {
          if (arg[1].length < 11) {
            arg = "91" + arg[1] + "@s.whatsapp.net";
          }
          client.groupAdd(from, arg);
        } catch (e) {
          reject("```Unable to add due to privacy setting```");
        }
        break;

      case "purge":
        if (!isBotGroupAdmins) reject(mess.only.Badmin);

        if (arg[1] != "confirm") reject("Type confirm after purge");
        numbers = [];
        groupMembers.forEach((element) => {
          numbers.push(element.jid);
        });
        client.groupRemove(from, numbers);
        resolve("🙂");
        break;

      case "tagall":
        memberslist = [];
        msg = arg.length > 1 ? arg.shift().join(" ") : "```Tagged members```";
        msg += "\n\n";
        for (let member of groupMembers) {
          msg += `🤖 @${member.jid.split("@")[0]}\n`;
          memberslist.push(member.jid);
        }
        client.sendMessage(from, msg, extendedText, {
          quoted: xxx,
          contextInfo: {
            mentionedJid: memberslist,
          },
        });
        resolve("🙂");
        break;

      case "allowabuse":
        sql.query(
          `UPDATE groupdata SET allowabuse = 'true' WHERE groupid = '${from}';`
        );
        resolve("🤬");
        break;

      case "denyabuse":
        sql.query(
          `UPDATE groupdata SET allowabuse = 'false' WHERE groupid = '${from}';`
        );
        resolve("🙏");
        break;

      case "ban":
        mentioned = xxx.message.extendedTextMessage.contextInfo.mentionedJid;
        console.clear();
        z = mentioned[0].split("@")[0];
        sql.query(
          `UPDATE groupdata SET banned_users = array_append(banned_users, '${z}') where groupid = '${from}';`
        );
        resolve("🥲");
        break;

      case "unban":
        mentioned = xxx.message.extendedTextMessage.contextInfo.mentionedJid;
        z = mentioned[0].split("@")[0];
        sql.query(
          `UPDATE groupdata SET banned_users = array_remove(banned_users, '${z}') where groupid = '${from}';`
        );
        resolve("🙂");
        break;

      case "banlist":
        banlist = await sql.query(
          `SELECT banned_users FROM groupdata WHERE groupid = '${from}' ;`
        );
        if (banlist.rowcount == 0) resolve("```No members banned.```");
        msg = "```Members baanned -```\n\n";
        banlist.rows[0].banned_users.forEach((currentItem) => {
          msg += "🥲 ```" + currentItem + "```\n";
        });
        resolve(msg);
        break;

      default:
        break;
    }
  });
module.exports.grp = grp;