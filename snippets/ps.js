const { Pool } = require("pg");
let credentials = {};
if (process.env.HOSTING_PLATFORM === "local") {
  if (!process.env.LOCAL_DATABASE_URL) {
    console.log("LOCAL_DATABASE_URL is not set");
    process.exit(1);
  }
  credentials = {
    connectionString: process.env.LOCAL_DATABASE_URL,
};
} else if (process.env.HOSTING_PLATFORM === "heroku") {
  if (!process.env.DATABASE_URL) {
    console.log("Heroku postgres is not set");
    process.exit(1);
  }

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
