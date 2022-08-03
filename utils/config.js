const path = require("path");
const sql = require(path.join(__dirname, "./ps"));
const { main } = require(path.join(__dirname, "../events/events.js"));
const fs = require("fs");
const chalk = require("chalk");
(botsettingcheck = async () => {
  if (!process.env.WEBSITE_PASSWORD) {
    console.log(chalk.bgRed("WEBSITE_PASSWORD is not set"));
    process.exit(1);
  }
  if (!process.env.OWNER_NUMBER) {
    console.log(chalk.bgRed("OWNER_NUMBER whatsapp number is not set"));
    process.exit(1);
  }
  if (
    !(
      process.env.OWNER_NUMBER.match(/^\d{14}$/) ||
      process.env.OWNER_NUMBER.match(/^\d{13}$/) ||
      process.env.OWNER_NUMBER.match(/^\d{12}$/) ||
      process.env.OWNER_NUMBER.match(/^\d{11}$/)
    )
  ) {
    console.log(
      chalk.bgRed(
        "OWNER_NUMBER is not set correctly. Remove + sign if added in the beginning of country code and check if the country code is properly added."
      )
    );
    process.exit(1);
  }
  if (!process.env.DATABASE_URL && !process.env.LOCAL_DATABASE_URL) {
    console.log(
      chalk.bgRed(
        "You are running locally on your pc so you must provide a database url. See the setup guide."
      )
    );
    process.exit(1);
  }
  try {
    fs.unlinkSync(path.join(__dirname, "../auth_info_baileys/creds.json"));
  } catch (error) {}
  try {
    let bdata = await sql.query("select * from botdata");
    let botdata = bdata.rows[0];
    if (botdata.isconnected || process.env.NODE_ENV !== "production") main();
  } catch (error) {
    console.log(chalk.bgRed("Creating botdata table"));

    await sql.query(
      "CREATE TABLE IF NOT EXISTS botdata (isconnected BOOL, allowinboxuse BOOL, allowabuse BOOL, moderators TEXT[], banned_users TEXT[], boturl TEXT, totalmsgtoday INT, totalmsg INT, dailylimit INT, dailygrouplimit INT,  mingroupsize INT);"
    );
    await sql.query(
      `INSERT INTO botdata VALUES (false, true, false, '{''}' , '{''}','', 0, 0,70,100,3);`
    );
    botsettingcheck();
  }

  try {
    await sql.query("select * from messagecount");
  } catch (error) {
    console.log(chalk.bgRed("Creating messagecount table"));
    await sql.query(
      "CREATE TABLE IF NOT EXISTS messagecount (phonenumber TEXT, totalmsgtoday INT, totalmsg INT, dailylimitover BOOL);"
    );
  }
 

  try {
    await sql.query("select * from groupdata");
  } catch (error) {
    console.log(chalk.bgRed("Creating groupdata table"));
    await sql.query(
      "CREATE TABLE IF NOT EXISTS groupdata (groupid TEXT, useprefix BOOL, prefix TEXT, allowabuse BOOL, membercanusebot BOOL, banned_users TEXT[], totalmsgtoday INT, totalmsg INT, autosticker BOOL, nsfw BOOL);"
    );
  }
})();
