import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function onLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="border-b border-slate-800 bg-slate-900/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold text-cyan-400">
          Agentforce AI Support Router
        </Link>
        {user ? (
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded bg-slate-800 px-3 py-1 text-slate-300">
              {user.email} ({user.role})
            </span>
            <button
              type="button"
              onClick={onLogout}
              className="rounded bg-cyan-500 px-3 py-1 font-medium text-slate-950 hover:bg-cyan-400"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3 text-sm">
            <Link to="/login" className="rounded bg-slate-800 px-3 py-1 hover:bg-slate-700">
              Login
            </Link>
            <Link to="/register" className="rounded bg-cyan-500 px-3 py-1 font-medium text-slate-950">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
