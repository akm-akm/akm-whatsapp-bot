const fs = require("fs");
const axios = require("axios");
const request = require("request");
const http = require("https");
const {
  MessageType
} = require("@adiwajshing/baileys");
const {
  text,video
  
} = MessageType;

const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}.${ext}`;
};

const pinterest = (infor) =>
  new Promise((resolve, reject) => {
    arg  = infor.arg
    if (arg.length==1){
      client.sendMessage(from,"```Argument required```", text, {
        quoted: xxx,
      }); 
      reject()
    return}

    ran = getRandom("mp4");
    var c;
    request(
      {
        uri: arg[1],
        followRedirect: false,
      },
      (err, httpResponse) => {
        if (err) {
          console.error(err);
          client.sendMessage(from,"```Error```", text, {
            quoted: xxx,
          }); 
          reject();
        } else {
          c = httpResponse.headers.location || arg[1];
          console.log(httpResponse.headers.location || arg[1]);

          axios
            .get("https://pinterest-video-api.herokuapp.com/" + c)
            .then((response) => {
              if (response.error) console.log("err");
              console.log(response.data);
              url = response.data;
              const file = fs.createWriteStream(ran);
              http.get(url, function (response) {
                response.pipe(file);
                console.log("done");
                file.on("finish", function () {
                  file.close(() => {
                    console.log("filesaved");
                    client.sendMessage(from, fs.readFileSync(ran), video, {
                      quoted: xxx,
                    });
                    resolve();

                  });
                });
              });
            })
            .catch((err) => {
              console.log(err);
              client.sendMessage(from,"```Error```", text, {
                quoted: xxx,
              }); 
              reject();
            });
        }
      }
    );
  });
module.exports.pinterest = pinterest;
