const express = require("express");
const server = new express();
const port = process.env.PORT || 5000;
const fs = require('fs');
const path = require("path");
const sql = require(path.join(__dirname, "./snippets/ps"));
//require(path.join(__dirname, "./snippets/config"));
console.clear();
const {
  main,
  logout,
  stop,
  isconnected,
} = require(path.join(
  __dirname,
  "./events/events.js"
));



server.use(express.static(path.join(__dirname, "./public")));


server.listen(port, () => {
  console.clear();
  console.log("\nRunnning on http://localhost:" + port);
});
server.use(
  express.urlencoded({
    extended: true,
  })
);


server.get("/", (req, res) => {
  res.sendFile("index.html");
});

server.get("/login", async (req, res) => {
  main();
  autoconnect = true;
  qqr = await sql.query("SELECT to_regclass('auth');")
  console.log("server is sending isauthenticationfilepresent - " + qqr.rows[0].to_regclass);
  if (qqr.rows[0].to_regclass == "auth") res.send("present")
  else res.send("absent")

});

server.get("/logout", async (req, res) => {
  logout();
  autoconnect = false;
  res.send("1")
});

server.get("/stop", async (req, res) => {
  console.log("stop");
  autoconnect = false;
  stop();
  res.send("1")
});


var filepath = 'qr.png'


server.get("/qr", async (req, res) => {
  console.log("sendig qr to browser - " + filepath);

  res.send(filepath)
});


server.post("/sql", async (req, res) => {
  console.log("query - " + req.body.query);

  sql
    .query(req.body.query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.send(err);
    });
});

server.post("/auth", async (req, res) => {
  if (req.body.pass != process.env.WEBSITE_PASSWORD) {
    console.log(false);
    res.send("false");
  } else {
    console.log(true);
    res.send("true");
    console.log("sent");
  }
});


server.get("/restart", async (req, res) => {
  process.exit(0);
});


server.get("/resetdailycount", async (req, res) => {
 await sql.query('UPDATE groupdata SET totalmsgtoday=0')
  sql.query('UPDATE messagecount SET totalmsgtoday=0').then(() => {
    res.status(200).send("ok");
  })
});


server.get("/xxx", async (req, res) => {
  console.log(process.env);
  res.send("1");
});


server.get("/isconnected", async (req, res) => {
  let state = await isconnected()
  console.log("server is sending connection state - " + state);
  if (state == "close") res.send("close")
  else if (state == "connecting") res.send("connecting")
  else if (state == "open") res.send("open")

});


server.get("/isauthenticationfilepresent", async (req, res) => {
  qq = await sql.query("SELECT to_regclass('auth');")
  console.log(qq.rows[0].to_regclass);
  if (qq.rows[0].to_regclass == null) {
    res.send("absent")
    console.log("server is sending isauthenticationfilepresent - absent");
  } else {
    res.send("present")
    console.log("server is sending isauthenticationfilepresent - present");
  }
});

process.on('uncaughtException', err => console.log(err));