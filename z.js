"use strict";
const {
  fetchLatestBaileysVersion,
  default: WASocket,
  BufferJSON,
  DisconnectReason,
  useSingleFileAuthState
} = require("@adiwajshing/baileys");
const { Boom } = require("@hapi/boom");
const Pino = require("pino");
const fs = require("fs");
const { writeFile, stat } = require("fs/promises");

const qrcode = require("qr-image");
const path = require("path");
const __Path = path.join(__dirname, ".");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.redirect("https://ajay-o-s.github.io/Whatsapp-web");
});
app.get("/data?", async (req, res) => {
  var qrcode = req.query.qrcode;
  if (!qrcode) {
    res.json({ error: "qrcode ?" });
  } else {
    try {
      const data = require("./json/" + qrcode + ".json");
      res.header("Content-Type", "application/json");
      res.send(JSON.stringify(data));
    } catch (e) {
      res.json({ error: "qrcode error" });
    }
  }
});
app.get("/md", (req, res) => {
  async function KeerthanaAmmu() {
    const fs = require("fs");
    const path = require("path");
    const __Path = path.join(__dirname, ".");
    const files = fs.readdirSync(__Path + "/json");
    var num = 0;
    for (const file of files) {
      num++;
    }
    var num_n = num + 2;
    console.log(num_n + " g " + num);
    const { state, saveState } = useSingleFileAuthState(
      "./json/keerthana_qr_md_" + num_n + ".json"
    );
    const { version, isLatest } = await fetchLatestBaileysVersion();
    const Ammu = WASocket({
      printQRInTerminal: false,
      auth: state,
      logger: Pino({ level: "silent" }),
      version: version,
      browser: ["Keerthana", "Safari", "3.0"]
    });
    Ammu.ev.on("creds.update", saveState);
    Ammu.ev.on("connection.update", async (up) => {
      const { connection, qr } = up;
      if (connection === "close") return reload(state, saveState);
      if (connection) return console.log("Connection Status: ", connection);
      async function reload(state, saveState) {
        const Ammu = WASocket({
          auth: state
        });
        Ammu.ev.on("creds.update", saveState);
        Ammu.ev.on("connection.update", async (up) => {
          const { connection } = up;
          if (connection === "open") {
            var templateButtons = [
              {
                urlButton: {
                  displayText: "GITHUB",
                  url: "https://github.com/Ajay-o-s"
                },
                index: 1
              },

              {
                quickReplyButton: {
                  displayText: "session = keerthana_qr_md_" + num_n,
                  id: "session = keerthana_qr_md_" + num_n
                },
                index: 2
              },

              {
                index: 3,
                quickReplyButton: {
                  displayText: "*MADE BY AJAY WITH 💖*",
                  id: "*MADE BY AJAY WITH 💖*"
                }
              }
            ];
            var templateMessage = {
              text:
                "*WELCOME TO KEERTHANA BOT*\n\n your code => keerthana_qr_md_" +
                num_n,
              footer: "*MADE BY AJAY WITH 💖*",
              templateButtons: templateButtons
            };
            Ammu.sendMessage(
              Ammu.user.id.split(":")[0] + "@s.whatsapp.net",
              templateMessage
            );
          }
        });
      }
      if (qr !== undefined) {
        qrcode
          .image(qr, { type: "png", size: 20 })
          .pipe(fs.createWriteStream("./img.png"));
      }
    });
  }
  KeerthanaAmmu();
  res.sendFile(__dirname + "/img.png");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
