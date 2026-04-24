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

  return (
    <div className="space-y-6">
      {error ? <p className="rounded border border-red-900 bg-red-950 p-3 text-sm text-red-300">{error}</p> : null}
      <TicketForm onCreated={handleCreated} />
      <TicketsTable tickets={tickets} onUpdated={handleUpdated} />
      {isAdmin && metrics ? <MetricsPanel metrics={metrics} /> : null}
    </div>
  );
}
