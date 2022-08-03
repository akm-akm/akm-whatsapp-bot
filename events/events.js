const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} = require("@adiwajshing/baileys");
const P = require("pino");

let connectionState;
const path = require("path");
const fs = require("fs");
const settingread = require(path.join(__dirname, "../utils/settingcheck"));
let qrcode = require("qr-image");
const sql = require(path.join(__dirname, "../utils/ps"));
const { useSQLAuthState } = require(path.join(__dirname, "../utils/auth"));
const { useMultiFileAuthStatem } = require(path.join(
  __dirname,
  "../utils/use-multi-file-auth-state"
));
const { messagehandler } = require(path.join(
  __dirname,
  "../utils/messagehandler"
));

const mess = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/messages.json"))
);
let auth_row_count, c;

async function fetchauth() {
  try {
    console.log("Fetching login data...");
    auth_result = await sql.query("select * from creds;");
    auth_row_count = await auth_result.rowCount;
    let data = auth_result.rows[0];
    if (auth_row_count == 0) {
      console.log("No login data found!");
    } else {
      console.log("Login data found!");
      fs.writeFileSync(
        path.join(__dirname, "../auth_info_baileys/creds.json"),
        data.cred
      );
      //  console.log(data.cred);
    }
    return;
  } catch (err) {
    console.log(err, "Creating database...");
    await sql.query("CREATE TABLE creds(cred text);");
    await fetchauth();
  }
}

async function updateAuth(inserDataInDB) {
  if (auth_row_count == 0) {
    console.log("Inserting login data...");
    const res = await sql.query(
      `INSERT INTO creds VALUES ('${inserDataInDB}');`
    );
    sql.query("UPDATE botdata SET isconnected = true;");
    console.log("Login data inserted!");
  } else {
    console.log("Updating login data....");
    const resu = await sql.query(`UPDATE creds SET cred = '${inserDataInDB}';`);
    console.log("Login data updated!");
    sql.query("UPDATE botdata SET isconnected = true;");
  }
}

const startSock = async () => {
  await fetchauth();
  const { version, isLatest } = await fetchLatestBaileysVersion();
  // const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");
  //const { state, saveCreds } = await useSQLAuthState();
  const { state, saveCreds } = await useMultiFileAuthStatem(
    "auth_info_baileys"
  );
  console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);
  let noLogs = P({ level: "silent" }); //to hide the chat logs

  const sock = makeWASocket({
    version,
    logger: noLogs,
    defaultQueryTimeoutMs: undefined,
    printQRInTerminal: true,
    receivePendingNotifications: false,
    auth: state
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async (mek) => {
    try {
      const msg = JSON.parse(JSON.stringify(mek)).messages[0];

      if (!msg.message) return; //when demote, add, remove, etc happen then msg.message is not there

      if (msg.key.fromMe) return;

      const Bot = await settingread(msg, sock);

      messagehandler(Bot);
    } catch (e) {
      console.log(e);
    }
  });
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  //------------------------connection.update------------------------------//

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr !== undefined) {
      qrcode
        .image(qr, { type: "png", size: 5 })
        .pipe(
          fs.createWriteStream(path.join(__dirname, "../public", "qr.png"))
        );
    }
    if (connection === "close") {
      connectionState = "close";

      if (
        (lastDisconnect.error &&
          lastDisconnect.error.output &&
          lastDisconnect.error.output.statusCode) !== DisconnectReason.loggedOut
      ) {
        console.log(lastDisconnect.error);
        startSock();
      } else {
        console.log("fuckk Connection closed. You are logged out.");
        sock.ws.close();
        sock.ev.removeAllListeners();
        sql.query("DROP TABLE creds;");
        sql.query("UPDATE botdata SET isconnected = false;");
      }
    }

    if (connection === "open") {
      connectionState = "open";
      console.log("Connected");
      try {
        sql.query("SELECT totalmsg from botdata;").then((result) => {
          totalmsg = result.rows[0].totalmsg;
          if (totalmsg === 0) {
            const templateButtons = [
              {
                index: 1,
                urlButton: {
                  displayText: "Don't forget to do this!",
                  url: "https://github.com/akm-akm/akm-whatsapp-bot/blob/new/docs/heroku-hosting.md#%EF%B8%8F-failing-to-do-the-below-step-will-stop-the-bot-from-working"
                }
              },
              {
                index: 2,
                urlButton: {
                  displayText: "How to use the bot?",
                  url: "https://github.com/akm-akm/akm-whatsapp-bot/tree/new#-how-to-use-the-bot"
                }
              }
            ];
            const templateMessage = {
              text: mess.initialSetup,
              footer: "Bot made by Aditya K Mandal",
              templateButtons: templateButtons
            };
            replace;
            sock.sendMessage(
              `${process.env.OWNER_NUMBER}@s.whatsapp.net`,
              templateMessage
            );
          }
        });

        console.log("Hello " + sock.user.name);

        const inserDataInDB = JSON.stringify(
          JSON.parse(
            fs.readFileSync(
              path.join(__dirname, "../auth_info_baileys/creds.json")
            )
          )
        );

        updateAuth(inserDataInDB);
      } catch (e) {
        console.log(e);
      }
    }
  });
  // return sock;
};

async function main() {
  try {
    startSock();
  } catch (err) {
    console.log(err);
  }
}

////////////////////////////////////////////////////////////////////
async function stop() {
  c.end();
  console.log("Stopped");
  await sql.query("UPDATE botdata SET isconnected = false;");
}
async function isconnected() {
  return connectionState;
}
async function logout() {
  sql.query("UPDATE botdata SET isconnected = false;");
  console.log("isconnected set to false");
  sql.query("DROP TABLE auth;");
  console.log("auth dropped");
  c.logout();
  console.log("Logged out");
}

module.exports.main = main;
module.exports.logout = logout;
module.exports.stop = stop;
module.exports.isconnected = isconnected;
