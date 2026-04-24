import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function MetricsPanel({ metrics }) {
  const chartData = (metrics?.ticketsPerHour || []).map((row) => ({
    hour: new Date(row.hour).toLocaleTimeString([], { hour: "2-digit" }),
    count: row.count,
  }));

  return (
    <section className="space-y-4 rounded border border-slate-800 bg-slate-900 p-4">
      <h2 className="text-lg font-semibold">Telemetry (Admin)</h2>
      <div className="grid gap-3 md:grid-cols-4">
        <MetricCard label="Classification Accuracy" value={`${(metrics.classificationAccuracy || 0) * 100}%`} />
        <MetricCard label="Avg Resolution Time" value={`${(metrics.avgResolutionTimeHours || 0).toFixed(2)}h`} />
        <MetricCard label="Open Tickets" value={metrics.openCount || 0} />
        <MetricCard label="Resolved Tickets" value={metrics.resolvedCount || 0} />
      </div>
      <div className="h-60 rounded bg-slate-950 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="hour" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#22d3ee" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="rounded border border-slate-800 bg-slate-950 p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-xl font-semibold text-cyan-300">{value}</p>
    </div>
  );
}
