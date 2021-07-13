const express = require("express");
const server = new express();
const port = process.env.PORT || 3003;
const fs = require("fs");
const path = require("path");
const sql = require(path.join(__dirname, "./snippets/ps"));
console.clear();
const {
  main,
  logout,
  stop,
  isconnected,isauthenticationfilepresent
} = require(path.join(
  __dirname,
  "./events/events.js"
));
server.listen(port, () => {
  console.clear();
  console.log("\nRunnning on http://localhost:" + port);
});
server.use(
  express.urlencoded({
    extended: true,
  })
);
const pass = "akm21";
server.use(express.static('public'))
server.get("/", (req, res) => {
  res.sendFile("index.html");
});

server.get("/login", async (req, res) => {
  main();
   let q= await isauthenticationfilepresent()
   
  console.log("server is sending isauthenticationfilepresent - "+ q);
  if(q=="present") res.send("present")
 else res.send("absent")
  
});

server.get("/logout", async (req, res) => {
  logout();
  res.send("1")
});

server.get("/stop", async (req, res) => {
  console.log("stop");
  stop();
  res.send("1")
});


var filepath ='qr.png'


server.get("/qr", async (req, res) => {
  console.log("sendig qr to browser - "+filepath);
  
  res.send(filepath)
});


server.post("/sql", async (req, res) => {
  console.log("query - " + req.body.query);

  sql
    .query(req.body.query)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

server.post("/auth", async (req, res) => {
  if (req.body.pass !=  process.env.WEBSITE_PASSWORD) {
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


server.get("/isconnected", async (req, res) => {
 let state= await isconnected()
 console.log("server is sending connection state - "+ state);
 if(state=="close") res.send("close")
else if(state=="connecting") res.send("connecting")
else if(state=="open") res.send("open")

});


server.get("/isauthenticationfilepresent", async (req, res) => {
 let q= await isauthenticationfilepresent()
 console.log("server is sending isauthenticationfilepresent - "+ q);
 if(q=="present") res.send("present")
else res.send("absent")
});

