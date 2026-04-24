import { useCallback, useEffect, useState } from "react";
import TicketForm from "../components/TicketForm";
import TicketsTable from "../components/TicketsTable";
import MetricsPanel from "../components/MetricsPanel";
import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { token, isAdmin } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState("");

  const loadTickets = useCallback(async () => {
    try {
      const data = await apiRequest("/api/tickets", { token });
      setTickets(data.tickets || []);
    } catch (loadError) {
      setError(loadError.message);
    }
  }, [token]);

  const loadMetrics = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const data = await apiRequest("/api/metrics", { token });
      setMetrics(data);
    } catch {
      setMetrics(null);
    }
  }, [isAdmin, token]);

  useEffect(() => {
    loadTickets();
    loadMetrics();
  }, [loadMetrics, loadTickets]);


  function handleCreated(ticket) {
    setTickets((previous) => [ticket, ...previous]);
    if (isAdmin) loadMetrics();
  }

  function handleUpdated(ticket) {
    setTickets((previous) => previous.map((entry) => (entry.id === ticket.id ? ticket : entry)));
    if (isAdmin) loadMetrics();
  }

  const openCount = tickets.filter((ticket) => ticket.status === "open").length;
  const resolvedCount = tickets.filter((ticket) => ticket.status === "resolved").length;
  const escalatedCount = tickets.filter((ticket) => ticket.category === "Escalate").length;

  return (
    <div className="space-y-6">
      <section className="animate-fade-up rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5">
        <p className="text-accent text-xs font-medium uppercase tracking-[0.24em]">Support Operations</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">AI Ticket Routing Workspace</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
          Manage incoming tickets, adjust workflow status, and monitor response health from one dashboard.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <StatPill label="Open Tickets" value={openCount} />
          <StatPill label="Resolved Tickets" value={resolvedCount} />
          <StatPill label="Escalated" value={escalatedCount} />
        </div>
      </section>

      {error ? <p className="rounded-xl border border-red-900 bg-red-950 p-3 text-sm text-red-300">{error}</p> : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_1.5fr]">
        <TicketForm onCreated={handleCreated} />
        <TicketsTable tickets={tickets} onUpdated={handleUpdated} />
      </div>

      {isAdmin && metrics ? <MetricsPanel metrics={metrics} /> : null}
    </div>
  );
}

function StatPill({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 transition duration-300 hover:translate-y-[-2px] hover:border-slate-700">
      <p className="text-xs uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p className="text-accent mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
