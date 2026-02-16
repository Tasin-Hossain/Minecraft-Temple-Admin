// src/components/AdminThemeChange.jsx
import React from 'react';
import { 
  MdDarkMode, 
  MdLightMode, 
  MdSave, 
  MdRefresh, 
  MdPalette, 
  MdGradient, 
  MdFormatSize, 
  MdFormatPaint
} from 'react-icons/md';
import { HexColorPicker } from 'react-colorful';
import { useAdminTheme } from '../../Components/Themes/AdminThemeContext'; // তোমার path অনুযায়ী adjust করো

const AdminThemeChange = () => {
  const {
    draftAdminTheme,
    setDraftAdminTheme,
    applyAdminTheme,
    resetAdminTheme,
    savedAnimation,
  } = useAdminTheme();

  const handleSave = () => {
    applyAdminTheme();
    // savedAnimation true হয়ে যাবে → চাইলে UI-তে toast বা indicator দেখাতে পারো
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-800 dark:text-gray-100">
          <MdPalette className="text-4xl text-[var(--primary)]" />
          Admin Theme Customizer
        </h1>

        <div className="flex gap-4">
          <button
            onClick={resetAdminTheme}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition shadow-sm"
          >
            <MdRefresh /> Reset to Default
          </button>

          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-white transition shadow-md ${
              savedAnimation 
                ? 'bg-green-600 scale-105' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            <MdSave /> {savedAnimation ? 'Saved!' : 'Apply & Save'}
          </button>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MdDarkMode /> Theme Mode
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => setDraftAdminTheme(prev => ({ ...prev, mode: 'light' }))}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
              draftAdminTheme.mode === 'light'
                ? 'bg-[var(--primary)] text-white shadow-lg scale-105'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <MdLightMode className="inline mr-2" />
            Light
          </button>

          <button
            onClick={() => setDraftAdminTheme(prev => ({ ...prev, mode: 'dark' }))}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
              draftAdminTheme.mode === 'dark'
                ? 'bg-[var(--primary)] text-white shadow-lg scale-105'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <MdDarkMode className="inline mr-2" />
            Dark
          </button>
        </div>
      </div>

      <div className="space-y-8">

        {/* Primary Color */}
        <section className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
            <MdPalette /> Primary Color
          </h2>
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <HexColorPicker
              color={draftAdminTheme.primary}
              onChange={(color) => setDraftAdminTheme(prev => ({ ...prev, primary: color }))}
            />
            <div className="space-y-3">
              <div 
                className="w-40 h-40 rounded-2xl shadow-xl border-4 border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: draftAdminTheme.primary }}
              />
              <p className="font-mono text-center text-lg font-bold">
                {draftAdminTheme.primary.toUpperCase()}
              </p>
            </div>
          </div>
        </section>

        {/* Gradient */}
        <section className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-3 mb-5">
            <input
              type="checkbox"
              id="gradient-toggle"
              checked={draftAdminTheme.gradient.enabled}
              onChange={(e) =>
                setDraftAdminTheme(prev => ({
                  ...prev,
                  gradient: { ...prev.gradient, enabled: e.target.checked }
                }))
              }
              className="w-5 h-5 accent-[var(--primary)]"
            />
            <label 
              htmlFor="gradient-toggle" 
              className="text-xl font-semibold flex items-center gap-2 cursor-pointer"
            >
              <MdGradient /> Gradient Background
            </label>
          </div>

          {draftAdminTheme.gradient.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium mb-2">Color 1</label>
                <HexColorPicker
                  color={draftAdminTheme.gradient.color1}
                  onChange={(c) =>
                    setDraftAdminTheme(prev => ({
                      ...prev,
                      gradient: { ...prev.gradient, color1: c }
                    }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Color 2</label>
                <HexColorPicker
                  color={draftAdminTheme.gradient.color2}
                  onChange={(c) =>
                    setDraftAdminTheme(prev => ({
                      ...prev,
                      gradient: { ...prev.gradient, color2: c }
                    }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Direction</label>
                <select
                  value={draftAdminTheme.gradient.direction}
                  onChange={(e) =>
                    setDraftAdminTheme(prev => ({
                      ...prev,
                      gradient: { ...prev.gradient, direction: e.target.value }
                    }))
                  }
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                >
                  <option value="to right">→ Right</option>
                  <option value="to left">← Left</option>
                  <option value="to bottom">↓ Bottom</option>
                  <option value="to top">↑ Top</option>
                  <option value="to right bottom">↘ Right Bottom</option>
                  <option value="to left bottom">↙ Left Bottom</option>
                </select>
              </div>
            </div>
          )}
        </section>

        {/* Font Size Scale */}
        <section className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
            <MdFormatSize /> Global Font Size Scale
          </h2>
          <div className="flex items-center gap-6">
            <input
              type="range"
              min="0.8"
              max="1.4"
              step="0.05"
              value={draftAdminTheme.fontSizeScale}
              onChange={(e) =>
                setDraftAdminTheme(prev => ({
                  ...prev,
                  fontSizeScale: parseFloat(e.target.value)
                }))
              }
              className="w-64 accent-[var(--primary)]"
            />
            <span className="font-bold text-lg w-20 text-center">
              {draftAdminTheme.fontSizeScale.toFixed(2)}×
            </span>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
            Preview: <span style={{ fontSize: `${1.4 * draftAdminTheme.fontSizeScale}rem` }}>
              Sample Heading Text
            </span>
          </p>
        </section>

        {/* Background Color (Solid) */}
<section className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800">
  <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
    <MdFormatPaint /> Background Color (Solid)
  </h2>
  <div className="flex flex-col sm:flex-row gap-8 items-start">
    <HexColorPicker
      color={draftAdminTheme[draftAdminTheme.mode]?.background || '#ffffff'}
      onChange={(color) => 
        setDraftAdminTheme(prev => ({
          ...prev,
          [prev.mode]: {
            ...prev[prev.mode],
            background: color
          }
        }))
      }
    />
    <div className="space-y-3">
      <div 
        className="w-64 h-48 rounded-2xl shadow-xl border-4 border-gray-300 dark:border-gray-600"
        style={{ 
          backgroundColor: draftAdminTheme[draftAdminTheme.mode]?.background || '#ffffff' 
        }}
      />
      <p className="font-mono text-center text-lg font-bold">
        {draftAdminTheme[draftAdminTheme.mode]?.background?.toUpperCase() || '#FFFFFF'}
      </p>
    </div>
  </div>
  
  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
    Note: Gradient enabled থাকলে এই color override হবে।
  </p>
</section>

      </div>

      {/* Footer Note */}
      <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        Changes are previewed live • Click "Apply & Save" to make them permanent for all users
      </div>
    </div>
  );
};

export default AdminThemeChange;