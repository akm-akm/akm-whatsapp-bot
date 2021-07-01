const {
  WAConnection,
  MessageType,
  Presence,
  Mimetype,
  GroupSettingChange,
} = require("@adiwajshing/baileys");
const axios = require("axios");
const http = require("https");
const ffmpeg = require("fluent-ffmpeg");
var request = require("request");

const path = require("path");
const fs = require("fs");
console.clear();
const { settingread } = require(path.join(
  __dirname,
  "./snippets/settingcheck"
));
//const { market } = require(path.join(__dirname, "./plugins/market"));

const settings = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./data/settings.json"))
);
const api = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./data/api.json"))
);
const coins = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./data/coins.json"))
);

const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};
const client = new WAConnection();

function xreply(msg) {
  client.sendMessage(from, msg, text, {
    quoted: xxx,
  });
}

function xsm(to, msg, type) {
  client.sendMessage(to, msg, type, {
    quoted: xxx,
  });
}
async function main() {
  client.logger.level = "warn";
  client.on("qr", (qr) => {
    console.log("scan the qr above ");
  });
  client.on("connecting", () => {
    console.clear();
    console.log("connecting...");
  });
  client.on("open", () => {
    console.log("connected");
    fs.writeFileSync(
      "./data/auth.json",
      JSON.stringify(client.base64EncodedAuthInfo(), null, "\t")
    );
    console.log(`credentials updated!`);
  });
  fs.existsSync("./data/auth.json") && client.loadAuthInfo("./data/auth.json");
  await client.connect({
    timeoutMs: 30 * 1000,
  });
  console.log("Hello " + client.user.name);
  fs.writeFileSync(
    "./data/auth.json",
    JSON.stringify(client.base64EncodedAuthInfo(), null, "\t")
  );

  client.on("chat-update", async (xxx) => {
    try {
      if (!xxx.hasNewMessage) return;
      xxx = xxx.messages.all()[0];
      if (!xxx.message) return;
      if (xxx.key && xxx.key.remoteJid == "status@broadcast") return;
      if (xxx.key.fromMe) return;
      const content = JSON.stringify(xxx.message);
      const from = xxx.key.remoteJid;
      const type = Object.keys(xxx.message)[0];
      const { text, extendedtext, image, video, sticer } = MessageType;
      body =
        type === "conversation"
          ? xxx.message.conversation
          : type === "imageMessage"
          ? xxx.message.imageMessage.caption
          : type === "videoMessage"
          ? xxx.message.videoMessage.caption
          : type == "extendedTextMessage"
          ? xxx.message.extendedTextMessage.text
          : "";
      const isMedia = type === "imageMessage" || type === "videoMessage";
      const isQuotedImage =
        type === "extendedTextMessage" && content.includes("imageMessage");
      const isQuotedVideo =
        type === "extendedTextMessage" && content.includes("videoMessage");
      const isQuotedSticker =
        type === "extendedTextMessage" && content.includes("stickerMessage");
      const isGroup = from.endsWith("@g.us");
      const sender = isGroup ? xxx.participant : xxx.key.remoteJid;
      const groupMetadata = isGroup ? await client.groupMetadata(from) : "";
      const groupName =  isGroup ? groupMetadata.subject : "";

      const infor = settingread(body, from, sender,groupName);

     

      if (infor.noofmsgtoday > 99 || infor.isnumberblocked || infor.arg == null)  return
       



        function read(){
          client.chatRead(from); 
          client.updatePresence(from, Presence.available);
          client.updatePresence(from, Presence.composing);
          }
      const getGroupAdmins = (participants) => {
        admins = [];
        for (let i of participants) {
          i.isAdmin ? admins.push(i.jid) : "";
        }
        return admins;
      };
      arg = infor.arg;
      console.log("MESSAGE RECEIVED");
      //console.log(xxx);
      console.log(infor);
      const botNumber = client.user.jid;
      const ownerNumber = [`${settings.ownerNumber}@s.whatsapp.net`];
     
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

      function sm(to, msg, type) {
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

      switch (arg[0]) {
        case "un":
          request(
            { uri: arg[1], followRedirect: false },
            (err, httpResponse) => {
              if (err) return console.error(err);
              console.log(httpResponse.headers.location || uri);
              reply(httpResponse.headers.location || uri);
            }
          );
          break;
        case "pin":
          reply("```loading```");
          ran = getRandom("mp4");
        
          var c


          // var promise =new Promise((resolve,reject)=>{
          //   request(
          //     { uri: arg[1], followRedirect: false },
          //     (err, httpResponse) => {
          //       if (err) return console.error(err);
          //       c=httpResponse.headers.location || arg[1]
          //       console.log(httpResponse.headers.location || arg[1]);
          //       resolve()
          //     }
          //   );
          // })
          // promise.then(()=>{

            axios
            .get("https://pinterest-video-api.herokuapp.com/" + arg[1])
            .then((response) => {
              if (response.error) console.log("err");
              console.log(response.data);
              url = response.data;
              const file = fs.createWriteStream(ran);
              http.get(url, function (response) {
                response.pipe(file);
                console.log("done");
                file.on("finish", function () {
                  file.close(() => {
                    console.log("filesaved");
                    client.sendMessage(
                      from,
                      fs.readFileSync(ran),
                      MessageType.video,
                      {
                        quoted: xxx,
                        caption: "Hers is the video.",
                      }
                    );
                    // fs.unlinkSync(ran);
                  });
                });
              });
            })
            .catch((err) => {
              reply("wrong url");
              console.log("error");
            });
        //  })
          

          break;
        case "pint":
          axios
            .get("https://keepsaveit.com/api?api_key=cEUdZJA33XDQbIZwLKzQH5ZupbiGEzUDrPRYy4yfevwuFil3Xc&url=" +encodeURIComponent(arg[1]))
            .then((response) => {
              if (response.error) console.log("err");
              console.log(response);
              urls = response.links[0].url;
              const file = fs.createWriteStream(ran);
              http.get(urls, function (response) {
                response.pipe(file);
                console.log("done");
                file.on("finish", function () {
                  file.close(() => {
                    console.log("filesaved");
                    client.sendMessage(
                      from,
                      fs.readFileSync(ran),
                      MessageType.video,
                      {
                        quoted: xxx,
                        caption: "Hers is the video.",
                      }
                    );
                    // fs.unlinkSync(ran);
                  });
                });
              });
            })
            .catch((err) => {
              reply("wrong url");
              console.log("error");
            });
          break;
        case "crypto":
          var c = 0;
          const requestOptions = {
            method: "GET",
            url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
            qs: {
              start: "1",
              limit: "5000",
              convert: "USD",
            },
            headers: {
              "X-CMC_PRO_API_KEY": api.API_KEY,
            },
            json: true,
            gzip: true,
          };
          if (!coins.includes(arg[1].toUpperCase()))
            reply("```Not listed in coinmarketcap```");
          axios(requestOptions)
            .then(function (response) {
              response.data.data.forEach((element) => {
                if (element.symbol == arg[1].toUpperCase()) {
                  c = element.quote.USD;
                  message =
                    "\n*" +
                    arg[1].toUpperCase() +
                    "* " +
                    "/" +
                    " " +
                    "*USDT*" +
                    " 💹" +
                    "\n" +
                    "```CoinMarketCap```" +
                    "\n\n" +
                    "```name ```" +
                    element.name +
                    "\n" +
                    "```price ```" +
                    c.price +
                    "\n" +
                    "```change in 1h ```" +
                    c.percent_change_1h +
                    "```%```" +
                    "\n" +
                    "```change in 24h ```" +
                    c.percent_change_24h +
                    "```%```" +
                    "\n" +
                    "```market cap ```" +
                    c.market_cap +
                    "\n" +
                    "```last updated ```" +
                    c.last_updated.split("T")[1].split(".")[0] +
                    "\n";

                  reply(message);
                }
              });
            })
            .catch(function (error) {
              console.log(error);
            });

          break;
        case "market":
          // market(arg.infor, xxx);
          break;

          case "sticker":
            reply("```Bot down for maintenance```")
            console.log("replied")
            break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  });
}

main();
