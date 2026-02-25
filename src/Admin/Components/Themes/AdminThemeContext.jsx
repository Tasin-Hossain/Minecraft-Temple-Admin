// src/context/AdminThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { applyThemeToDocument } from "../../../Utils/applyTheme.js";

const AdminThemeContext = createContext();
export const useAdminTheme = () => useContext(AdminThemeContext);

const defaultAdminTheme = {
  mode: "light",
  primary: "#3f51b5",
  light: {
    background: "#f4f6f8",
    textColor: "#313030",
    theme: "#ffac11",
    cardBg: "#ffffff",
    sidebarBg: "#ffffff",
    textPrimary: "#000000",
  },
  dark: {
    background: "#0f172a",
    textColor: "#f5f5f5",
    theme: "#ffac11",
    cardBg: "#1e293b",
    sidebarBg: "#1e293b",
    textPrimary: "#f1f5f9",
  },
  gradient: {
    enabled: false,
    color1: "#667eea",
    color2: "#764ba2",
    direction: "to right bottom",
  },
  fontSizeScale: 1.0,
};

export const AdminThemeProvider = ({ children }) => {
  const [adminTheme, setAdminTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("adminTheme");
      return saved ? { ...defaultAdminTheme, ...JSON.parse(saved) } : defaultAdminTheme;
    } catch {
      return defaultAdminTheme;
    }
  });

  const [draftAdminTheme, setDraftAdminTheme] = useState(adminTheme);
  const [savedAnimation, setSavedAnimation] = useState(false);

  useEffect(() => {
    setDraftAdminTheme(adminTheme);
  }, [adminTheme]);

  useEffect(() => {
    applyThemeToDocument(adminTheme, adminTheme.mode);

    localStorage.setItem("adminTheme", JSON.stringify(adminTheme));

    setSavedAnimation(true);
    const timer = setTimeout(() => setSavedAnimation(false), 1800);
    return () => clearTimeout(timer);
  }, [adminTheme]);

  const applyAdminTheme = () => setAdminTheme(draftAdminTheme);

  const resetAdminTheme = () => {
    setAdminTheme(defaultAdminTheme);
    setDraftAdminTheme(defaultAdminTheme);
    localStorage.removeItem("adminTheme");
  };

  return (
    <AdminThemeContext.Provider
      value={{
        adminTheme,
        draftAdminTheme,
        setDraftAdminTheme,
        applyAdminTheme,
        resetAdminTheme,
        savedAnimation,
      }}
    >
      {children}
    </AdminThemeContext.Provider>
  );
};