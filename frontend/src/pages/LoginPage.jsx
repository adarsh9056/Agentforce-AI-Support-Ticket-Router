import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthShowcase from "../components/AuthShowcase";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (loginError) {
      setError(loginError.message);
    }
  }

  return (
    <div className="grid min-h-[calc(100svh-6rem)] items-center gap-8 py-6 lg:grid-cols-[1.05fr_1fr]">
      <section className="animate-fade-up rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur">
        <p className="text-accent text-xs font-medium uppercase tracking-[0.2em]">Welcome back</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white">Sign in to Agentforce Router</h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
          Access routing controls, assign tickets quickly, and monitor support telemetry in real time.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.14em] text-slate-300">Email address</span>
            <input
              className="input-accent w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition duration-300 focus:-translate-y-[1px]"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.14em] text-slate-300">Password</span>
            <input
              type="password"
              className="input-accent w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition duration-300 focus:-translate-y-[1px]"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}

          <button
            type="submit"
            className="bg-accent-gradient w-full rounded-xl py-3 font-semibold text-slate-950 transition duration-300 hover:translate-y-[-1px] hover:opacity-90"
          >
            Sign in
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-400">
          New to Agentforce?{" "}
          <Link className="text-accent font-medium hover:opacity-80" to="/register">
            Create an account
          </Link>
        </p>
      </section>

      <AuthShowcase
        title="From incoming issue to resolved ticket, faster."
        subtitle="Built for support teams that need clean triage, confident assignments, and measurable outcomes."
      />
    </div>
  );
}
