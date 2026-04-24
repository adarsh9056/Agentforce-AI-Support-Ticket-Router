const { query } = require("../config/db");

async function logTelemetry(ticketId, eventType, eventData = {}) {
  await query(
    `INSERT INTO telemetry_logs (ticket_id, event_type, event_data)
     VALUES ($1, $2, $3)`,
    [ticketId, eventType, eventData]
  );
}

module.exports = {
  logTelemetry,
};
