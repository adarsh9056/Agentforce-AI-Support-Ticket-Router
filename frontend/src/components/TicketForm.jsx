import { useState } from "react";
import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function TicketForm({ onCreated }) {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await apiRequest("/api/tickets", {
        token,
        method: "POST",
        body: { title, description, priority },
      });
      onCreated(data.ticket);
      setTitle("");
      setDescription("");
      setPriority("medium");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5">
      <h2 className="text-lg font-semibold text-white">Submit New Ticket</h2>
      <input
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 outline-none ring-cyan-400/30 focus:ring"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="h-28 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 outline-none ring-cyan-400/30 focus:ring"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 outline-none ring-cyan-400/30 focus:ring"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-4 py-2.5 font-semibold text-slate-950 disabled:opacity-60"
      >
        {loading ? "Creating..." : "Create Ticket"}
      </button>
    </form>
  );
}
