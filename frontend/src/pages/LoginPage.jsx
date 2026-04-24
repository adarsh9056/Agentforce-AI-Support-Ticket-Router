import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    <div className="mx-auto max-w-md rounded border border-slate-800 bg-slate-900 p-6">
      <h1 className="mb-4 text-2xl font-semibold">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <button type="submit" className="w-full rounded bg-cyan-500 py-2 font-medium text-slate-950">
          Sign In
        </button>
      </form>
      <p className="mt-3 text-sm text-slate-400">
        No account? <Link className="text-cyan-400" to="/register">Create one</Link>
      </p>
    </div>
  );
}
