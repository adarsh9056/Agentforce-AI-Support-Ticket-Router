const { query } = require("../config/db");

async function getMetrics(_req, res) {
  const perHour = await query(
    `SELECT date_trunc('hour', created_at) AS hour, COUNT(*)::int AS count
     FROM tickets
     WHERE created_at >= NOW() - INTERVAL '24 hours'
     GROUP BY hour
     ORDER BY hour ASC`
  );

  const statusCounts = await query(
    `SELECT status, COUNT(*)::int AS count
     FROM tickets
     GROUP BY status`
  );

  const avgResolution = await query(
    `SELECT AVG(EXTRACT(EPOCH FROM (resolved_at - created_at)) / 3600) AS avg_hours
     FROM tickets
     WHERE resolved_at IS NOT NULL`
  );

  const classified = await query(
    `SELECT COUNT(*)::int AS total,
            COUNT(*) FILTER (WHERE category <> 'unclassified')::int AS classified
     FROM tickets`
  );

  const totals = statusCounts.rows.reduce(
    (acc, row) => {
      acc[row.status] = row.count;
      return acc;
    },
    {}
  );

  const totalTickets = classified.rows[0]?.total || 0;
  const classifiedCount = classified.rows[0]?.classified || 0;

  return res.json({
    ticketsPerHour: perHour.rows,
    classificationAccuracy:
      totalTickets > 0 ? Number((classifiedCount / totalTickets).toFixed(2)) : 0,
    avgResolutionTimeHours: Number(avgResolution.rows[0]?.avg_hours || 0),
    openVsClosedRatio: {
      open: totals.open || 0,
      closed: totals.closed || 0,
    },
    openCount: totals.open || 0,
    resolvedCount: totals.resolved || 0,
  });
}

module.exports = {
  getMetrics,
};
