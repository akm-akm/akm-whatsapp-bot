const path = require("path");
const fs = require('fs');
const { count } = require(path.join(__dirname, "./count"));
const { deleteit } = require(path.join(__dirname, "../plugins/delete"));
const { read } = require(path.join(__dirname, "./read"));
const { crypto } = require(path.join(__dirname, "../plugins/crypto"));
const { owner } = require(path.join(__dirname, "../plugins/botadmin"));
const { shorturl } = require(path.join(__dirname, "../plugins/shorturl"));
const { savedsticker } = require(path.join(__dirname, "../plugins/savedsticker"));
const { sourcecode } = require(path.join(__dirname, "../plugins/sourcecode"));
const { stickermaker } = require(path.join(__dirname, "../plugins/sticker"));
const { searchSticker } = require(path.join(__dirname, "../plugins/searchSticker"));
const { pinterest } = require(path.join(__dirname, "../plugins/pinterest"));
const { coderunner } = require(path.join(__dirname, "../plugins/coderunner"));
const { grp } = require(path.join(__dirname, "../plugins/groupsettings"));
const { xdafootball } = require(path.join(__dirname, "../plugins/twitter"));
const { market } = require(path.join(__dirname, "../plugins/market"));
const { newgroup } = require(path.join(__dirname, "./newgroup"));
const { help } = require(path.join(__dirname, "../plugins/help"));
const { joingroup } = require(path.join(__dirname, "../plugins/join"));
const { youtube } = require(path.join(__dirname, "../plugins/yt"));
const { faqs } = require(path.join(__dirname, "../plugins/faq"));
const { nsfw } = require(path.join(__dirname, "../plugins/nsfw"));
const { chatbot } = require(path.join(__dirname, "../plugins/chatbot"));

const { MessageType } = require("@adiwajshing/baileys");
const { text, sticker } = MessageType;
errorSticker = path.join(__dirname, "../media/stickers/error.webp");

