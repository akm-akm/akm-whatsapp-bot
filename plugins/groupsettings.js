const fs = require("fs");
const path = require("path");
const http = require("https");
const sql = require(path.join(__dirname, "../utils/ps"));
const settings = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/settings.json"))
);
const mess = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/warningmessages.json"))
);
const {
  newgroup
} = require(path.join(__dirname, "../utils/newgroup"));
const {
  help
} = require(path.join(__dirname, "./help"));

const {
  GroupSettingChange,
  MessageType,
  Mimetype
} = require("@adiwajshing/baileys");

const {
  extendedText,
  text,
  image
} = MessageType;
const getGroupAdmins = (participants) => {
  admins = [];
  for (let i of participants) {
    i.isAdmin ? admins.push(i.jid) : "";
  }
  return admins;
};
const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}.${ext}`;
};
const grp = (infor4, client, xxx3) =>
  new Promise(async (resolve, reject) => {
    const infor5 = {
      ...infor4
    };
    const xxx = {
      ...xxx3
    };

    const arg = infor5.arg;
    const from = infor5.from;
    const sender = infor5.sender;
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
    if (!(isGroupAdmins || isOwner || infor5.botdata.moderators.includes(infor5.number))) {
      client.sendMessage(from, mess.only.admin, text, {
        quoted: xxx,
      });
      resolve();
      return;
    }


    switch (arg[0]) {


      case "groupinfo":
        const ppUrl = await client.getProfilePicture(from);
        ran = getRandom(".jpeg");
        const file = fs.createWriteStream(ran);
        http.get(ppUrl, function (response) {
          
          response.pipe(file);
          file.on("finish", function () {
            file.close(async () => {
              console.log("filesaved");
              let grpdata =
                "\n💮 *Title* : " + "*" + groupMetadata.subject + "*" +
                "\n\n🏊 *Member* : " + "```" + groupMetadata.participants.length + "```" +
                "\n🏅 *Admins*  :  " + "```" + groupAdmins.length + "```" +
                "\n🎀 *Prefix* :       " + "```" + infor5.groupdata.prefix + "```" +
                "\n💡 *Useprefix* :   " + "```" + infor5.groupdata.useprefix + "```" +
                "\n🐶 *Autosticker* : " + "```" + infor5.groupdata.autosticker + "```" +
                "\n🤖 *Botaccess* :   " + "```" + infor5.groupdata.membercanusebot + "```" +
                "\n🌏 *Abusefilter* :   " + "```" + infor5.groupdata.allowabuse + "```" +
                "\n⚠️ *NSFW detect* : " + "```" + infor5.groupdata.nsfw + "```" +
                "\n🎫 *Credits used* : " + "```" + infor5.groupdata.totalmsgtoday + "```" +
                "\n🧶 *Total credits* : " + "```" + infor5.botdata.dailygrouplimit + "```" +
                "\n🚨 *Banned users* : " + "```" + (Number(infor5.groupdata.banned_users.length) - 1) + "```\n";


              await client.sendMessage(from, fs.readFileSync(ran), image, {
                quoted: xxx,
                caption: grpdata,
                mimetype: Mimetype.jpeg
              });

              resolve();
              fs.unlinkSync(ran);
            })
          });
        })

        break;

      case "autosticker":
        if (arg.length == 1) {
          infor5.arg = ["help", arg[0]]
          help(infor5, client, xxx, 1);
          resolve();
          return;
        }
        if (arg[1] == "off") {
          sql.query(`UPDATE groupdata SET autosticker = false WHERE groupid = '${from}'`);
          client.sendMessage(from,mess.success, text, {
            quoted: xxx,
          });
          resolve();
          return;
        } else if (arg[1] == "on") {
          sql.query(`UPDATE groupdata SET autosticker = true WHERE groupid = '${from}'`);
          client.sendMessage(from, mess.success, text, {
            quoted: xxx,
          });
          resolve();
          return;
        } else {
          infor5.arg = ["help", arg[0]]
          help(infor5, client, xxx, 1);
          resolve();
        }
        break;


      case "nsfw":
        if (arg.length == 1) {
          infor5.arg = ["help", arg[0]]
          help(infor5, client, xxx, 1);
          resolve();
          return;
        }
        if (arg[1] == "off") {
          sql.query(`UPDATE groupdata SET nsfw = false WHERE groupid = '${from}'`);
          client.sendMessage(from, mess.success, text, {
            quoted: xxx,
          });
          resolve();
          return;
        } else if (arg[1] == "on") {
          sql.query(`UPDATE groupdata SET nsfw = true WHERE groupid = '${from}'`);
          client.sendMessage(from, mess.success, text, {
            quoted: xxx,
          });
          resolve();
          return;
        } else {
          infor5.arg = ["help", arg[0]]
          help(infor5, client, xxx, 1);
          resolve();
        }
        break;

      case "useprefix":
        if (arg.length == 1) {
          infor5.arg = ["help", arg[0]]
          help(infor5, client, xxx, 1);
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
        } else if (arg[1] == "on") {
          sql.query(`UPDATE groupdata SET useprefix = true WHERE groupid = '${from}'`);
          client.sendMessage(from, "🤖 ```The bot will only listen for commands starting with ```" + infor5.groupdata.prefix, text, {
            quoted: xxx,
          });
          resolve();
          return;
        } else {
          infor5.arg = ["help", arg[0]]
          help(infor5, client, xxx, 1);
          resolve();
        }
        break;

      case "botaccess":
        if (arg.length == 1) {
          infor5.arg = ["help", arg[0]]
          help(infor5, client, xxx, 1);
          resolve();
          return;
        }
        if (arg[1] == "off") {
          sql.query(`UPDATE groupdata SET membercanusebot= false WHERE groupid = '${from}'`);
          client.sendMessage(from, mess.success, text, {
            quoted: xxx,
          });
          resolve();
          return;
        } else if (arg[1] == "on") {
          sql.query(`UPDATE groupdata SET membercanusebot= true WHERE groupid = '${from}'`);
          client.sendMessage(from, mess.success, text, {
            quoted: xxx,
          });
          resolve();
          return;
        } else {
          infor5.arg = ["help", arg[0]]
          help(infor5, client, xxx, 1);
          resolve();
        }
        break;

      case "setprefix":
        if (arg.length == 1) {
          infor5.arg = ["help", arg[0]]
          help(infor5, client, xxx, 1);
          resolve();
          return;
        }
        if (!settings.prefixchoice.split("").includes(arg[1])) {
          client.sendMessage(from, "🤖 ```Select prefix from ```" + settings.prefixchoice, text, {
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
        newgroup(infor5.from, client, arg[1]);
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
          infor5.arg = ["help", arg[0]]
          help(infor5, client, xxx, 1);
          resolve();
          return;
        }

        mentioned = xxx.message.extendedTextMessage.contextInfo.mentionedJid;
        z = mentioned[0].split("@")[0];
        if (z === `${client.user.jid}`.split("@")[0]) {
          client.sendMessage(from, mess.error.error, text, {
            quoted: xxx,
          });
          resolve()
          return;
        }
        client.groupMakeAdmin(from, mentioned);
        client.sendMessage(from, mess.success, text, {
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
          infor5.arg = ["help", arg[0]]
          help(infor5, client, xxx, 1);
          resolve();
          return;
        }

        mentioned = xxx.message.extendedTextMessage.contextInfo.mentionedJid;
        z = mentioned[0].split("@")[0];
        if (z === `${client.user.jid}`.split("@")[0]) {
          client.sendMessage(from,mess.error.error, text, {
            quoted: xxx,
          });
          resolve()
          return;
        }
        if (z === `${groupMetadata.owner}`.split("@")[0]) {
          client.sendMessage(from, mess.error.error, text, {
            quoted: xxx,
          })
          resolve();
          return
        }
        if (z === `${client.user.jid}`.split("@")) {
          client.sendMessage(from, mess.error.error, text, {
            quoted: xxx,
          })
          resolve();
          return
        }
        client.groupDemoteAdmin(from, mentioned);
        client.sendMessage(from,mess.success, text, {
          quoted: xxx,
        });
        resolve();
        break;

      case "kick":
      case "remove":
        try {


          if (!isBotGroupAdmins) {
            client.sendMessage(from, mess.only.Badmin, text, {
              quoted: xxx,
            });
            resolve();
            return;
          }
          if (arg.length == 1) {
            infor5.arg = ["help", arg[0]]
            help(infor5, client, xxx, 1);
            resolve();
            return;
          }
          mentioned = xxx.message.extendedTextMessage.contextInfo.mentionedJid;
          z = mentioned[0].split("@")[0];

          if (z === `${groupMetadata.owner}`.split("@")[0]) {
            client.sendMessage(from, mess.error.error , text, {
              quoted: xxx,
            })
            resolve();
            return
          }
          if (z === `${client.user.jid}`.split("@")[0]) {
            client.sendMessage(from, mess.success, text, {
              quoted: xxx,
            })
            resolve();
            return
          }
          await client.groupRemove(from, mentioned);

          client.sendMessage(from, mess.success, text, {
            quoted: xxx,
          });
          resolve();
        } catch (error) {
          infor5.arg = ["help", arg[0]]
          help(infor5, client, xxx, 1);
          resolve()
        }

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
        client.sendMessage(from, "🤖 ```https://chat.whatsapp.com/```" + "```" + grplink + "```", text, {
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
          client.sendMessage(from, "🤖 ```Tag the image or send it with the the command.```", text, {
            quoted: xxx,
          });
        resolve();
        const encmedia = isQuotedImage ?
          JSON.parse(JSON.stringify(xxx).replace("quotedM", "m")).message
            .extendedTextMessage.contextInfo :
          xxx;
        const media = await client.downloadAndSaveMediaMessage(encmedia);
        await client.updateProfilePicture(from, media);
        client.sendMessage(from, mess.success, text, {
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
        client.sendMessage(from, mess.success, text, {
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
        client.sendMessage(from, mess.success, text, {
          quoted: xxx,
        });
        resolve();
        break;

      case "add":
        if (arg.length == 1) {
          infor5.arg = ["help", arg[0]]
          help(infor5, client, xxx, 1);
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
            arg = arg[1] + "@s.whatsapp.net";
          }
          client.groupAdd(from, arg);
        } catch (e) {
          client.sendMessage(from, mess.error.error, text, {
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
          msg = arg.join(" ") + "\n"
        } else msg = "👋 ```Hello Everyone```\n";
        for (let member of groupMembers) {
          msg += `\n🤖 @${member.jid.split("@")[0]}`;
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
          infor5.arg = ["help", arg[0]]
          help(infor5, client, xxx, 1);
          resolve();
          return;
        }
        if (arg[1] == "off") {
          sql.query(
            `UPDATE groupdata SET allowabuse = 'true' WHERE groupid = '${from}';`
          );
          client.sendMessage(from, mess.success, text, {
            quoted: xxx,
          });
          resolve();
          return;
        } else if (arg[1] == "on") {
          sql.query(
            `UPDATE groupdata SET allowabuse = 'false' WHERE groupid = '${from}';`
          );
          client.sendMessage(from, mess.success, text, {
            quoted: xxx,
          });
          resolve();
          return;
        } else {
          infor5.arg = ["help", arg[0]]
          help(infor5, client, xxx, 1);
          resolve();
        }

        break;

      case "ban":
        if (arg.length == 1) {
          infor5.arg = ["help", arg[0]]
          help(infor5, client, xxx, 1);
          resolve();
          return;
        }
        mentioned = xxx.message.extendedTextMessage.contextInfo.mentionedJid;
        z = mentioned[0].split("@")[0];

        if (z === `${client.user.jid}`.split("@")[0]) {
          client.sendMessage(from, "🤖 ```I can't ban myself, but I can ban you! There you go!``` _BANNED_", text, {
            quoted: xxx,
          });
          sql.query(
            `UPDATE groupdata SET banned_users = array_append(banned_users, '${infor5.number}') where groupid = '${from}';`
          );
          resolve()
          return;
        }
        if (infor5.botdata.moderators.includes(z) || z == process.env.OWNER_NUMBER) {
          client.sendMessage(from, mess.error.error, text, {
            quoted: xxx,
          });
          resolve()
          return;
        }
        if (z == infor5.number) {
          client.sendMessage(from, mess.error.error, text, {
            quoted: xxx,
          });
          resolve()
          return;
        }
        await sql.query(
          `UPDATE groupdata SET banned_users = array_remove(banned_users, '${z}') where groupid = '${from}';`
        );
        sql.query(
          `UPDATE groupdata SET banned_users = array_append(banned_users, '${z}') where groupid = '${from}';`
        );

        client.sendMessage(from, mess.success, text, {
          quoted: xxx,
        });
        resolve();
        break;

      case "unban":
        if (arg.length == 1) {
          infor5.arg = ["help", arg[0]]
          help(infor5, client, xxx, 1);
          resolve();
          return;
        }

        mentioned = xxx.message.extendedTextMessage.contextInfo.mentionedJid;
        z = mentioned[0].split("@")[0];
        sql.query(
          `UPDATE groupdata SET banned_users = array_remove(banned_users, '${z}') where groupid = '${from}';`
        );
        client.sendMessage(from, mess.success, text, {
          quoted: xxx,
        });
        resolve();
        break;

      case "banlist":
        bannedlist = infor5.groupdata.banned_users;
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