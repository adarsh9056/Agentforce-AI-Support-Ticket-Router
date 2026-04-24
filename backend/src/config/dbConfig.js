const SSL_QUERY_KEYS = [
  "ssl",
  "sslmode",
  "sslcert",
  "sslkey",
  "sslrootcert",
  "uselibpqcompat",
];

function parseBoolean(value) {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return undefined;
}

function sanitizeConnectionString(connectionString) {
  if (!connectionString) {
    return connectionString;
  }

  let url;

  try {
    url = new URL(connectionString);
  } catch {
    return connectionString;
  }

  for (const key of SSL_QUERY_KEYS) {
    url.searchParams.delete(key);
  }

  return url.toString();
}

function createSslConfig(env = process.env) {
  if (env.NODE_ENV !== "production") {
    return false;
  }

  return {
    rejectUnauthorized: parseBoolean(env.PGSSL_REJECT_UNAUTHORIZED) ?? false,
  };
}

function createPoolConfig(env = process.env) {
  const ssl = createSslConfig(env);

  return {
    connectionString: ssl ? sanitizeConnectionString(env.DATABASE_URL) : env.DATABASE_URL,
    ssl,
  };
}

module.exports = {
  createPoolConfig,
  createSslConfig,
  sanitizeConnectionString,
};
