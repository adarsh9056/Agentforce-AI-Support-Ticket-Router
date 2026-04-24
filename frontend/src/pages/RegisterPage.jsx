import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthShowcase from "../components/AuthShowcase";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      await register(form.name, form.email, form.password, form.role);
      navigate("/");
    } catch (registerError) {
      setError(registerError.message);
    }
  }

  return (
    <div className="grid min-h-[calc(100svh-6rem)] items-center gap-8 py-6 lg:grid-cols-[1fr_1.05fr]">
      <AuthShowcase
        title="Create your support command center."
        subtitle="Spin up your workspace and start routing customer requests with AI confidence."
      />

      <section className="animate-fade-up rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">Create account</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white">Set up your Agentforce profile</h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
          Register as user or admin and start managing ticket flow with priority-based triage.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/30 transition duration-300 focus:-translate-y-[1px] focus:ring"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            required
          />
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/30 transition duration-300 focus:-translate-y-[1px] focus:ring"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            required
          />
          <input
            type="password"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/30 transition duration-300 focus:-translate-y-[1px] focus:ring"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            required
          />
          <select
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-400/30 transition duration-300 focus:-translate-y-[1px] focus:ring"
            value={form.role}
            onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
          >
            <option value="user">Role: User</option>
            <option value="admin">Role: Admin</option>
          </select>

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 py-3 font-semibold text-slate-950 transition duration-300 hover:translate-y-[-1px] hover:opacity-90"
          >
            Create account
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-400">
          Already have access?{" "}
          <Link className="font-medium text-cyan-400 hover:text-cyan-300" to="/login">
            Sign in
          </Link>
        </p>
      </section>
    </div>
  );
}
