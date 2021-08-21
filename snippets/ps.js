const { Pool } = require("pg");
var credentials = {};
if (process.env.HOSTING_PLATFORM === "local") {
  credentials = {
    user: "postgres",
    password: "root",
    database: "z",
    host: "localhost",
    port: "5432"
  };
} else if (process.env.HOSTING_PLATFORM === "heroku") {
  credentials = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  };
}
else if (process.env.HOSTING_PLATFORM === "qovery") {
  credentials = {
    connectionString:  process.env.QOVERY_DATABASE_MY_DB_CONNECTION_URI
  };
}
const sql = new Pool(credentials);
module.exports = {
    query: (text, params) => sql.query(text, params)
}
