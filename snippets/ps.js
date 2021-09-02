const { Pool } = require("pg");
let credentials = {};
if (process.env.HOSTING_PLATFORM === "local") {
  credentials = {
    connectionString: 'postgres://htifsjyb:wE_ZiBK7GFwPgGOb5au5OtyaPO9LKFw8@chunee.db.elephantsql.com/htifsjyb'
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

const sql = new Pool(credentials)
  

module.exports = {
    query: (text, params) => sql.query(text, params)
}
