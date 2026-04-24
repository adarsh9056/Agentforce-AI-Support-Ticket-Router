import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ThemeSwitcher from "./components/ThemeSwitcher";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  const location = useLocation();
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="fixed right-4 top-4 z-50">
        <ThemeSwitcher />
      </div>
      {!isAuthRoute ? <Navbar /> : null}
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
