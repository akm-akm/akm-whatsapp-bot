const fs = require("fs");
const path = require("path");
const sql = require(path.join(__dirname, "../snippets/ps"));
const settings = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/settings.json"))
);
const mess = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/warningmessages.json"))
);
const { newgroup } = require(path.join(__dirname, "../snippets/newgroup"));

const {
  GroupSettingChange,
  MessageType
} = require("@adiwajshing/baileys");
const {
  extendedText,
  text
} = MessageType;
const getGroupAdmins = (participants) => {
  admins = [];
  for (let i of participants) {
    i.isAdmin ? admins.push(i.jid) : "";
  }
  return admins;
};

const grp = (infor, client, xxx) =>
  new Promise(async (resolve, reject) => {
    arg = infor.arg;
    from = infor.from;
    sender = infor.sender;
    const isGroup = from.endsWith("@g.us");
    const groupMetadata = isGroup ? await client.groupMetadata(from) : "";
    const groupMembers = isGroup ? groupMetadata.participants : "";
    const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : "";
    const isGroupAdmins = groupAdmins.includes(sender) || false;
    const type = Object.keys(xxx.message)[0];
    const content = JSON.stringify(xxx.message);
    const botNumber = client.user.jid;
    const ownerNumber = [`${process.env.OWNER_NUMBER}@s.whatsapp.net`];
    const isBotGroupAdmins = groupAdmins.includes(botNumber) || false;
    const isOwner = ownerNumber.includes(sender);
    const isSuperAdmin = `${groupMetadata.owner}`.split('@') === sender.split('@');
    if (!isGroup) {
      client.sendMessage(from, mess.only.group, text, {
        quoted: xxx,
      });
      resolve();
      return;
    }
    if (!(isGroupAdmins || isOwner) ){
      client.sendMessage(from, mess.only.admin, text, {
        quoted: xxx,
      });
      resolve();
      return;
    }


    switch (arg[0]) {

      case "autosticker":
        if (arg.length == 1) {
          client.sendMessage(from, "🤖 ```Enter on or off after the command.```", text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        if (arg[1] == "off") {
          sql.query(`UPDATE groupdata SET autosticker = false WHERE groupid = '${from}'`);
          client.sendMessage(from, "🤖 ```Automatic sticker turned off.```", text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        else if (arg[1] == "on") {
          sql.query(`UPDATE groupdata SET autosticker = true WHERE groupid = '${from}'`);
          client.sendMessage(from, "🤖 ```Now the bot will automatically make sticker of any media sent in this group.```", text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        else {
          client.sendMessage(from, "🤖 ```Enter on or off after the command.```", text, {
            quoted: xxx,
          });
          resolve();
        }
        break;

      case "prefix":
        if (arg.length == 1) {
          client.sendMessage(from, "🤖 ```Enter on or off after the command.```", text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        if (arg[1] == "off") {
          sql.query(`UPDATE groupdata SET useprefix = false WHERE groupid = '${from}'`);
          client.sendMessage(from, "🤖 ```The bot will only listen for commands starting without the given prefix.```", text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        else if (arg[1] == "on") {
          sql.query(`UPDATE groupdata SET useprefix = true WHERE groupid = '${from}'`);
          client.sendMessage(from, "🤖 ```The bot will only listen for commands starting with the given prefix.```", text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        else {
          client.sendMessage(from, "🤖 ```Enter on or off after the command.```", text, {
            quoted: xxx,
          });
          resolve();
        }
        break;

      case "botaccess":
        if (arg.length == 1) {
          client.sendMessage(from, "🤖 ```Enter on or off after the command.```", text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        if (arg[1] == "off") {
          sql.query(`UPDATE groupdata SET membercanusebot= false WHERE groupid = '${from}'`);
          client.sendMessage(from, "🤖 ```Bot access disabled for group menbers.```", text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        else if (arg[1] == "on") {
          sql.query(`UPDATE groupdata SET membercanusebot= true WHERE groupid = '${from}'`);
          client.sendMessage(from, "🤖 ```Bot access enabled for group members.```", text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        else {
          client.sendMessage(from, "🤖 ```Enter on or off after the command.```", text, {
            quoted: xxx,
          });
          resolve();
        }
        break;
       
      case "setprefix":
        if (arg.length == 1) {
          client.sendMessage(from, "🤖 ```Enter character to be used as prefix.```", text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        if (!settings.prefixchoice.split("").includes(arg[1])) {
          client.sendMessage(from, "```Select prefix from ```" + settings.prefixchoice, text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        sql.query(
          `UPDATE groupdata SET prefix = '${arg[1]}' where groupid = '${from}';`
        );
        client.sendMessage(from, "🚨 ```Prefix set to " + arg[1] + "```", text, {
          quoted: xxx,
        });
        newgroup(infor.from, client,arg[1]);
        resolve();
        break;
      
      case "promote":
        if (!isBotGroupAdmins) {
          client.sendMessage(from, mess.only.Badmin, text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        if (arg.length == 1) {
          client.sendMessage(from, "```Tag the member.```", text, {
            quoted: xxx,
          });
          resolve();
          return;
        }

        mentioned = xxx.message.extendedTextMessage.contextInfo.mentionedJid;
        client.groupMakeAdmin(from, mentioned);
        client.sendMessage(from, "👮 ```Promoted```", text, {
          quoted: xxx,
        });
        resolve();
        break;

      case "demote":
        if (!isBotGroupAdmins) {
          client.sendMessage(from, mess.only.Badmin, text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        if (arg.length == 1) {
          client.sendMessage(from, "```Tag the member.```", text, {
            quoted: xxx,
          });
          resolve();
          return;
        }

        mentioned = xxx.message.extendedTextMessage.contextInfo.mentionedJid;
        z = mentioned[0].split("@")[0];
        if (z === `${groupMetadata.owner}`.split("@")[0]) {
          client.sendMessage(from, "```You can't demote group creator.```", text, {
            quoted: xxx,
          })
          resolve();
          return
        }
        if (z === `${client.user.jid}`.split("@")) {
          client.sendMessage(from, "```I can't demote myself.```", text, {
            quoted: xxx,
          })
          resolve();
          return
        }
        client.groupDemoteAdmin(from, mentioned);
        client.sendMessage(from, "😐 ```Demoted```", text, {
          quoted: xxx,
        });
        resolve();
        break;

      case "kick":


        if (!isBotGroupAdmins) {
          client.sendMessage(from, mess.only.Badmin, text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        if (arg.length == 1) {
          client.sendMessage(from, "```Tag the member.```", text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        mentioned = xxx.message.extendedTextMessage.contextInfo.mentionedJid;
        z = mentioned[0].split("@")[0];
        
        if (z === `${groupMetadata.owner}`.split("@")[0]) {
          client.sendMessage(from, "```You can't kick the group owner.```", text, {
            quoted: xxx,
          })
          resolve();
          return
        }
        if (z=== `${client.user.jid}`.split("@")[0]) {
          client.sendMessage(from, "```F off.```", text, {
            quoted: xxx,
          })
          resolve();
          return
        }
        client.groupRemove(from, mentioned);
        client.sendMessage(from, "🥲", text, {
          quoted: xxx,
        });
        resolve();
        break;

      case "grouplink":
        if (!isBotGroupAdmins) {
          client.sendMessage(from, mess.only.Badmin, text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        grplink = await client.groupInviteCode(from);
        client.sendMessage(from, "```https://chat.whatsapp.com/```" + "```" + grplink + "```", text, {
          quoted: xxx,
        });
        resolve();
        break;

      case "changedp":
        if (!isBotGroupAdmins) {
          client.sendMessage(from, mess.only.Badmin, text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        const isMedia = type === "imageMessage" || type === "videoMessage";
        const isQuotedImage =
          type === "extendedTextMessage" && content.includes("imageMessage");
        if (!(isMedia || isQuotedImage))
          client.sendMessage(from, "```Tag the image or send it with the the command.```", text, {
            quoted: xxx,
          });
        resolve();
        const encmedia = isQuotedImage ?
          JSON.parse(JSON.stringify(xxx).replace("quotedM", "m")).message
          .extendedTextMessage.contextInfo :
          xxx;
        const media = await client.downloadAndSaveMediaMessage(encmedia);
        await client.updateProfilePicture(from, media);
        client.sendMessage(from, "```success```", text, {
          quoted: xxx,
        });
        resolve();
        break;

      case "botleave":
        await client.sendMessage(from, "🤧 ```Bye, Miss you all ```", text);
        client.groupLeave(from);
        resolve();
        break;

      case "close":
        if (!isBotGroupAdmins) {
          client.sendMessage(from, mess.only.Badmin, text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        client.groupSettingChange(from, GroupSettingChange.messageSend, true);
        client.sendMessage(from, "🤫", text, {
          quoted: xxx,
        });
        resolve();
        break;

      case "open":
        if (!isBotGroupAdmins) {
          client.sendMessage(from, mess.only.Badmin, text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        client.groupSettingChange(from, GroupSettingChange.messageSend, false);
        client.sendMessage(from, "🗣️", text, {
          quoted: xxx,
        });
        resolve();
        break;

      case "add":
        if (arg.length == 1) {
          client.sendMessage(from, "```Argument required```", text, {
            quoted: xxx,
          });
          resolve();
          return;
        }

        if (!isBotGroupAdmins) {
          client.sendMessage(from, mess.only.Badmin, text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        try {
          if (arg[1].length < 11) {
            arg = "91" + arg[1] + "@s.whatsapp.net";
          }
          client.groupAdd(from, arg);
        } catch (e) {
          client.sendMessage(from, "```Unable to add due to privacy setting```", text, {
            quoted: xxx,
          });
          resolve();
        }

        break;

      case "purge":
        if (!isSuperAdmin) {
          client.sendMessage(from, mess.only.ownerG, text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        if (!isBotGroupAdmins) {
          client.sendMessage(from, mess.only.Badmin, text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        if (arg[1] != "confirm") {
          client.sendMessage(from, "```Type confirm after purge.```", text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        numbers = [];
        groupMembers.forEach((element) => {
          numbers.push(element.jid);
        });
        client.groupRemove(from, numbers);
        resolve();
        break;

      case "tagall":
        memberslist = [];

        if (arg.length > 1) {
          arg.shift();
          msg = arg.join(" ")
        } else msg = "```Hello 👋```\n\n";
        for (let member of groupMembers) {
          msg += `\n🤖 @${member.jid.split("@")[0]}\n`;
          memberslist.push(member.jid);
        }
        client.sendMessage(from, msg, extendedText, {
          quoted: xxx,
          contextInfo: {
            mentionedJid: memberslist,
          },
        });
        resolve();
        break;

      case "filterabuse":


        if (arg.length == 1) {
          client.sendMessage(from, "```Enter on or off after the command.```", text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        if (arg[1] == "off") {
          sql.query(
            `UPDATE groupdata SET allowabuse = 'true' WHERE groupid = '${from}';`
          );
          client.sendMessage(from, "🤬 ```Now the bot will not abuse back if it is abused!```", text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        else if (arg[1] == "on") {
          sql.query(
            `UPDATE groupdata SET allowabuse = 'false' WHERE groupid = '${from}';`
          );
          client.sendMessage(from, "🙏 ```Now the bot will abuse back if it is abused!```", text, {
            quoted: xxx,
          });
          resolve();
          return;
        }
        else {
          client.sendMessage(from, "🤖 ```Enter on or off after the command.```", text, {
            quoted: xxx,
          });
          resolve();
        }

        break;

      case "ban":
        if (arg.length == 1) {
          client.sendMessage(from, "```Tag the member.```", text, {
            quoted: xxx,
          });

          resolve();
          return;
        }

        mentioned = xxx.message.extendedTextMessage.contextInfo.mentionedJid;
        z = mentioned[0].split("@")[0];
        console.log(z, `${client.user.jid}`.split("@")[0]);
        if (z === `${client.user.jid}`.split("@")[0]) {
          client.sendMessage(from, "```What if I ban you?\nThere you go!```", text, {
            quoted: xxx,
          });
          sql.query(
            `UPDATE groupdata SET banned_users = array_append(banned_users, '${infor.number}') where groupid = '${from}';`
          );
          resolve()
          return;
        }

        await sql.query(
          `UPDATE groupdata SET banned_users = array_remove(banned_users, '${z}') where groupid = '${from}';`
        );
        sql.query(
          `UPDATE groupdata SET banned_users = array_append(banned_users, '${z}') where groupid = '${from}';`
        );

        client.sendMessage(from, "🥲 ```Banned```", text, {
          quoted: xxx,
        });
        resolve();
        break;

      case "unban":
        if (arg.length == 1) {
          client.sendMessage(from, "```Tag the member.```", text, {
            quoted: xxx,
          });
          resolve();
          return;
        }

        mentioned = xxx.message.extendedTextMessage.contextInfo.mentionedJid;
        z = mentioned[0].split("@")[0];
        sql.query(
          `UPDATE groupdata SET banned_users = array_remove(banned_users, '${z}') where groupid = '${from}';`
        );
        client.sendMessage(from, "🙂 ```Unbanned```", text, {
          quoted: xxx,
        });
        resolve();
        break;

      case "banlist":
        bannedlist = infor.groupdata.banned_users;
        if (bannedlist.length == 1) {
          client.sendMessage(from, "🤔 ```No members banned.```", text, {
            quoted: xxx,
          });
          resolve();
        } else {
          msg = "🤣 ```Members banned -```\n";
          bannedlist.shift()
          bannedlist.forEach((currentItem) => {
            msg += "\n🚨 " + currentItem;
          });
          client.sendMessage(from, msg, text, {
            quoted: xxx,
          });
          resolve();
        }
        break;

      default:
        break;
    }
  });
module.exports.grp = grp;