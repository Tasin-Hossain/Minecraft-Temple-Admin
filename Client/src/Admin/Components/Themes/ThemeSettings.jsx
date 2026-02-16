import Button, { ButtonRed, IconButton } from "../../../Components/Buttons";
import { useTheme } from "./ThemeContext";
import { CgClose } from "react-icons/cg";

export default function ThemeSettings({ open, setOpen }) {
  const { draftTheme, setDraftTheme, applyTheme, resetTheme, savedAnimation } =
    useTheme();

  if (!draftTheme) return null;

  const colorConfig = {
    light: {
      background: ["#ffffff", "#f5f5f5", "#e8e8e8", "#d0d0d0", "#c6c6c6"],
      text: ["#0d0d0d", "#141414", "#1e1e1e", "#2a2a2a", "#373737"],
    },
    dark: {
      background: ["#0d0d0d", "#141414", "#1e1e1e", "#2a2a2a", "#373737"],
      text: ["#ffffff", "#f5f5f5", "#e8e8e8", "#dcdcdc", "#cfcfcf"],
    },
  };

  const themeColors = ["#8C62FF", "#0CAF60", "#2A85FF", "#FF6B6B", "#F59E0B"];

  const activeMode = draftTheme.mode;
  const activeTheme = draftTheme[activeMode];

  const backgroundColors = colorConfig[activeMode].background;
  const textColors = colorConfig[activeMode].text;

  /* 🔥 FIXED UPDATE FUNCTION */
  const updateDraft = (field, value) => {
    setDraftTheme((prev) => ({
      ...prev,
      [prev.mode]: {
        ...prev[prev.mode],
        [field]: value,
      },
    }));
  };

  const toggleMode = () => {
    setDraftTheme((prev) => ({
      ...prev,
      mode: prev.mode === "dark" ? "light" : "dark",
    }));
  };

  const getContrast = (hex) => {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000" : "#fff";
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          open
            ? "opacity-100 backdrop-blur-sm"
            : "opacity-0 pointer-events-none"
        } bg-black/20`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-100 
        bg-(--sidebar) border-l border-(--border)
        transform transition-transform duration-500 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between px-6 py-5 border-b border-(--border)">
          <h2 className="text-[20px] font-bold tracking-wide ">
            Theme Settings
          </h2>
          <IconButton onClick={() => setOpen(false)}>
            <CgClose size={16} />
          </IconButton>
        </header>

        {savedAnimation && (
          <div className="bg-green-600/90 text-white text-center py-2.5 text-sm font-medium animate-pulse">
            Theme Applied Successfully ✓
          </div>
        )}

        <section className="p-6 space-y-9 overflow-y-auto h-[calc(100%-140px)]">
          {/* MODE */}
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-wider text-(--muted-text) mb-3">
              Mode
            </h3>

            <div className="flex items-center justify-between">
              <p className="text-[13px] capitalize text-(--muted-text) mt-1">
                Switch to {activeMode === "dark" ? "light" : "dark"} mode
              </p>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeMode === "dark"}
                  onChange={toggleMode}
                  className="sr-only peer"
                />
                <div
                  className={`
                      w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-(--theme)/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-0.5 
                      after:bg-white after:border-gray-300 after:border after:rounded-full 
                      after:h-5 after:w-5 after:transition-all
                     peer-checked:bg-(--theme)
                      peer-checked:after:bg-white
                      dark:bg-gray-700 dark:peer-checked:bg-(--theme)
                    `}
                ></div>
              </label>
            </div>
          </div>

          {/* BACKGROUND */}
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-wider text-(--muted-text) mb-3">
              Background
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {backgroundColors.map((c) => (
                <button
                  key={c}
                  onClick={() => updateDraft("background", c)}
                  style={{ backgroundColor: c }}
                  className={`w-6 h-6 rounded-full border transition-all hover:scale-110 ${
                    activeTheme.background === c
                      ? "border-(--theme) scale-110 shadow-md"
                      : "border-(--text)"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* TEXT */}
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-wider text-(--muted-text) mb-3">
              Text Color
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {textColors.map((c) => (
                <button
                  key={c}
                  onClick={() => updateDraft("textColor", c)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center hover:scale-110 ${
                    activeTheme.textColor === c
                      ? "border-(--theme) scale-110 shadow-md"
                      : "border-(--text)"
                  }`}
                  style={{ backgroundColor: c }}
                >
                  <span
                    style={{ color: getContrast(c) }}
                    className="text-[12px] font-bold"
                  >
                    A
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* THEME */}
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-wider text-(--muted-text) mb-3">
              Theme
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {themeColors.map((c) => (
                <button
                  key={c}
                  onClick={() => updateDraft("theme", c)}
                  className={`w-6 h-6 rounded-full border-2 hover:scale-110 ${
                    activeTheme.theme === c
                      ? "border-(--theme) scale-110 shadow-md"
                      : "border-(--text)"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-5 border-t border-(--border)">
            <Button onClick={applyTheme}>Apply Theme</Button>
            <ButtonRed onClick={resetTheme}>Reset to Default</ButtonRed>
          </div>
        </section>
      </aside>
    </>
  );
}
