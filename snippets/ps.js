const { Pool } = require("pg");

const heroku = {
  connectionString: process.env.DATABASE_URL,
  ssl: {rejectUnauthorized: false}
};
const local = {
 
  user: "postgres",
  password: "root",
  host: "localhost",
  port: "5432",
  database:"bottest"
};
const qovery = {
  connectionString: process.env.QOVERY_DATABASE_MY_DB_CONNECTION_URI,
};

const sql = new Pool(heroku);
module.exports = {
    query: (text, params) => sql.query(text, params)
}
