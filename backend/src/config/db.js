const { Pool } = require("pg");
const { createPoolConfig } = require("./dbConfig");

const pool = new Pool(createPoolConfig());

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
