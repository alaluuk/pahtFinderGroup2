require('dotenv').config();
const pgPromise = require('pg-promise');
const { logger } = require("./log-adaptor");

const pgp = pgPromise({
  error(err, e) {
    logger.error("database error: %s", err, { service: 'nodejs-postgres' });
  }
});
const db = pgp(process.env.DATABASE_URL);

exports.db = db;