const {
  WAConnection,
  ReconnectMode,
  MessageType,
} = require("../@adiwajshing/baileys");

const path = require("path");
const fs = require("fs");
const settingread = require(path.join(__dirname, "../utils/settingcheck"));
let qri = require("qr-image");
const sql = require(path.join(__dirname, "../utils/ps"));
const { messagehandler } = require(path.join(
  __dirname,
  "../utils/messagehandler"
));

const client = new WAConnection();

async function connect() {
  try {
    auth_result = await sql.query("select * from auth;");
    console.log("Fetching login data...");
    auth_row_count = await auth_result.rowCount;
    if (auth_row_count == 0) {
      console.log("No login data found!");
    } else {
      console.log("Login data found!");
      auth_obj = {
        clientID: auth_result.rows[0].clientid,
        serverToken: auth_result.rows[0].servertoken,
        clientToken: auth_result.rows[0].clienttoken,
        encKey: auth_result.rows[0].enckey,
        macKey: auth_result.rows[0].mackey,
      };

      client.loadAuthInfo(auth_obj);
    }

    client.on("qr", (qr) => {
      qri
        .image(qr, {
          type: "png",
        })
        .pipe(fs.createWriteStream("./public/qr.png"));
    });
    client.on("connecting", () => {
      console.log("connecting...");
    });
    await client.connect({
      timeoutMs: 30 * 1000,
    });
    client.on("open", () => {
      console.log("connected");
      console.log(`credentials updated!`);
      fs.unlink("./public/qr.png", () => {});
    });
    const authInfo = client.base64EncodedAuthInfo();
    load_clientID = authInfo.clientID;
    load_serverToken = authInfo.serverToken;
    load_clientToken = authInfo.clientToken;
    load_encKey = authInfo.encKey;
    load_macKey = authInfo.macKey;

    if (auth_row_count == 0) {
      console.log("Inserting login data...");
      sql.query("INSERT INTO auth VALUES($1,$2,$3,$4,$5);", [
        load_clientID,
        load_serverToken,
        load_clientToken,
        load_encKey,
        load_macKey,
      ]);
      console.log("New login data inserted!");
    } else {
      console.log("Updating login data....");
      sql.query(
        "UPDATE auth SET clientid = $1, servertoken = $2, clienttoken = $3, enckey = $4, mackey = $5;",
        [
          load_clientID,
          load_serverToken,
          load_clientToken,
          load_encKey,
          load_macKey,
        ]
      );
      sql.query("commit;");
      console.log("Login data updated!");
    }
  } catch (err) {
    console.error(err);
    if (err.message.startsWith("Unexpected error in login")) {
      await sql.query("UPDATE botdata SET isconnected = false;");
      console.log("isconnected set to false");
      await sql.query("DROP TABLE auth;");
      console.log("auth dropped");
      client.close();
      client.logout();
      console.log("Logged out");
      process.exit(1);
    }
    console.log("Creating database...");
    await sql.query(
      "CREATE TABLE IF NOT EXISTS auth(clientID text, serverToken text, clientToken text, encKey text, macKey text);"
    );
    await connect();
  }
}
async function main() {
  try {
    client.logger.level = "fatal";
    await connect();
    client.autoReconnect = ReconnectMode.onConnectionLost;
    client.connectOptions.maxRetries = 100;
    console.log("Hello " + client.user.name);
    sql.query("UPDATE botdata SET isconnected = true;");

    client.on("CB:Call", async (json) => {
      const number = json[1]["from"];
      const isOffer = json[1]["type"] == "offer";
      if (number && isOffer && json[1]["data"]) {
        const tag = client.generateMessageTag();
        const jsjs = [
          "action",
          "call",
          [
            "call",
            {
              from: client.user.jid,
              to: number.split("@")[0] + "@s.whatsapp.net",
              id: tag,
            },
            [
              [
                "reject",
                {
                  "call-id": json[1]["id"],
                  "call-creator": number.split("@")[0] + "@s.whatsapp.net",
                  count: "0",
                },
                null,
              ],
            ],
          ],
        ];
        client.send(`${tag},${JSON.stringify(jsjs)}`);
        client.sendMessage(
          number,
          "🤖 ```Cannot receive call!```",
          MessageType.text
        );
      }
    });

    client.on("chat-update", async (xxxx) => {
      try {
        if (!xxxx.hasNewMessage) return;
        xxx5 = xxxx.messages.all()[0];
        if (!xxx5.message) return;
        if (xxx5.key && xxx5.key.remoteJid == "status@broadcast") return;
        if (xxx5.key.fromMe) return;
        const Xxxbot = await settingread(xxx5, client);
        messagehandler(Xxxbot);
      } catch (error) {
        console.log(error);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

////////////////////////////////////////////////////////////////////
async function stop() {
  client.close();
  console.log("Stopped");
  await sql.query("UPDATE botdata SET isconnected = false;");
  process.exit();
}
async function isconnected() {
  return client.state;
}
async function logout() {
  sql.query("UPDATE botdata SET isconnected = false;");
  console.log("isconnected set to false");
  sql.query("DROP TABLE auth;");
  console.log("auth dropped");
  client.close();
  client.logout();
  console.log("Logged out");
}

module.exports.main = main;
module.exports.logout = logout;
module.exports.stop = stop;
module.exports.isconnected = isconnected;
