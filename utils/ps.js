const { Pool } = require("pg");
const credentials = {};

if (!process.env.DATABASE_URL) {
  credentials.connectionString = process.env.LOCAL_DATABASE_URL;
} else {
  credentials.connectionString = process.env.DATABASE_URL;
  credentials.ssl = { rejectUnauthorized: false };
}

const sql = new Pool(credentials);

module.exports = {
  query: (text, params) => sql.query(text, params),
};
