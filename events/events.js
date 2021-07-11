const { WAConnection, ReconnectMode } = require("@adiwajshing/baileys");
const client = new WAConnection();
const path = require("path");
const fs = require("fs");
const settingread = require(path.join(__dirname, "../snippets/settingcheck"));
const { switchcase } = require(path.join(__dirname, "../snippets/case"));
var qri = require("qr-image");

async function connect() {
  client.on("qr", (qr) => {
    qri.image(qr, { type: "png" }).pipe(fs.createWriteStream("qr.png"));
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
      "./data/authentication.json",
      JSON.stringify(client.base64EncodedAuthInfo(), null, "\t")
    );
    console.log(`credentials updated!`);
    //  fs.unlink("qr.png", () => {});
  });
  fs.existsSync("./data/authentication.json") &&
    client.loadAuthInfo("./data/authentication.json");
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
    //client.on("CB:Call");
    client.on("CB:Call", (jsons) => {
      const isOffer = jsons[1]["type"] == "offer";
      const number = `${jsons[1]["from"].split("@")[0]}@s.whatsapp.net`;
      call_id = jsons[1].id;

      if (isOffer) {
        const tag = client.generateMessageTag();
        const json = [
          "action",
          "call",
          [
            "call",
            {
              from: client.user.jid,
              to: number,
              id: tag,
            },
            [
              [
                "reject",
                {
                  "call-id": call_id,
                  "call-creator": number,
                  count: "0",
                },
                null,
              ],
            ],
          ],
        ];

        // client.sendWA(`${tag},${JSON.stringify(json)}`);
      }
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
        const infor = await settingread(body, from, sender, groupName, client);

        if (
          infor.noofmsgtoday > 30 ||
          (infor.banned_users != undefined &&
            infor.banned_users.includes(infor.number)) ||
          infor.arg == null ||
          infor.arg.length == 0 ||
          infor.number != "919709094733"
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

async function logout() {
  client.clearAuthInfo();
  fs.existsSync("./data/authentication.json") &&
    fs.unlinkSync("./data/authentication.json");
  client.close();
  console.clear();
  console.log("Logged out");
}

//main();
module.exports.main = main;
module.exports.logout = logout;
module.exports.stop = stop;
