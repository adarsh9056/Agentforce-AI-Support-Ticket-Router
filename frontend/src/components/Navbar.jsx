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
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-accent flex items-center gap-2 text-lg font-semibold">
          <span className="badge-accent inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs">
            AI
          </span>
          Agentforce Router
        </Link>
        {user ? (
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-300">
              {user.email} ({user.role})
            </span>
            <button
              type="button"
              onClick={onLogout}
              className="bg-accent rounded-xl px-3 py-1.5 font-medium text-slate-950 hover:opacity-90"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3 text-sm">
            <Link to="/login" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 hover:bg-slate-800">
              Login
            </Link>
            <Link to="/register" className="bg-accent rounded-xl px-3 py-1.5 font-medium text-slate-950">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
