const axios = require('axios');
const path = require("path");
const fs = require("fs");
const sql = require(path.join(__dirname, "./ps"));
const {
    main
} = require(path.join(
    __dirname,
    "../events/events.js"
));


const botsettingcheck =(infor,client,xxx) =>  new Promise((resolve, reject) => {
    try {
        let data = await sql.query('select * from botdata');
        let botdata = data[0];
        if (!botdata.isregistered) {
            axios.post('https://zb0e35911-z9d965017-gtw.qovery.io/register_new_bot', {
                ownernumber: process.env.OWNER_NUMBER,
                botnumber: client.user.jid,
                bot_url: "https:test.com"
            })
                .then(function (response) {
                    console.log(response.data);
                    sql.query('UPDATE botdata set isregistered = true').then(()=>console.log("Wrote regtered i database")).catch(()=>console.log("Error writing registered to database"));
                })
                .catch(function (error) {
                    console.log("Error Registering");
                });
        }
        if (botdata.isconnected) {
            main()
        }

    } catch (error) {
        axios.get(`https://zb0e35911-z9d965017-gtw.qovery.io/allabuse`).then((response) => {
            if (response.status == 200) {
                fs.unlinkSync(path.join(__dirname, "../data/data3.json"));
                fs.writeFileSync(path.join(__dirname, "../data/data3.json"), JSON.stringify(response.data, null, "\t"))
                console.log("File written");
            }
        }).catch(() => {
            fs.existsSync(path.join(__dirname, "../data/data3.json")) ? console.log("File present") : fs.writeFileSync(path.join(__dirname, "../data/data3.json"), '{"words": []}') && console.log("Empty File written");
        });

        console.log(error);
        await sql.query(
            "CREATE TABLE IF NOT EXISTS groupdata (groupid TEXT, useprefix BOOL, prefix TEXT, allowabuse BOOL, membercanusebot BOOL, banned_users TEXT[], totalmsgtoday INT, totalmsg INT);"
        );
      await  sql.query(
            "CREATE TABLE IF NOT EXISTS messagecount (phonenumber TEXT, totalmsgtoday INT, totalmsg INT);"
        );
        await sql.query(
            "CREATE TABLE IF NOT EXISTS botdata (isconnected BOOL, isregistered BOOL, allowinboxuse BOOL, username TEXT, groupid TEXT, useprefix BOOL, prefix TEXT, allowabuse BOOL, membercanusebot BOOL, banned_users TEXT[], totalmsgtoday INT, totalmsg INT);"
        );
        botsettingcheck(infor,client,xxx);
        }
});
module.exports = botsettingcheck;