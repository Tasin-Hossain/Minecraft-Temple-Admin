import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const defaultTheme = {
  mode: "light",       // light or dark
  background: "#ffffff", // solid background color
  textColor: "#313030",
  theme: "#ffac11",    // primary accent color
  navbar: "left",      // navbar position
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      return saved ? { ...defaultTheme, ...JSON.parse(saved) } : defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  const [draftTheme, setDraftTheme] = useState(theme);
  const [savedAnimation, setSavedAnimation] = useState(false);

  useEffect(() => {
    setDraftTheme(theme);
  }, [theme]);

  // Apply theme to document (shudhu 5 ta property use kore)
  useEffect(() => {
    if (theme.mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Solid background only
    document.body.style.background = theme.background;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    // CSS Variables
    document.documentElement.style.setProperty("--text-color", theme.textColor);
    document.documentElement.style.setProperty("--theme", theme.theme);

    // Save to localStorage
    localStorage.setItem("theme", JSON.stringify(theme));

    // Saved animation
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