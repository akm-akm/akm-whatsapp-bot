const { Pool } = require("pg");

const heroku = {
  connectionString: process.env.DATABASE_URL,
 // ssl: {rejectUnauthorized: false}
};
const config = {
 
  user: "postgres",
  password: "root",
  host: "localhost",
  port: "5432",
  database:"bottest"
};
const sql = new Pool(heroku);
module.exports = {
    query: (text, params) => sql.query(text, params)
}
