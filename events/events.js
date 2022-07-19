const {
  default: makeWASocket,
  DisconnectReason,
  useSingleFileAuthState,
  fetchLatestBaileysVersion
} = require("@adiwajshing/baileys");
const P = require("pino");
const { state, saveState } = useSingleFileAuthState("./auth_info_multi.json");
let connectionState;
const path = require("path");
const fs = require("fs");
const settingread = require(path.join(__dirname, "../utils/settingcheck"));
let qrcode = require("qr-image");
const sql = require(path.join(__dirname, "../utils/ps"));
const { messagehandler } = require(path.join(
  __dirname,
  "../utils/messagehandler"
));
const mess = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/messages.json"))
);

let cred, auth_row_count, c;
async function fetchauth() {
  try {
    auth_result = await sql.query("select * from auth;"); //checking auth table
    console.log("Fetching login data...");
    auth_row_count = await auth_result.rowCount;
    let data = auth_result.rows[0];
    if (auth_row_count == 0) {
      console.log("No login data found!");
    } else {
      console.log("Login data found!");
      cred = {
        creds: {
          noiseKey: {
            private: data.noicekeyprvt,
            public: data.noicekeypub
          },
          signedIdentityKey: {
            private: data.signedidentitykeyprvt,
            public: data.signedidentitykeypub
          },
          signedPreKey: {
            keyPair: {
              private: data.signedprekeypairprv,
              public: data.signedprekeypairpub
            },
            signature: data.signedprekeysignature,
            keyId: Number(data.signedprekeyidb)
          },
          registrationId: Number(data.registrationidb),
          advSecretKey: data.advsecretkeyb,
          nextPreKeyId: Number(data.nextprekeyidb),
          firstUnuploadedPreKeyId: Number(data.firstunuploadedprekeyidb),
          serverHasPreKeys: Boolean(data.serverhasprekeysb),
          account: {
            details: data.accountdetailsb,
            accountSignatureKey: data.accountsignaturekeyb,
            accountSignature: data.accountsignatureb,
            deviceSignature: data.devicesignatureb
          },
          me: {
            id: data.meidb,
            verifiedName: data.meverifiednameb,
            name: data.menameb
          },
          signalIdentities: [
            {
              identifier: {
                name: data.signalidentitiesnameb,
                deviceId: Number(data.signalidentitiesdeviceidb)
              },
              identifierKey: data.signalidentitieskey
            }
          ],
          lastAccountSyncTimestamp: 0, // remove the last timeStamp from db
          // lastAccountSyncTimestamp: Number(data.lastaccountsynctimestampb),
          myAppStateKeyId: data.myappstatekeyidb
        },
        keys: state.keys
      };
      //---------------noiceKey----------------//
      let noiceKeyPrvt = [],
        noiceKeyPub = [];
      let noiceKeyPrvtB = cred.creds.noiseKey.private.slice(1).split("+");
      let noiceKeyPubB = cred.creds.noiseKey.public.slice(1).split("+");
      for (let i = 0; i < noiceKeyPrvtB.length; i++) {
        noiceKeyPrvt.push(parseInt(noiceKeyPrvtB[i]));
      }
      for (let i = 0; i < noiceKeyPubB.length; i++) {
        noiceKeyPub.push(parseInt(noiceKeyPubB[i]));
      }
      cred.creds.noiseKey.private = Buffer.from(noiceKeyPrvt);
      cred.creds.noiseKey.public = Buffer.from(noiceKeyPub);
      //------------------------------------------//
      //----------------signedIdentityKey---------//
      let signedIdentityKeyPrvt = [],
        signedIdentityKeyPub = [];
      let signedIdentityKeyPrvtB = cred.creds.signedIdentityKey.private
        .slice(1)
        .split("+");
      let signedIdentityKeyPubB = cred.creds.signedIdentityKey.public
        .slice(1)
        .split("+");
      for (let i = 0; i < signedIdentityKeyPrvtB.length; i++) {
        signedIdentityKeyPrvt.push(parseInt(signedIdentityKeyPrvtB[i]));
      }
      for (let i = 0; i < signedIdentityKeyPubB.length; i++) {
        signedIdentityKeyPub.push(parseInt(signedIdentityKeyPubB[i]));
      }
      cred.creds.signedIdentityKey.private = Buffer.from(signedIdentityKeyPrvt);
      cred.creds.signedIdentityKey.public = Buffer.from(signedIdentityKeyPub);
      //------------------------------------------//
      //----------------signedPreKey------------------//
      let signedPreKeyPairPrv = [],
        signedPreKeyPairPub = [];
      let signedPreKeyPairPrvB = cred.creds.signedPreKey.keyPair.private
        .slice(1)
        .split("+");
      let signedPreKeyPairPubB = cred.creds.signedPreKey.keyPair.public
        .slice(1)
        .split("+");
      for (let i = 0; i < signedPreKeyPairPrvB.length; i++) {
        signedPreKeyPairPrv.push(parseInt(signedPreKeyPairPrvB[i]));
      }
      for (let i = 0; i < signedPreKeyPairPubB.length; i++) {
        signedPreKeyPairPub.push(parseInt(signedPreKeyPairPubB[i]));
      }
      cred.creds.signedPreKey.keyPair.private =
        Buffer.from(signedPreKeyPairPrv);
      cred.creds.signedPreKey.keyPair.public = Buffer.from(signedPreKeyPairPub);
      //------------------------------------------//
      let signedPreKeySignature = [];
      let signedPreKeySignatureB = cred.creds.signedPreKey.signature
        .slice(1)
        .split("+");
      for (let i = 0; i < signedPreKeySignatureB.length; i++) {
        signedPreKeySignature.push(parseInt(signedPreKeySignatureB[i]));
      }
      cred.creds.signedPreKey.signature = Buffer.from(signedPreKeySignature);
      //-----------------------------------------------//
      //---------------------------signalIdentities-----//
      let signalIdentitiesKey = [];
      let signalIdentitiesKeyB = cred.creds.signalIdentities[0].identifierKey
        .slice(1)
        .split("+");
      for (let i = 0; i < signalIdentitiesKeyB.length; i++) {
        signalIdentitiesKey.push(parseInt(signalIdentitiesKeyB[i]));
      }
      cred.creds.signalIdentities[0].identifierKey =
        Buffer.from(signalIdentitiesKey);
      // console.log("Auth : ", cred.creds.signalIdentities);
      //---------------------------------------------------//
    }
  } catch (err) {
    console.log("Creating database..."); //if login fail create a db
    await sql.query(
      "CREATE TABLE auth(noiceKeyPrvt text, noiceKeyPub text, signedIdentityKeyPrvt text, signedIdentityKeyPub text, signedPreKeyPairPrv text, signedPreKeyPairPub text, signedPreKeySignature text, signedPreKeyIdB text, registrationIdB text, advSecretKeyB text, nextPreKeyIdB text, firstUnuploadedPreKeyIdB text, serverHasPreKeysB text, accountdetailsB text, accountSignatureKeyB text, accountSignatureB text, deviceSignatureB text, meIdB text, meverifiedNameB text, menameB text, signalIdentitiesNameB text, signalIdentitiesDeviceIDB text, signalIdentitiesKey text, lastAccountSyncTimestampB text, myAppStateKeyIdB text);"
    );
    await fetchauth();
  }
}

