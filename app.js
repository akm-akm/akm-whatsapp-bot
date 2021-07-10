const express = require("express");
const server = new express();
const port =process.env.PORT|| 3000;
const fs = require("fs");
const path = require("path");
const sql = require(path.join(__dirname, "./snippets/ps"));
console.clear()
const {main,logout,connect,stop} =require(path.join(__dirname,"./events/events.js"))
server.listen(port, () => {
  console.clear();
  console.log("\nRunnning on http://localhost:"+port);
});
server.use(
  express.urlencoded({
      extended: true,
  })
);




server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/site/index.html"));
});




server.get("/login", async (req, res) => {
  main()

});




server.get("/logout", async (req, res) => {
  

  logout()


  })
  


server.get("/stop", async (req, res) => {
  

  stop()


  })
  





  server.post("/sql",async (req,res)=>{
    console.log(req.body.query);

    sql.query(req.body.query).then((result) => {
      res.send(result)
    }).catch((err) => {
      res.send(err)
    });


  })

server.get("/restart", async (req, res) => {
 
  process.exit(0)
})

