const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? {
          rejectUnauthorized: false,
        }
      : false,
});

async function query(text, params = []) {
  return pool.query(text, params);
}

async function testConnection() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }
  await pool.query("SELECT 1");
}

module.exports = {
  pool,
  query,
  testConnection,
};
