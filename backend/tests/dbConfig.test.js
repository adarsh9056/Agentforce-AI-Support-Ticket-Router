const { createPoolConfig, sanitizeConnectionString } = require("../src/config/dbConfig");

describe("sanitizeConnectionString", () => {
  it("removes SSL query params that override explicit pool SSL config", () => {
    const connectionString =
      "postgresql://user:pass@db.example.com:5432/app?sslmode=require&ssl=true&application_name=render";

    expect(sanitizeConnectionString(connectionString)).toBe(
      "postgresql://user:pass@db.example.com:5432/app?application_name=render"
    );
  });
});

describe("createPoolConfig", () => {
  it("forces the intended production SSL config for hosted Postgres URLs", () => {
    const config = createPoolConfig({
      DATABASE_URL:
        "postgresql://user:pass@db.example.com:5432/app?sslmode=require&application_name=render",
      NODE_ENV: "production",
    });

    expect(config.connectionString).toBe(
      "postgresql://user:pass@db.example.com:5432/app?application_name=render"
    );
    expect(config.ssl).toEqual({ rejectUnauthorized: false });
  });

  it("keeps SSL disabled outside production", () => {
    const config = createPoolConfig({
      DATABASE_URL: "postgresql://user:pass@localhost:5432/app?sslmode=disable",
      NODE_ENV: "development",
    });

    expect(config.connectionString).toBe(
      "postgresql://user:pass@localhost:5432/app?sslmode=disable"
    );
    expect(config.ssl).toBe(false);
  });

  it("allows opting back into certificate verification", () => {
    const config = createPoolConfig({
      DATABASE_URL: "postgresql://user:pass@db.example.com:5432/app?sslmode=require",
      NODE_ENV: "production",
      PGSSL_REJECT_UNAUTHORIZED: "true",
    });

    expect(config.ssl).toEqual({ rejectUnauthorized: true });
  });
});
