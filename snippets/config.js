const path = require("path");
const sql = require(path.join(__dirname, "./ps"));
const {
    main
} = require(path.join(
    __dirname,
    "../events/events.js"
));

(botsettingcheck = () => new Promise(async () => {
    try {
        const botdata = await sql.query('select * from botdata');
        if (botdata.isconnected || process.env.NODE_ENV !== "production") main()

    } catch (error) {
        console.log("Creating database");

        await sql.query(
            "CREATE TABLE IF NOT EXISTS botdata (isconnected BOOL, isregistered BOOL, allowinboxuse BOOL, allowabuse BOOL, moderators TEXT[], banned_users TEXT[], boturl TEXT, totalmsgtoday INT, totalmsg INT, dailylimit INT, dailygrouplimit INT,  mingroupsize INT);"
        );
        await sql.query(`INSERT INTO botdata VALUES (false, false, true, false, '{''}' , '{''}','', 0, 0,999999,99999999,3);`)
        botsettingcheck();
    }

    try {
        await sql.query('select * from groupdata');

    } catch (error) {
        console.log("Creating groupdata table");
        await sql.query(
            "CREATE TABLE IF NOT EXISTS groupdata (groupid TEXT, useprefix BOOL, prefix TEXT, allowabuse BOOL, membercanusebot BOOL, banned_users TEXT[], totalmsgtoday INT, totalmsg INT, autosticker BOOL, nsfw BOOL);"
        );
    }

    try {
        await sql.query('select * from messagecount');
    } catch (error) {
        console.log("Creating messagecount table");
        await sql.query(
            "CREATE TABLE IF NOT EXISTS messagecount (phonenumber TEXT, totalmsgtoday INT, totalmsg INT, dailylimitover BOOL);"
        );
    }
    if (!process.env.WEBSITE_PASSWORD) {
        console.log("WEBSITE_PASSWORD is not set");
        process.exit(1)
    }
    if (!process.env.OWNER_NUMBER) {
        console.log("OWNER_NUMBER is not set");
        process.exit(1)
    }
    if (!(process.env.OWNER_NUMBER.match(/^\d{12}$/) || process.env.OWNER_NUMBER.match(/^\d{11}$/))) {
        console.log("OWNER_NUMBER is not set correctly. Remove + sign if added in the beginning of country code and check if the country code is properly added.");
        process.exit(1)
    }
    if (!process.env.HOSTING_PLATFORM === 'heroku' && !process.env.HOSTING_PLATFORM === "local" && !process.env.HOSTING_PLATFORM === 'qovery') {
        console.log("HOSTING_PLATFORM is not set correctly ");
        process.exit(1)
    }
}))();