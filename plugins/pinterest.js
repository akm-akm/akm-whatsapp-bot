const fs = require("fs");
const axios = require("axios");
const request = require("request");
const http = require("https");

const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}.${ext}`;
};

const pinterest = (arg) =>
  new Promise((resolve, reject) => {
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
          reject("Error");
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
                    resolve(ran);
                  });
                });
              });
            })
            .catch((err) => {
              console.log("error");
              reject("wrong url");
            });
        }
      }
    );
  });
module.exports.pinterest = pinterest;
