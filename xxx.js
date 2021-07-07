const {
  WAConnection,
  ReconnectMode,
} = require("@adiwajshing/baileys");

const path = require("path");
const fs = require("fs");
console.clear();


const { settingread } = require(path.join(
  __dirname,
  "./snippets/settingcheck"
));

const {switchcase} = require(path.join(__dirname,"./snippets/case"));

const client = new WAConnection();

async function main() {
  client.autoReconnect = ReconnectMode.onConnectionLost ;
  client.connectOptions.maxRetries = 100;
  client.logger.level = "warn";
  client.on("qr", (qr) => {
    console.log("scan the qr above ");
  });
  client.on("connecting", () => {
    console.clear();
    console.log("connecting...");
  });
  client.on("open", () => {
    console.clear();
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
  console.clear();
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
      const from = xxx.key.remoteJid;
      const type = Object.keys(xxx.message)[0];
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
      const isGroup = from.endsWith("@g.us");
      const sender = isGroup ? xxx.participant : xxx.key.remoteJid;
      const groupMetadata = isGroup ? await client.groupMetadata(from) : "";
      const groupName =  isGroup ? groupMetadata.subject : "";
      const infor = settingread(body,from,sender,groupName);
     
      if (infor.noofmsgtoday > 99 || infor.isnumberblocked || infor.arg==null || infor.arg.length==0)  return
      arg = infor.arg;
      console.log(infor.noofmsgtoday);
     

      switchcase(client,xxx,from,arg,sender,infor.number);

    } catch (error) {
      console.log(error);
    }
  });
}

main();
