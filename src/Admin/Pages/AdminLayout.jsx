import React, { useState } from "react";
import AdminSideBar from "../Components/AdminSideBar";
import AdminHeader from "../Components/AdminHeader";
import { Outlet } from "react-router-dom";
import ThemeSettings from "../Components/Themes/ThemeSettings";

const HomepageLayout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [ThemeSettingsOpen, setThemeSettingsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <div
        className={`
           fixed top-0 left-0 h-screen 
          ${sidebarExpanded ? "w-65" : "w-22"}
          transition-all duration-300 ease-in-out
          z-100
        `}
      >
        <AdminSideBar expanded={sidebarExpanded} />
      </div>

      {/* MAIN CONTENT */}
      <div
        className={`
          flex-1 flex flex-col
          ${sidebarExpanded ? "ml-65" : "ml-22"}
          transition-all duration-300 ease-in-out
          z-1
        `}
      >
        {/* HEADER */}
        <AdminHeader
          sidebarExpanded={sidebarExpanded}
          setSidebarExpanded={setSidebarExpanded}
          setSettingsOpen={setThemeSettingsOpen}
        />

        {/* PAGE CONTENT */}
        <main className="flex flex-col overflow-y-auto py-4 px-6">
          <Outlet />
          {/* Theme settings panel */}
          <ThemeSettings open={ThemeSettingsOpen} setOpen={setThemeSettingsOpen} />
        </main>
      </div>
    </div>
  );
};

export default HomepageLayout;
