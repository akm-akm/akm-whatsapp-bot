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
 
  user: "postgres",
  password: "root",
  host: "localhost",
  port: "5432",
  database:"bottest"
};

const sql = new Pool(local);
module.exports = {
    query: (text, params) => sql.query(text, params)
}
