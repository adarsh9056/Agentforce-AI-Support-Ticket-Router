const { z } = require("zod");
const { query } = require("../config/db");
const { classifyTicket } = require("../services/aiService");
const { logTelemetry } = require("../services/telemetryService");

const createTicketSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(10),
  priority: z.enum(["low", "medium", "high", "critical"]),
});

const updateStatusSchema = z.object({
  status: z.enum(["open", "in_progress", "resolved", "closed"]),
});

async function createTicket(req, res) {
  const data = createTicketSchema.parse(req.body);

  const aiResult = await classifyTicket(data);
  const insert = await query(
    `INSERT INTO tickets (user_id, title, description, priority, category, ai_confidence, ai_reasoning)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      req.user.id,
      data.title,
      data.description,
      data.priority,
      aiResult.category,
      aiResult.confidence,
      aiResult.reasoning,
    ]
  );

  const ticket = insert.rows[0];
  await logTelemetry(ticket.id, "ticket_created", {
    category: ticket.category,
    priority: ticket.priority,
  });

  return res.status(201).json({ ticket });
}

async function getTickets(req, res) {
  const isAdmin = req.user.role === "admin";
  const sql = isAdmin
    ? "SELECT * FROM tickets ORDER BY created_at DESC"
    : "SELECT * FROM tickets WHERE user_id = $1 ORDER BY created_at DESC";
  const params = isAdmin ? [] : [req.user.id];

  const result = await query(sql, params);
  return res.json({ tickets: result.rows });
}

async function updateTicketStatus(req, res) {
  const data = updateStatusSchema.parse(req.body);

  const update = await query(
    `UPDATE tickets
     SET status = $1,
         resolved_at = CASE WHEN $1 IN ('resolved', 'closed') THEN NOW() ELSE resolved_at END
     WHERE id = $2
     RETURNING *`,
    [data.status, req.params.id]
  );

  if (update.rowCount === 0) {
    return res.status(404).json({ message: "Ticket not found." });
  }

  const ticket = update.rows[0];
  await logTelemetry(ticket.id, "ticket_status_updated", { status: ticket.status });

  return res.json({ ticket });
}

module.exports = {
  createTicket,
  getTickets,
  updateTicketStatus,
};
