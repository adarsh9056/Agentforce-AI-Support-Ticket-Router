import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);
const THEMES = ["green", "pink", "mono"];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return THEMES.includes(saved) ? saved : "green";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    root.classList.remove("theme-green", "theme-pink", "theme-mono");
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      themes: THEMES,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
