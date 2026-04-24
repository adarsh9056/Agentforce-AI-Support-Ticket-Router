import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

const statuses = ["open", "in_progress", "resolved", "closed"];

export default function TicketsTable({ tickets, onUpdated }) {
  const { token, isAdmin } = useAuth();

  async function updateStatus(id, status) {
    try {
      const data = await apiRequest(`/api/tickets/${id}/status`, {
        token,
        method: "PATCH",
        body: { status },
      });
      onUpdated(data.ticket);
    } catch {
      // No-op for table UX.
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5">
      <h2 className="mb-3 text-lg font-semibold text-white">Tickets Queue</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="pb-2">Title</th>
              <th className="pb-2">Priority</th>
              <th className="pb-2">Category</th>
              <th className="pb-2">Status</th>
              {isAdmin ? <th className="pb-2">Action</th> : null}
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-t border-slate-800/70">
                <td className="py-3 text-slate-200">{ticket.title}</td>
                <td className="py-3 capitalize text-slate-300">{ticket.priority}</td>
                <td className="py-3">
                  <span className="rounded-full bg-indigo-500/15 px-2 py-1 text-xs text-indigo-300">
                    {ticket.category}
                  </span>
                </td>
                <td className="py-3">
                  <span className="rounded-full bg-cyan-400/10 px-2 py-1 text-xs text-cyan-300">
                    {ticket.status}
                  </span>
                </td>
                {isAdmin ? (
                  <td className="py-3">
                    <select
                      className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5"
                      value={ticket.status}
                      onChange={(event) => updateStatus(ticket.id, event.target.value)}
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
