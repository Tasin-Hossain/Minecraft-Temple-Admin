import Button, {
  ButtonPrimary,
  ButtonRed,
  IconButton,
} from "../../../Components/Buttons";
import { useTheme } from "./ThemeContext";
import { CgClose } from "react-icons/cg";

export default function ThemeSettings({ open, setOpen }) {
  const { draftTheme, setDraftTheme, applyTheme, resetTheme, savedAnimation } =
    useTheme();

  if (!draftTheme) return null;

  const themeColors = [
    "#fb732c", // Deep purple-blue dark bg (enchanting table vibe)
    "#8C62FF", // Primary bg
    "#0CAF60", // Cards / sidebar
    "#2A85FF", // Hover / active states
    "#18181B", // Medium sections
  ];
  const textColor = [
    "#0d0d0d", // Deepest bg – main layout
    "#141414", // Primary bg / cards
    "#1e1e1e", // Secondary panels / sidebar
    "#2a2a2a", // Hover / borders
    "#373737", // Inventory-style medium gray (from real MC GUI)
  ];
  const backgroundColor = [
    "#ffffff", // Pure white – brightest bg, headers or main cards
    "#f5f5f5", // Very light gray – soft main background
    "#e8e8e8", // Light gray – secondary sections / panels
    "#d0d0d0", // Medium light gray – subtle borders / dividers
    "#c6c6c6", // Classic Minecraft inventory light gray
  ];
  // Generic updater for top-level fields
  const updateDraft = (field, value) => {
    setDraftTheme((prev) => ({ ...prev, [field]: value }));
  };

  // Gradient updater
  const updateGradient = (field, value) => {
    setDraftTheme((prev) => ({
      ...prev,
      gradient: { ...prev.gradient, [field]: value },
    }));
  };

  // Scheduler updater
  const updateScheduler = (field, value) => {
    setDraftTheme((prev) => ({
      ...prev,
      scheduler: { ...prev.scheduler, [field]: value },
    }));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          open
            ? "opacity-100 backdrop-blur-sm"
            : "opacity-0 pointer-events-none"
        } bg-black/20`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-100 
          bg-(--sidebar) 
          border-l border-(--border)
          transform transition-transform duration-500 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between px-6 py-5 border-b border-(--border)">
          <h2 className="text-[20px] font-bold tracking-wide text-(--text)">
            Theme Settings
          </h2>
          <IconButton>
            <CgClose size={16} onClick={() => setOpen(false)} />
          </IconButton>
        </header>

        {savedAnimation && (
          <div className="bg-green-600/90 text-(--text) text-center py-2.5 text-sm font-medium animate-pulse">
            Theme Applied Successfully ✓
          </div>
        )}

        <section className="p-6 space-y-9 overflow-y-auto h-[calc(100%-140px)]">
          {/* ── Mode Toggle ── */}
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-wider text-(--muted-text) mb-3">
              Mode
            </h3>

            <div className="flex items-center justify-between">
              <p className="text-[13px] capitalize text-(--text) mt-1">
                Switch to {draftTheme.mode === "dark" ? "light" : "dark"} mode
              </p>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={draftTheme.mode === "dark"}
                  onChange={() =>
                    updateDraft(
                      "mode",
                      draftTheme.mode === "dark" ? "light" : "dark",
                    )
                  }
                  className="sr-only peer"
                />
                <div
                  className={`
                    w-11 h-6 bg-gray-200 peer-focus:outline-none 
                    peer-focus:ring-2 peer-focus:ring-(--theme)/50 rounded-full peer 
                    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                    after:content-[''] after:absolute after:top-0.5 after:start-0.5 
                   after:bg-white after:border-gray-300 after:border after:rounded-full 
                    after:h-5 after:w-5 after:transition-all
                    peer-checked:bg-(--theme)  /* accent color like #ffac11 or green */
                    peer-checked:after:bg-white
                   dark:bg-gray-700 dark:peer-checked:bg-(--theme)
                  `}
                ></div>
              </label>
            </div>
          </div>

          {/* ── Background ── */}
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-wider text-(--muted-text) mb-3">
              Background
            </h3>

            <div className="mb-5">
              <div className="flex flex-wrap gap-2.5 mb-4">
                {backgroundColor.map((c) => (
                  <button
                    key={c}
                    onClick={() => updateDraft("background", c)}
                    style={{ backgroundColor: c }}
                    className={`w-6 h-6 rounded-full border transition-all cursor-pointer hover:scale-110 ${
                      draftTheme.background === c
                        ? "border-(--theme) scale-110 shadow-md"
                        : " border-(--text)"
                    }`}
                    title={c}
                  />
                ))}
              </div>
              {/* <input
                type="color"
                value={draftTheme.background}
                onChange={(e) => updateDraft("background", e.target.value)}
                className="w-full h-11 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-600"
              /> */}
            </div>
          </div>

          {/* ── Text Color ── */}
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-wider text-(--muted-text) mb-3">
              Text Color
            </h3>
            <div className="flex flex-wrap gap-2.5 mb-4">
              {textColor.map((c) => (
                <button
                  key={c}
                  onClick={() => updateDraft("textColor", c)}
                  className={`w-6 h-6 cursor-pointer rounded-full border-2 flex items-center justify-center transition-all hover:scale-110 ${
                    draftTheme.textColor === c
                      ? "border-(--theme) scale-110 shadow-md"
                      : "border-(--text)"
                  }`}
                  style={{ backgroundColor: c }}
                  title={c}
                >
                  <span
                    style={{ color: c === "#ffffff" ? "#000" : "#fff" }}
                    className="text-[12px] font-bold"
                  >
                    A
                  </span>
                </button>
              ))}
            </div>
            {/* <input
              type="color"
              value={draftTheme.textColor}
              onChange={(e) => updateDraft("textColor", e.target.value)}
              className="w-full h-11 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-600"
            /> */}
          </div>

          {/* ── Theme Color ── */}
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-wider text-(--muted-text) mb-3">
              Theme
            </h3>
            <div className="flex flex-wrap gap-2.5 mb-4">
              {themeColors.map((c) => (
                <button
                  key={c}
                  onClick={() => updateDraft("theme", c)}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 flex items-center justify-center transition-all hover:scale-110  ${
                    draftTheme.theme === c
                      ? "border-(--theme) scale-110 shadow-md"
                      : "border-(--text)"
                  }`}
                  style={{ backgroundColor: c }}
                  title={c}
                ></button>
              ))}
            </div>
            {/* <input
              type="color"
              value={draftTheme.theme}
              onChange={(e) => updateDraft("theme", e.target.value)}
              className="w-full h-11 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-600"
            /> */}
          </div>

          {/* ── Actions ── */}
          <div className="flex items-center gap-2  pt-5 border-t border-(--border)">
            <Button onClick={applyTheme}>Apply Theme</Button>

            <ButtonRed onClick={resetTheme} className="text-white ">
              Reset to Default
            </ButtonRed>
          </div>
        </section>
      </aside>
    </>
  );
}
