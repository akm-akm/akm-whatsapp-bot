const { WAConnection, ReconnectMode } = require("@adiwajshing/baileys");
const node_cron =require("node-cron");
const client = new WAConnection();
const path = require("path");
const fs = require("fs");
const settingread = require(path.join(__dirname, "./snippets/settingcheck"));
const setting = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./data/settings.json"))
);

const { switchcase } = require(path.join(__dirname, "./snippets/case"));

if (process.env.CRON) {
  if (!node_cron.default.validate(process.env.CRON))
    return console.log(`Invalid Cron String: ${process.env.CRON}`);
  console.log(`Cron Job for clearing all chats is set for ${process.env.CRON}`);
  node_cron.default.schedule(process.env.CRON, () => {
    console.log("Clearing All Chats...");
    client.modifyAllChats("clear");
    console.log("Cleared all Chats!");
  });
}

async function main() {
  console.clear();
  client.logger.level = "warn";
  client.on("qr", () => console.log("scan the qr above "));
  client.on("connecting", () => {
    console.clear();
    console.log("connecting...");
  });
  client.on("open", () => {
    console.clear();
    console.log("connected");
    //client.sendMessage(`${setting.ownerNumber}@s.whatsapp.net`, "```connected```", MimeType.text)

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
  client.autoReconnect = ReconnectMode.onConnectionLost;
  client.connectOptions.maxRetries = 100;
  console.log("Hello " + client.user.name);
  fs.writeFileSync(
    "./data/auth.json",
    JSON.stringify(client.base64EncodedAuthInfo(), null, "\t")
  );
  //client.on("CB:Call");

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
      const groupName = isGroup ? groupMetadata.subject : "";
      const infor = await settingread(body, from, sender, groupName);
      //   console.log(infor);
      if (
        infor.noofmsgtoday > 50 ||
        (infor.banned_users != null &&
          infor.banned_users.includes(infor.number)) ||
        infor.arg == null ||
        infor.arg.length == 0
      )
        return;

      console.log(infor);

      switchcase(client, xxx, sender, infor);
    } catch (error) {
      console.log(error);
    }
  });
}

main();