const startSock = async () => {
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);
  let noLogs = P({ level: "silent" }); //to hide the chat logs
  await fetchauth();
  if (auth_row_count == 0);
  else {
    state.creds = cred.creds;
  }
  const sock = makeWASocket({
    version,
    logger: noLogs,
    defaultQueryTimeoutMs: undefined,
    printQRInTerminal: true,
    receivePendingNotifications: false,
    auth: state
  });

  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  sock.ev.on("call", async (json) => {
    const number = json[1]["from"];
    const isOffer = json[1]["type"] == "offer";
    if (number && isOffer && json[1]["data"]) {
      const tag = sock.generateMessageTag();
      const jsjs = [
        "action",
        "call",
        [
          "call",
          {
            from: sock.user.jid,
            to: number.split("@")[0] + "@s.whatsapp.net",
            id: tag
          },
          [
            [
              "reject",
              {
                "call-id": json[1]["id"],
                "call-creator": number.split("@")[0] + "@s.whatsapp.net",
                count: "0"
              },
              null
            ]
          ]
        ]
      ];
      sock.send(`${tag},${JSON.stringify(jsjs)}`);
      sock.sendMessage(number, {
        text: "🤖 ```Cannot receive call!```"
      });
    }
  });

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
  sock.ev.on("creds.update", saveState);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr !== undefined) {
      qrcode
        .image(qr, { type: "png", size: 10 })
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
        startSock();
      } else {
        console.log("fuckk Connection closed. You are logged out.");
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

            sock.sendMessage(
              `${process.env.OWNER_NUMBER}@s.whatsapp.net`,
              templateMessage
            );
          }
        });

        console.log("Hello " + sock.user.name);
        //---------------noiceKey----------------//
        let noiceKeyPrvt = "",
          noiceKeyPub = "";
        let noiceKeyPrvtB = state.creds.noiseKey.private.toJSON().data;
        let noiceKeyPubB = state.creds.noiseKey.public.toJSON().data;
        for (let i = 0; i < noiceKeyPrvtB.length; i++) {
          noiceKeyPrvt += "+" + noiceKeyPrvtB[i].toString();
        }
        for (let i = 0; i < noiceKeyPubB.length; i++) {
          noiceKeyPub += "+" + noiceKeyPubB[i].toString();
        }
        //------------------------------------------//
        //----------------signedIdentityKey---------//
        let signedIdentityKeyPrvt = "",
          signedIdentityKeyPub = "";
        let signedIdentityKeyPrvtB =
          state.creds.signedIdentityKey.private.toJSON().data;
        let signedIdentityKeyPubB =
          state.creds.signedIdentityKey.public.toJSON().data;
        for (let i = 0; i < signedIdentityKeyPrvtB.length; i++) {
          signedIdentityKeyPrvt += "+" + signedIdentityKeyPrvtB[i].toString();
        }
        for (let i = 0; i < signedIdentityKeyPubB.length; i++) {
          signedIdentityKeyPub += "+" + signedIdentityKeyPubB[i].toString();
        }
        //------------------------------------------//
        //----------------signedPreKeyPair--------------//
        let signedPreKeyPairPrv = "",
          signedPreKeyPairPub = "";
        let signedPreKeyPairPrvB = state.creds.signedPreKey.keyPair.private;
        let signedPreKeyPairPubB = state.creds.signedPreKey.keyPair.public;
        for (let i = 0; i < signedPreKeyPairPrvB.length; i++) {
          signedPreKeyPairPrv += "+" + signedPreKeyPairPrvB[i].toString();
        }
        for (let i = 0; i < signedPreKeyPairPubB.length; i++) {
          signedPreKeyPairPub += "+" + signedPreKeyPairPubB[i].toString();
        }
        //------------------------------------------//
        //------------------signedPreKeySignature**---//
        let signedPreKeySignature = "";
        let signedPreKeySignatureB = state.creds.signedPreKey.signature;
        for (let i = 0; i < signedPreKeySignatureB.length; i++) {
          signedPreKeySignature += "+" + signedPreKeySignatureB[i].toString();
        }
        let signedPreKeyIdB = state.creds.signedPreKey.keyId;
        //---------------------------------------------//
        //------------------AutoKeys--------------------//
        let registrationIdB = state.creds.registrationId;
        let advSecretKeyB = state.creds.advSecretKey;
        let nextPreKeyIdB = state.creds.nextPreKeyId;
        let firstUnuploadedPreKeyIdB = state.creds.firstUnuploadedPreKeyId;
        let serverHasPreKeysB = state.creds.serverHasPreKeys;
        //-----------------------------------------------//
        //---------------------account-----------------//
        let accountdetailsB = state.creds.account.details;
        let accountSignatureKeyB = state.creds.account.accountSignatureKey;
        let accountSignatureB = state.creds.account.accountSignature;
        let deviceSignatureB = state.creds.account.deviceSignature;
        //----------------------ME------------------------//
        let meIdB = state.creds.me.id;
        let meverifiedNameB = state.creds.me.verifiedName;
        let menameB = state.creds.me.name;
        //--------------------------------------------------//
        //----------------------signalIdentities------------//
        let signalIdentitiesNameB =
          state.creds.signalIdentities[0].identifier.name;
        let signalIdentitiesDeviceIDB =
          state.creds.signalIdentities[0].identifier.deviceId;
        let signalIdentitiesKey = "";
        let signalIdentitiesKeyB =
          state.creds.signalIdentities[0].identifierKey.toJSON().data;
        for (let i = 0; i < signalIdentitiesKeyB.length; i++) {
          signalIdentitiesKey += "+" + signalIdentitiesKeyB[i].toString();
        }
        //----------------------------------------------------//
        let lastAccountSyncTimestampB = state.creds.lastAccountSyncTimestamp;
        let myAppStateKeyIdB = state.creds.myAppStateKeyId;
        // INSERT / UPDATE LOGIN DATA
        if (auth_row_count == 0) {
          console.log("Inserting login data...");
          sql.query(
            "INSERT INTO auth VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25);",
            [
              noiceKeyPrvt,
              noiceKeyPub,
              signedIdentityKeyPrvt,
              signedIdentityKeyPub,
              signedPreKeyPairPrv,
              signedPreKeyPairPub,
              signedPreKeySignature,
              signedPreKeyIdB,
              registrationIdB,
              advSecretKeyB,
              nextPreKeyIdB,
              firstUnuploadedPreKeyIdB,
              serverHasPreKeysB,
              accountdetailsB,
              accountSignatureKeyB,
              accountSignatureB,
              deviceSignatureB,
              meIdB,
              meverifiedNameB,
              menameB,
              signalIdentitiesNameB,
              signalIdentitiesDeviceIDB,
              signalIdentitiesKey,
              lastAccountSyncTimestampB,
              myAppStateKeyIdB
            ]
          );
          sql.query("commit;").then(() => {
            console.log("Login data inserted!");
          });
        } else {
          console.log("Updating login data....");
          sql.query(
            "UPDATE auth SET noiceKeyPrvt = $1, noiceKeyPub = $2, signedIdentityKeyPrvt = $3, signedIdentityKeyPub = $4, signedPreKeyPairPrv = $5, signedPreKeyPairPub = $6, signedPreKeySignature = $7, signedPreKeyIdB = $8, registrationIdB = $9, advSecretKeyB = $10, nextPreKeyIdB = $11, firstUnuploadedPreKeyIdB = $12, serverHasPreKeysB = $13, accountdetailsB = $14, accountSignatureKeyB = $15, accountSignatureB = $16, deviceSignatureB = $17, meIdB = $18, meverifiedNameB =$19, menameB =$20, signalIdentitiesNameB =$21, signalIdentitiesDeviceIDB =$22, signalIdentitiesKey =$23, lastAccountSyncTimestampB =$24, myAppStateKeyIdB =$25;",
            [
              noiceKeyPrvt,
              noiceKeyPub,
              signedIdentityKeyPrvt,
              signedIdentityKeyPub,
              signedPreKeyPairPrv,
              signedPreKeyPairPub,
              signedPreKeySignature,
              signedPreKeyIdB,
              registrationIdB,
              advSecretKeyB,
              nextPreKeyIdB,
              firstUnuploadedPreKeyIdB,
              serverHasPreKeysB,
              accountdetailsB,
              accountSignatureKeyB,
              accountSignatureB,
              deviceSignatureB,
              meIdB,
              meverifiedNameB,
              menameB,
              signalIdentitiesNameB,
              signalIdentitiesDeviceIDB,
              signalIdentitiesKey,
              lastAccountSyncTimestampB,
              myAppStateKeyIdB
            ]
          );
          sql.query("commit;");
          console.log("Login data updated!");
        }
      } catch {}
    }
  });
  return sock;
};

async function main() {
  try {
    c = await startSock();
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