async function switchcase(infor2, client, xxx4) {
  let infor3 = { ...infor2 };
  arg = infor3.arg;
  from = infor3.from;
  const xxx3 = {
    ...xxx4
  };

  if (infor3.abusepresent.length != 0) {
    client.sendMessage(from, "⚠️  ```Tu " + infor3.abusepresent.join(" ") + "```", text, {
      quoted: xxx3,
    });
    count(infor3, 1)
    return;
  }
  if (infor3.from.endsWith("@g.us") && infor3.isMedia && infor3.groupdata.autosticker && infor3.arg[0] !== "sticker") {
    console.log("making auto sticker");
    stickermaker(infor3, client, xxx3).then(() => {
      count(infor3, 2)
    })
      .catch((err) => {
        console.log(err);
      });
  }

  switch (arg[0]) {


    case "invite":
      joingroup(infor3, client, xxx3)
        .then((resolve) => {
          count(infor3)
        })
        .catch((infor5) => {
          client.sendMessage(infor5.from, fs.readFileSync(errorSticker), sticker, { quoted: xxx4 })
        });
      break;


    case "run":
      coderunner(infor3, client, xxx3)
        .then((resolve) => {
          count(infor3)
        })
        .catch((infor5) => {
          client.sendMessage(infor5.from, fs.readFileSync(errorSticker), sticker, { quoted: xxx4 })
        });
      break;


    case "delete":
      deleteit(infor3, client, xxx3)
        .then((resolve) => {
          count(infor3)
        })
        .catch((infor5) => {
          client.sendMessage(infor5.from, fs.readFileSync(errorSticker), sticker, { quoted: xxx4 })
        });
      break;

    case "xxx":
    case "sql":
    case "dul":
    case "rst":
    case "dgl":
    case "mdr":
    case "stp":
    case "mgs":
    case "rtrt":

      owner(infor3, client, xxx3)
        .then((resolve) => {
          count(infor3)
        })
        .catch((infor5) => {
          client.sendMessage(infor5.from, fs.readFileSync(errorSticker), sticker, { quoted: xxx4 })
        });
      break;



    case "sourcecode":

      sourcecode(infor3, client, xxx3)
        .then((resolve) => {
          count(infor3)
        })
        .catch((infor5) => {
          client.sendMessage(infor5.from, fs.readFileSync(errorSticker), sticker, { quoted: xxx4 })
        });
      break;

    case "crypto":
      crypto(infor3, client, xxx3)
        .then((resolve) => {
          count(infor3)
        })
        .catch((infor5) => {
          client.sendMessage(infor5.from, fs.readFileSync(errorSticker), sticker, { quoted: xxx4 })
        });
      break;


    case "tweet":
      xdafootball(infor3, client, xxx3)
        .then((resolve) => {
          count(infor3)
        })
        .catch((infor5) => {
          client.sendMessage(infor5.from, fs.readFileSync(errorSticker), sticker, { quoted: xxx4 })
        });
      break;

    case "shorturl":
      shorturl(infor3, client, xxx3)
        .then((resolve) => {
          count(infor3)
        })
        .catch((infor5) => {
          client.sendMessage(infor5.from, fs.readFileSync(errorSticker), sticker, { quoted: xxx4 })
        });
      break;

    case "market":
      market(infor3, client, xxx3)
        .then(() => {
          count(infor3)
        })
        .catch((infor5) => {
          client.sendMessage(infor5.from, fs.readFileSync(errorSticker), sticker, { quoted: xxx4 })
        });
      break;

    case "sticker":
      stickermaker(infor3, client, xxx3)
        .then(() => {

          count(infor3)
        })
        .catch((infor5) => {
          client.sendMessage(infor5.from, fs.readFileSync(errorSticker), sticker, { quoted: xxx4 })
        });
      break;

    case "ss":
      searchSticker(infor3, client, xxx3)
        .then(() => {

          count(infor3)
        })
        .catch((infor5) => {
          client.sendMessage(infor5.from, fs.readFileSync(errorSticker), sticker, { quoted: xxx4 })
        });
      break;

    case "rs":
    case "rashmika":
      savedsticker(infor3, client, xxx3)
        .then((resolve) => {
          count(infor3)
        })
        .catch((infor5) => {
          client.sendMessage(infor5.from, fs.readFileSync(errorSticker), sticker, { quoted: xxx4 })
        });
      break;

    case "pin":
      pinterest(infor3, client, xxx3)
        .then(() => {
          count(infor3)
        })
        .catch((infor5) => {
          client.sendMessage(infor5.from, fs.readFileSync(errorSticker), sticker, { quoted: xxx4 })
        });
      break;

      break;
    case "testnsfw":
      nsfw(infor3, client, xxx3)
        .then(() => {
          count(infor3)
        })
        .catch((infor5) => {
          client.sendMessage(infor5.from, fs.readFileSync(errorSticker), sticker, { quoted: xxx4 })
        });
      break;

    case "setprefix":
    case "groupinfo":
    case "botaccess":
    case "promote":
    case "demote":
    case "kick":
    case "remove":
    case "useprefix":
    case "grouplink":
    //case "changedp":
    case "botleave":
    case "close":
    case "open":
    // case "add":
    // case "purge":
    case "autosticker":
    case "tagall":
    case "nsfw":
    case "ban":
    case "unban":
    case "banlist":
    case "filterabuse":
      grp(infor3, client, xxx3)
        .then(() => {
          count(infor3, 3)
        })
        .catch((infor5) => {
          client.sendMessage(infor5.from, fs.readFileSync(errorSticker), sticker, { quoted: xxx4 })
        });
      break;

    case "help":
    case "menu":
    case "menus":
    case "command":
    case "commands":
      help(infor3, client, xxx3)
        .then(() => {
          count(infor3)
        })
        .catch((infor5) => {
          client.sendMessage(infor5.from, fs.readFileSync(errorSticker), sticker, { quoted: xxx4 })
        });
      break;

    case "limit":
      x =
        "🤖 ```Daily credit used:``` " + infor3.noofmsgtoday + "/ *" + infor3.botdata.dailylimit + "*";
      client.sendMessage(from, x, text, {
        quoted: xxx3,
      });

      break;

    case "ytv":
      youtube(infor3, client, xxx3)
        .then((resolve) => {
          count(infor3)
        })
        .catch((infor5) => {
          client.sendMessage(infor5.from, fs.readFileSync(errorSticker), sticker, { quoted: xxx4 })
        });
      break;

    case "faq":
      faqs(infor3, client, xxx3)
        .then((resolve) => {
          count(infor3)

        })
        .catch((infor5) => {
          client.sendMessage(infor5.from, fs.readFileSync(errorSticker), sticker, { quoted: xxx4 })
        });
      break;


    case "newg":
      newgroup(infor3.from, client);
      break;

    case "hello":
    case "helloo":
    case "hi":
    case "hii":
    case "hiii":
    case "howdy":
    case "hey":
    case "heyy":
    case "heyyyy":
    case "heyyy":
      client.sendMessage(from, ["👋 ```Hello```", "👋 ```Hi```", "👋 ```Hey```"][Math.floor(Math.random() * 3)], text, {
        quoted: xxx3,
      });
      count(infor3)
      break;

    case "goodmorning":
      client.sendMessage(from, "👋 ```Goodmorning```", text, {
        quoted: xxx3,
      });
      count(infor3)
      break;

    case "goodnight":
      client.sendMessage(from, "👋 ```Goodnight```", text, {
        quoted: xxx3,
      });
      count(infor3)
      break;

    default:
      if (infor3.groupdata == 0) {
        chatbot(infor3.arg.splice(1).join(" "), infor3.number.toString()).then((resolve) => {
          client.sendMessage(from, "```" + resolve + "```", text, {
            quoted: xxx3,
          })
        })
          .catch(() => {
          })
      }

      break;
  }
}

module.exports.switchcase = switchcase;