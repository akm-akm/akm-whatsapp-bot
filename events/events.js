const { WAConnection, ReconnectMode } = require("@adiwajshing/baileys");
const client = new WAConnection();
const path = require("path");
const fs = require("fs");
const settingread = require(path.join(__dirname, "../snippets/settingcheck"));
const { switchcase } = require(path.join(__dirname, "../snippets/case"));
var qri = require("qr-image");
const sql = require(path.join(__dirname, "../snippets/ps"));
const node_cron = require("node-cron");

async function connect() {
  client.on("qr", (qr) => {
    qri.image(qr, { type: "png" }).pipe(fs.createWriteStream("./public/qr.png"));
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
      path.join(__dirname,"../data/authentication.json"),
      JSON.stringify(client.base64EncodedAuthInfo(), null, "\t")
    );
    console.log(`credentials updated!`);
     fs.unlink("./public/qr.png", () => {});
  });
  fs.existsSync(path.join(__dirname,"../data/authentication.json")) &&
    client.loadAuthInfo(path.join(__dirname,"../data/authentication.json"));
  await client.connect({
    timeoutMs: 30 * 1000,
  });
  console.clear();
  client.autoReconnect = ReconnectMode.onConnectionLost;
  client.connectOptions.maxRetries = 100;
  console.log("Hello " + client.user.name);
  fs.writeFileSync(
    "./data/authentication.json",
    JSON.stringify(client.base64EncodedAuthInfo(), null, "\t")
  );
}

async function main() {

  try {
    console.clear();
    client.logger.level = "fatal";
    connect();
    node_cron.schedule(process.env.CRON, () => {
      sql.query( `UPDATE messagecount set totalmsgtoday='0';`);
      console.log("Clearing All Chats...");
      client.modifyAllChats("clear");
      console.log("Cleared all Chats!");
    });
  
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
        const infor = await settingread(body, from, sender, groupName, client,groupMetadata);
       
        if (
          infor.noofmsgtoday > 30 ||
          infor.isnumberblockedingroup||
          infor.arg == null ||
          infor.arg.length == 0
        )
          return;
       console.log(infor);
    
     
        switchcase(infor, client, xxx);
      } catch (error) {
        console.log(error);
      }
    });
  } catch (err) {
    console.log("ErRoR-------------" + err);
  }
}

async function stop() {
  client.close();
  console.clear();
  console.log("Stopped");
}
async function isconnected() {
 return client.state
  }
async function logout() {
  client.clearAuthInfo();
  fs.existsSync(path.join(__dirname,"../data/authentication.json")) &&
    fs.unlinkSync(path.join(__dirname,"../data/authentication.json"));
  client.close();
  console.clear();
  console.log("Logged out");
}
async function isauthenticationfilepresent() {

  return fs.existsSync(path.join(__dirname,"../data/authentication.json")) ?  "present" :  "absent"
   
}

//main();
module.exports.main = main;
module.exports.logout = logout;
module.exports.stop = stop;
module.exports.isconnected = isconnected;
module.exports.isauthenticationfilepresent = isauthenticationfilepresent;
