const { Pool } = require("pg");

var credentials = {
  connectionString: process.env.DATABASE_URL || process.env.QOVERY_DATABASE_MY_DB_CONNECTION_URI,
  ssl: {rejectUnauthorized: false}
};
if (process.env.NODE_ENV === "development") credentials = {
  user: "postgres",
  password: "root",
  host: "localhost",
  port: "5432",
  database:"bottest"
};

const sql = new Pool(credentials);

module.exports = {
    query: (text, params) => sql.query(text, params)
}
