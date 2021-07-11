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
const pass ="akm21"



server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/site/authenticate.html"));
});




server.get("/login", async (req, res) => {
  main()

});




server.get("/logout", async (req, res) => {
  

  logout()


  })
  


server.get("/stop", async (req, res) => {
  
  console.log("stop");
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



  server.post("/auth",async (req,res)=>{

      if(req.body.pass!=pass) {   console.log(false);
        res.send("false")}
      else{  console.log(true);
        res.send("true")
        console.log("sent");}

    });
    
server.get("/restart", async (req, res) => {
 
  process.exit(0)
})

