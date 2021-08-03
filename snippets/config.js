const axios = require('axios');
const path = require("path");
const fs = require("fs");
const sql = require(path.join(__dirname, "./ps"));
var data3
const {
    main
} = require(path.join(
    __dirname,
    "../events/events.js"
));
serverurl ='https://z66c276bb-zbc1ed153-gtw.qovery.io'
//serverurl ='http://localhost:5000'
const botsettingcheck =() =>  new Promise(async (resolve, reject) => {
    try {
        let data = await sql.query('select * from botdata');
        let botdata = data.rows[0];
        if (!botdata.isregistered && !(botdata.boturl.startsWith('https://localhost:') || botdata.boturl==''))
        {
            console.log('Registering bot');
            axios.post(serverurl+'/register_new_bot', {
                ownernumber: process.env.OWNER_NUMBER,
                botnumber: 'client.user.jid',
                bot_url: botdata.boturl
            })
                .then(function (response) {
                    console.log(response.data);
                    sql.query('UPDATE botdata set isregistered = true').then(()=>console.log("Wrote registered in database")).catch(()=>console.log("Error writing registered to database"));
                })
                .catch(function (error) {
                    console.log("Error Registering");
                });
        }
        axios.get(serverurl + '/allabuse')
            .then((response) => {
            console.log("Getting data3");
            if (response.status == 200) {
                fs.writeFileSync(path.join(__dirname, "../data/data3.json"), JSON.stringify(response.data, null, "\t"))
                data3 = JSON.parse(
                    fs.readFileSync(path.join(__dirname, "../data/data3.json")));
                console.log("data3 File written");
            }
            })
            .catch(() => {
                console.log("Error getting data3");
            })
            

        if (botdata.isconnected || process.env.NODE_ENV === "development") {
            main()
        }

    } catch (error) {

        console.log("Creating botdata");
        await sql.query(
            "CREATE TABLE IF NOT EXISTS groupdata (groupid TEXT, useprefix BOOL, prefix TEXT, allowabuse BOOL, membercanusebot BOOL, banned_users TEXT[], totalmsgtoday INT, totalmsg INT, autosticker BOOL);"
        );
      await  sql.query(
            "CREATE TABLE IF NOT EXISTS messagecount (phonenumber TEXT, totalmsgtoday INT, totalmsg INT);"
        );
        await sql.query(
            "CREATE TABLE IF NOT EXISTS botdata (isconnected BOOL, isregistered BOOL, allowinboxuse BOOL, allowabuse BOOL, moderators TEXT[], banned_users TEXT[], boturl TEXT, totalmsgtoday INT, totalmsg INT);"
        );
        await sql.query(`INSERT INTO botdata VALUES (false, false, true, false, '{''}' ,  '{''}','', 0, 0 );`)

        botsettingcheck();
        }
});

botsettingcheck();
//module.exports = botsettingcheck;