const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { query } = require("../config/db");

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["user", "admin"]).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
}

async function register(req, res) {
  const data = registerSchema.parse(req.body);

  const exists = await query("SELECT id FROM users WHERE email = $1", [data.email]);
  if (exists.rowCount > 0) {
    return res.status(409).json({ message: "Email already registered." });
  }

  const passwordHash = await bcrypt.hash(data.password, 12);
  const result = await query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role, created_at`,
    [data.name, data.email, passwordHash, data.role || "user"]
  );

  const user = result.rows[0];
  return res.status(201).json({
    user,
    token: signToken(user),
  });
}

async function login(req, res) {
  const data = loginSchema.parse(req.body);
  const result = await query("SELECT * FROM users WHERE email = $1", [data.email]);

  if (result.rowCount === 0) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const user = result.rows[0];
  const isValid = await bcrypt.compare(data.password, user.password_hash);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  return res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token: signToken(user),
  });
}

module.exports = {
  register,
  login,
};
