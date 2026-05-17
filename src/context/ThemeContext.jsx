import { createContext, useContext, useState } from "react";

export const themes = {
  bratz: {
    name: "Bratz",
    dot: "#f500a0",
    bg: "#fff0f6",
    accent: "#f500a0",
    secondary: "#84cc16",
    text: "#1a001a",
    textMuted: "#6b006b",
    card: "#ffffff",
    cardBorder: "#f9a8d4",
    cardInner: "#fce7f3",
    nav: "#f500a0",
    navBorder: "#84cc16",
    navText: "#ffffff",
    navMuted: "rgba(255,255,255,0.6)",
    btnText: "#ffffff",
    btnSecText: "#1a001a",
  },
  cyber: {
    name: "Cyber",
    dot: "#bf00ff",
    bg: "#0f0020",
    accent: "#bf00ff",
    secondary: "#00ffe7",
    text: "#f0e6ff",
    textMuted: "#b388ff",
    card: "#1a0035",
    cardBorder: "#bf00ff",
    cardInner: "#2d0050",
    nav: "#0a0015",
    navBorder: "#bf00ff",
    navText: "#f0e6ff",
    navMuted: "#b388ff",
    btnText: "#0f0020",
    btnSecText: "#0f0020",
  },
  bubblegum: {
    name: "Bubblegum",
    dot: "#0099ff",
    bg: "#e8f4ff",
    accent: "#0099ff",
    secondary: "#ff99cc",
    text: "#001a33",
    textMuted: "#004080",
    card: "#ffffff",
    cardBorder: "#99d6ff",
    cardInner: "#cce8ff",
    nav: "#0099ff",
    navBorder: "#ff99cc",
    navText: "#ffffff",
    navMuted: "rgba(255,255,255,0.7)",
    btnText: "#ffffff",
    btnSecText: "#001a33",
  },
  alien: {
    name: "Alien",
    dot: "#39ff14",
    bg: "#0a0a0a",
    accent: "#39ff14",
    secondary: "#ffffff",
    text: "#ccffcc",
    textMuted: "#88cc88",
    card: "#111111",
    cardBorder: "#39ff14",
    cardInner: "#1a2a1a",
    nav: "#000000",
    navBorder: "#39ff14",
    navText: "#39ff14",
    navMuted: "#88cc88",
    btnText: "#0a0a0a",
    btnSecText: "#0a0a0a",
  },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(
    () => localStorage.getItem("theme") ?? "bratz"
  );

  function setTheme(name) {
    setThemeName(name);
    localStorage.setItem("theme", name);
  }

  return (
    <ThemeContext.Provider value={{ theme: themes[themeName], themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
