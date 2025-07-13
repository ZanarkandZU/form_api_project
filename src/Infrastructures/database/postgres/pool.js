/* istanbul ignore file */
const { Pool } = require('pg');

const testConfig = {
  connectionString: process.env.DATABASE_URL_TEST,
  ssl: { rejectUnauthorized: false },
};

const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};

const pool =
  process.env.NODE_ENV === 'test' ? new Pool(testConfig) : new Pool(config);

module.exports = pool;
