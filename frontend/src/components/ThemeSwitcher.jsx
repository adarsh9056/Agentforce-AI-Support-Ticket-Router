import { useTheme } from "../context/ThemeContext";

const labels = {
  green: "Green",
  pink: "Pink",
  mono: "Mono",
};

export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="rounded-xl border border-slate-700/80 bg-slate-950/90 p-1.5 backdrop-blur">
      <div className="flex items-center gap-1">
        {themes.map((entry) => (
          <button
            key={entry}
            type="button"
            onClick={() => setTheme(entry)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
              theme === entry
                ? "bg-slate-100 text-slate-900"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            {labels[entry]}
          </button>
        ))}
      </div>
    </div>
  );
}
