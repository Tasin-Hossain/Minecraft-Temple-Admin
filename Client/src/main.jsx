import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./Admin/Components/Themes/ThemeContext.jsx";
import { AdminThemeProvider } from "./Admin/Components/Themes/AdminThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AdminThemeProvider>
      <App />
    </AdminThemeProvider>
  </ThemeProvider>
);
