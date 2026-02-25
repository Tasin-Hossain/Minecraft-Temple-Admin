// src/utils/applyTheme.js
export const applyThemeToDocument = (themeObj, mode) => {
  const active = themeObj[mode] || themeObj.light;

  // Dark mode class
  document.documentElement.classList.toggle("dark", mode === "dark");

  // Common variables
  document.documentElement.style.setProperty("--theme", active.theme || "#ffac11");
  document.documentElement.style.setProperty("--text-color", active.textColor);
  document.documentElement.style.setProperty("--background", active.background);

  // Admin-specific variables (যদি থাকে)

  if (active.cardBg) {
    document.documentElement.style.setProperty("--card-bg", active.cardBg);
  }
  if (active.sidebarBg) {
    document.documentElement.style.setProperty("--sidebar-bg", active.sidebarBg);
  }
  if (themeObj.fontSizeScale) {
    document.documentElement.style.setProperty("--font-size-scale", themeObj.fontSizeScale);
  }

  // Gradient override (শুধু admin-এর জন্য)
  if (themeObj.gradient?.enabled) {
    const grad = `linear-gradient(${themeObj.gradient.direction}, ${themeObj.gradient.color1}, ${themeObj.gradient.color2})`;
    document.documentElement.style.setProperty("--background", grad);
  }

  // Body background (fallback)
  document.body.style.background = active.background;
};