const path = require("path");
const fs = require("fs");
const { count } = require(path.join(__dirname, "./count"));
const { read } = require(path.join(__dirname, "./read"));
const { crypto } = require(path.join(__dirname, "../plugins/crypto"));
const { shorturl } = require(path.join(__dirname, "../plugins/shorturl"));
const { savedsticker } = require(path.join( __dirname, "../plugins/savedsticker"));
const { stickermaker } = require(path.join(__dirname, "../plugins/sticker"));
const { pinterest } = require(path.join(__dirname, "../plugins/pinterest"));
const { grp } = require(path.join(__dirname, "../plugins/groupsettings"));
const { market } = require(path.join(__dirname, "../plugins/market"));
const { newgroup } = require(path.join(__dirname, "./newgroup"));
//const { saavn } = require(path.join(__dirname, "../plugins/saavn"));
const { help } = require(path.join(__dirname, "../plugins/help"));
const { youtube } = require(path.join(__dirname, "../plugins/yt"));
//const { meme } = require(path.join(__dirname, "../plugins/meme"));
const { MessageType } = require("@adiwajshing/baileys");
const { text, extendedtext, image, video, sticker, audio } = MessageType;

function switchcase(infor) {

  client=infor.client;
  xxx=infor.xxx;
  number = infor.number;
  arg = infor.arg;
  d = infor.from;
  from=d

  if(infor.abusepresent.length!=0)
  {  
     client.sendMessage(from, infor.abusepresent[0],text, {quoted: xxx,});
     count(infor).then(() => console.log(number + "+1"));
      return 
  }

  switch (arg[0]) {


    case "crypto":
      crypto(infor)
        .then((resolve) => {
          client.sendMessage(from, resolve, text, {
            quoted: xxx,
          });
          count(infor).then(() => console.log(number + "+1"));
        })
        .catch((error) => {
          client.sendMessage(from, error, text, {
            quoted: xxx,
          });
        });

      break;
    case "shorturl":
      shorturl(infor)
        .then((resolve) => {
          client.sendMessage(from, resolve, text, {
            quoted: xxx,
          });
          count(infor).then(() => console.log(number + "+1"));
        })
        .catch((error) => {
          client.sendMessage(from, error, text, {
            quoted: xxx,
          });
        });

      break;

    case "market":
      market(infor)
        .then((resolve) => {
          client.sendMessage(from, resolve, text, {
            quoted: xxx,
          });
          count(number).then(() => console.log("number +1"));
        })
        .catch((error) => {
          client.sendMessage(from, error, text, {
            quoted: xxx,
          });
        });

      break;

    case "sticker":
      stickermaker(infor)
        .then((resolve) => {
          console.log("sent");
          count(infor).then(() => console.log(number + "+1"));
        })
        .catch((error) => {
          console.log("error");
          client.sendMessage(from, error, text, {
            quoted: xxx,
          });
        });

      break;

    case "rs":
    case "keerthy":
    case "rashmika":
      savedsticker(infor)
        .then((resolve) => {
          console.log(resolve);
          client.sendMessage(from, fs.readFileSync(resolve), sticker, {
            quoted: xxx,
          });
          count(infor).then(() => console.log(number + "+1"));
        })
        .catch((error) => {
          client.sendMessage(from, error, text, {
            quoted: xxx,
          });
          console.log("error");
        });

      break;

    case "pin":
      pinterest(infor)
        .then((resolve, reject) => {
          console.log(resolve);
          client.sendMessage(from, fs.readFileSync(resolve), video, {
            quoted: xxx,
          });
          count(infor).then(() => console.log(number + "+1"));
        })
        .catch((error) => {
          console.log(error);
          client.sendMessage(from, error, text, {
            quoted: xxx,
          });
        });

      break;

    case "promote":
    case "demote":
    case "kick":
    case "grouplink":
    case "changedp":
    case "botleave":
    case "close":
    case "open":
    case "add":
    case "purge":
    case "tagall":
    case "ban":
    case "unban":
    case "banlist":
    case "allowabuse":
    case "denyabuse":
    
      grp(infor)
        .then((resolve) => {
          client.sendMessage(from, resolve, text, {
            quoted: xxx,
          });
        })
        .catch((error) => {
          client.sendMessage(from, error, text, {
            quoted: xxx,
          });
          count(number).then(() => console.log(number + " +1"));
        });

      break;

    case "help":
    case "bot":
    case "menu":
    case "command":
    case "commands":
      help(infor)
        .then((resolve) => {
          client.sendMessage(from, resolve, text, {
            quoted: xxx,
          });
          count(infor).then(() => console.log(number + "+1"));
        })
        .catch((error) => {
          client.sendMessage(from, error, text, {
            quoted: xxx,
          });
        });
      break;

    case "meme":
      meme(infor)
        .then((resolve) => {
          client.sendMessage(from, resolve, text, {
            quoted: xxx,
          });
          count(infor).then(() => console.log(number + "+1"));
        })
        .catch((error) => {
          client.sendMessage(from, error, text, {
            quoted: xxx,
          });
        });
      break;

    case "limit":
      x =
        "```Message balance left with you is``` " +
        "```" +
        50 -
        infor.noofmsgtoday +
        "``` ";
      client.sendMessage(from, x, text, {
        quoted: xxx,
      });

      break;


    case "ytv":
      ytvideo(infor)
        .then((resolve) => {
          
          count(infor).then(() => console.log(number + "+1"));
        })
        .catch((error) => {
          client.sendMessage(from, error, text, {
            quoted: xxx,
          });
        });
      break;

    case "xxx":
      client.sendMessage(
        from,
        "```Bot down. New features being added.```",
        text,
        {
          quoted: xxx,
        }
      );
      count(infor).then(() => console.log(number + "+1"));
      break;

    case "new":
      newgroup(client, infor);
      break;

    case "hello":
    case "hi":
    case "hey":
      client.sendMessage(from, "```Hello```", text, {
        quoted: xxx,
      });
      count(infor).then(() => console.log(number + "+1"));
      break;

    case "xrestartx":
      process.exit(0);
      break;

    default:
      break;
  }
}

module.exports.switchcase = switchcase;
