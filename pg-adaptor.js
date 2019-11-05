require('dotenv').config()
const pgPromise = require('pg-promise');

const pgp = pgPromise({
  error(err, e) {
    console.log("Database Error: ", err)
  }
});
const db = pgp(process.env.DATABASE_URL);

exports.db = db;