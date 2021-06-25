const {
  WAConnection,
  MessageType,
  Presence,
  Mimetype,
  GroupSettingChange,
} = require("@adiwajshing/baileys");
const fs = require("fs");

const client = new WAConnection();
async function auth() {
  client.logger.level = "warn";

  client.on("qr", (qr) => {
    console.log("scan the qr above");
  });
  client.on("connecting", () => {
    console.log("connecting");
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
}
async function main() {
  console.log("started");
  await auth();
  client.on("chat-update", async (xxx) => {
    console.log("xxx");
    if (!xxx.hasNewMessage) return;
    console.log(JSON.stringify(xxx.message.conversation));
  });
}

main();
