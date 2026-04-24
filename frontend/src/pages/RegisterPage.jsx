import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    <div className="mx-auto max-w-md rounded border border-slate-800 bg-slate-900 p-6">
      <h1 className="mb-4 text-2xl font-semibold">Register</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2"
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          required
        />
        <input
          className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          required
        />
        <input
          type="password"
          className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
          required
        />
        <select
          className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2"
          value={form.role}
          onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <button type="submit" className="w-full rounded bg-cyan-500 py-2 font-medium text-slate-950">
          Create Account
        </button>
      </form>
      <p className="mt-3 text-sm text-slate-400">
        Already registered? <Link className="text-cyan-400" to="/login">Sign in</Link>
      </p>
    </div>
  );
}
