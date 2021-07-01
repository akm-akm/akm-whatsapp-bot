const fs = require("fs");

async function auth() {
const {client}= require( '../index');

  client.logger.level = "warn";
  client.on("qr", (qr) => {
    console.log("scan the qr above");
  });
  client.on("connecting", () => {
    console.clear()
    console.log("connecting");
  });
  client.on("open", () => {
    console.clear()
    console.log("connected");
    fs.writeFileSync(
      "./data/auth.json",
      JSON.stringify(client.base64EncodedAuthInfo(), null, "\t")
    );
    console.log (`credentials updated!`)
  });
  fs.existsSync("./data/auth.json") && client.loadAuthInfo("./data/auth.json");
  await client.connect({
    timeoutMs: 30 * 1000,
  });
  console.log ("Hello " + client.user.name )
  fs.writeFileSync(
    "./data/auth.json",
    JSON.stringify(client.base64EncodedAuthInfo(), null, "\t")
  );
}
module.exports.auth = auth;