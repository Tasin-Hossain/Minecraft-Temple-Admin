import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "./Admin/Pages/AdminLayout";
import Dashboard from "./Admin/Pages/Dashboard";
import Components from "./Admin/Pages/Themes/Components";

import GlobalThemeChange from "./Admin/Pages/Themes/GlobalThemeChange";
import ChangeThemesLogs from "./Admin/Pages/Themes/ChangeThemesLogs";
import AdminThemeChange from "./Admin/Pages/Themes/AdminThemeChange";

const App = () => {
  const router = createBrowserRouter([
     {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      { path: "dashboard",element: <Dashboard />},
      { path: "/admin/components",element: <Components />},
      { path: "/admin/admin-theme-change",element: <AdminThemeChange />},
      { path: "/admin/global-theme-change",element: <GlobalThemeChange />},
      { path: "/admin/theme-logs",element: <ChangeThemesLogs />},
    ],
  },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
