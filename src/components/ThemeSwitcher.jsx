import { themes, useTheme } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { themeName, setTheme } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-center">
      <div className="bg-white/80 backdrop-blur rounded-2xl p-2 flex flex-col gap-2 shadow-lg border border-gray-200">
        {Object.entries(themes).map(([key, t]) => (
          <button
            key={key}
            onClick={() => setTheme(key)}
            title={t.name}
            style={{ backgroundColor: t.dot }}
            className={`w-7 h-7 rounded-full transition-transform hover:scale-110 ${
              themeName === key ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
