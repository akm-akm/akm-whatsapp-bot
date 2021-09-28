const {
  WAConnection,
  ReconnectMode,
  MessageType
} = require("@adiwajshing/baileys");
const {
  text
} = MessageType;
const client = new WAConnection();
const path = require("path");
const fs = require("fs");
const settingread = require(path.join(__dirname, "../snippets/settingcheck"));
const {
  switchcase
} = require(path.join(__dirname, "../snippets/case"));
let qri = require("qr-image");
const sql = require(path.join(__dirname, "../snippets/ps"));
const {
  count
} = require(path.join(__dirname, "../snippets/count"));
const chalk = require('chalk');





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
          type: "png"
        })
        .pipe(fs.createWriteStream("./public/qr.png"));
      console.log("scan the qr above ");
    });
    client.on("connecting", () => {
      // //console.clear();
      console.log("connecting...");
    });
    await client.connect({
      timeoutMs: 30 * 1000
    });
    client.on("open", () => {
      //console.clear();
      console.log("connected");
      console.log(`credentials updated!`);
      fs.unlink("./public/qr.png", () => { });
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
      console.log("Please check your credentials")
      await sql.query('UPDATE botdata SET isconnected = false;')
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
  (async function () {
    qqr = await sql.query("SELECT count(*) from messagecount;")
    if (qqr.rows[0].count === 0) {
      console.log("New bot!, changing its dp and name!");
      client.updateProfileName("xxx-bot");
      client.updateProfilePicture(`${process.env.OWNER_NUMBER}@s.whatsapp.net`, fs.readFileSync(path.join(__dirname, "../readme/images/logo.jpeg")));
    }
  })();


  try {
    //console.clear();
    client.logger.level = "fatal";
    await connect();
    client.browserDescription = ["chrome", "xXx BOT", "10.0"];
    client.autoReconnect = ReconnectMode.onConnectionLost;
    client.connectOptions.maxRetries = 100;
    console.log("Hello " + client.user.name);
    sql.query('UPDATE botdata SET isconnected = true;')

    client.on('CB:Call', async json => {
      let number = json[1]['from'];
      let isOffer = json[1]["type"] == "offer";

      if (number && isOffer && json[1]["data"]) {
        console.log(json)
        let tag = client.generateMessageTag();
        let jsjs = ["action", "call", ["call", {
          "from": client.user.jid,
          "to": number.split("@")[0] + "@s.whatsapp.net",
          "id": tag
        },
          [
            ["reject", {
              "call-id": json[1]['id'],
              "call-creator": number.split("@")[0] + "@s.whatsapp.net",
              "count": "0"
            }, null]
          ]
        ]];
        console.log(jsjs)
        client.send(`${tag},${JSON.stringify(jsjs)}`)
        client.sendMessage(number, "🤖 ```Cannot receive call!```", MessageType.text);
      }
    })


    client.on("chat-update", async (xxxx) => {
      try {
        if (!xxxx.hasNewMessage) return;
        xxx5 = xxxx.messages.all()[0];
        if (!xxx5.message) return;
        if (xxx5.key && xxx5.key.remoteJid == "status@broadcast") return;
        if (xxx5.key.fromMe) return;
        const from = xxx5.key.remoteJid;
        const type = Object.keys(xxx5.message)[0];
        try {
          stanzaId =
            type == "extendedTextMessage" ?
              xxxx.messages.all()[0].message.extendedTextMessage.contextInfo
                .stanzaId || null :
              0;
        } catch (error) {
          stanzaId = 0;
        }

        body =
          type === "conversation" ?
            xxx5.message.conversation :
            type === "imageMessage" ?
              xxx5.message.imageMessage.caption :
              type === "videoMessage" ?
                xxx5.message.videoMessage.caption :
                type == "extendedTextMessage" ?
                  xxx5.message.extendedTextMessage.text :
                  "";
        const getGroupAdmins = (participants) => {
          admins = [];
          for (let i of participants) {
            i.isAdmin ? admins.push(i.jid) : "";
          }
          return admins;
        };
        const isGroup = from.endsWith("@g.us");
        const sender = isGroup ? xxx5.participant : xxx5.key.remoteJid;
        const isMedia = type === "imageMessage" || type === "videoMessage";
        const groupMetadata = isGroup ? await client.groupMetadata(from) : "";
        const groupMembers = isGroup ? groupMetadata.participants : "";
        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : "";
        const isGroupAdmins = groupAdmins.includes(sender) || false;
        const groupName = isGroup ? groupMetadata.subject : "inbox";
        const infor = await settingread(body, from, sender, groupName, client, groupMetadata, stanzaId, isMedia);
        if (process.env.NODE_ENV !== "production" && infor.number !== process.env.OWNER_NUMBER) return

        if (!
          ((infor.canmemberusebot || isGroupAdmins) &&
            !isGroup || (isGroup && (infor.groupdata.totalmsgtoday <= infor.botdata.dailygrouplimit)) &&
            (infor.arg.length !== 0 || (isGroup && infor.groupdata.autosticker)))
        ) return

        if (infor.isnumberblockedingroup) return

        if (
          infor.noofmsgtoday >= infor.botdata.dailylimit &&
          infor.number !== process.env.OWNER_NUMBER &&
          !infor.botdata.moderators.includes(infor.number) &&
          infor.dailylimitover === false
        ) {
          sql.query(`UPDATE messagecount SET dailylimitover = true WHERE phonenumber ='${infor.number}';`)
          client.sendMessage(infor.sender, "🤖 ```You have exhausted your daily limit, the bot will not reply you anymore.```", text, {
            quoted: xxx5,
          });
          return
        }
        if (infor.dailylimitover === true) return

        if (isGroup && infor.groupdata.totalmsgtoday === infor.botdata.dailygrouplimit) {
          client.sendMessage(infor.from, "🤖 ```Daily group limit exhausted, the bot will not reply today anymore.```", text);
          // count('203')

          count(infor)
          return
        }
        const infor1 = {
          ...infor
        };
        const xxx4 = {
          ...xxx5
        };
        console.log("🤖  " + chalk.bgRed("[" + infor1.number + ']') + "  " + chalk.bgGreen("[" + groupName + ']') + "  " + chalk.bgBlue("[" + infor1.arg.join(" ") + ']'));

        //  console.log(infor1);
        switchcase(infor1, client, xxx4);

      } catch (error) {
        console.log(error);
      }
    });
  } catch (err) {
    console.log("EVENTS.JS ERROR-----------------------" + err);
  }
}
////////////////////////////////////////////////////////////////////
async function stop() {
  client.close();
  console.log("Stopped");
  await sql.query('UPDATE botdata SET isconnected = false;')
}
async function isconnected() {
  return client.state;
}
async function logout() {
  sql.query('UPDATE botdata SET isconnected = false;')
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