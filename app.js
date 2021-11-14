const express = require("express");
const server = new express();
const port = process.env.PORT || 7554;
const path = require("path");
const node = require('node-cron');
setTimeout(() => {
  require(path.join(__dirname, "./utils/config"));
  sql = require(path.join(__dirname, "./utils/ps"));
}, 1)
const {
  main,
  logout,
  stop,
  isconnected,
} = require(path.join(
  __dirname,
  "./events/events"
));

node.schedule("0 */24 * * *", () => {
  sql.query('UPDATE groupdata SET totalmsgtoday=0;')
  sql.query('UPDATE botdata SET totalmsgtoday=0;')
  sql.query('UPDATE messagecount SET totalmsgtoday=0,dailylimitover=false;')

})

server.use(express.static(path.join(__dirname, "./public")));

server.listen(port, () => {
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
  qqr = await sql.query("SELECT to_regclass('auth');")
  if (qqr.rows[0].to_regclass == "auth") {
    let qwer = await sql.query("SELECT * FROM auth;");
    auth_row_count = await qwer.rowCount;
    if (auth_row_count == 0) {
      res.send("absent")

    } else res.send("present")
  } else res.send("absent")

});

server.get("/logout", async (req, res) => {
  logout();
  res.send("1")
});


server.get("/stop", async (req, res) => {
  console.log("stop");
  autoconnect = false;
  stop();
  res.send("1")
});


server.get("/qr", async (req, res) => {
  console.log("sendig qr to browser");
  res.send('qr.png')
});


server.post("/sql", async (req, res) => {
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
  sql.query(`UPDATE botdata SET boturl='${req.body.siteurl}';`)
  if (req.body.pass != process.env.WEBSITE_PASSWORD) {
    res.send("false");
  } else {
    res.send("true");
  }
});


server.get("/restart", async (req, res) => {
  process.exit(0);
});



server.get("/isconnected", async (req, res) => {
  let state = await isconnected()
  if (state == "close") res.send("close")
  else if (state == "connecting") res.send("connecting")
  else if (state == "open") res.send("open")

});

server.get("/isauthenticationfilepresent", async (req, res) => {
  qqr = await sql.query("SELECT to_regclass('auth');")
  if (qqr.rows[0].to_regclass == "auth") {
    let qwer = await sql.query("SELECT * FROM auth;");
    auth_row_count = await qwer.rowCount;
    if (auth_row_count == 0) {
      res.send("absent")

    } else res.send("present")
  } else res.send("absent")
});

process.on('uncaughtException', err => console.log(err));