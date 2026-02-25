// src/context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const defaultTheme = {
  mode: "light",
  light: {
    background: "#ffffff",
    textColor: "#313030",
    theme: "#ffac11",
  },
  dark: {
    background: "#141414",
    textColor: "#f5f5f5",
    theme: "#ffac11",
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (!saved) return defaultTheme;

      const parsed = JSON.parse(saved);

      // সঠিকভাবে merge করা — nested objects preserve করতে হবে
      return {
        ...defaultTheme,
        ...parsed,
        light: {
          ...defaultTheme.light,
          ...parsed.light,
        },
        dark: {
          ...defaultTheme.dark,
          ...parsed.dark,
        },
      };
    } catch (err) {
      console.error("Theme parse error:", err);
      return defaultTheme;
    }
  });

  const [draftTheme, setDraftTheme] = useState(theme);
  const [savedAnimation, setSavedAnimation] = useState(false);

  // draft sync
  useEffect(() => {
    setDraftTheme(theme);
  }, [theme]);

  // apply theme to document
  useEffect(() => {
    const active = theme[theme.mode] || theme.light;

    document.documentElement.classList.toggle("dark", theme.mode === "dark");
    document.body.style.background = active.background;

    document.documentElement.style.setProperty("--text-color", active.textColor);
    document.documentElement.style.setProperty("--theme", active.theme);

    // প্রতিবার theme change-এ save (এটা ঠিক আছে)
    localStorage.setItem("theme", JSON.stringify(theme));

    setSavedAnimation(true);
    const timer = setTimeout(() => setSavedAnimation(false), 1800);
    return () => clearTimeout(timer);
  }, [theme]);

  const applyTheme = () => {
    setTheme(draftTheme);
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
    setDraftTheme(defaultTheme);
    localStorage.removeItem("theme");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        draftTheme,
        setDraftTheme,
        applyTheme,
        resetTheme,
        savedAnimation,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};