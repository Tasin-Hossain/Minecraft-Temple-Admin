import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "./Admin/Pages/AdminLayout";
import Dashboard from "./Admin/Pages/Dashboard";
import Orders from "./Admin/Pages/Orders";
import Components from "./Admin/Pages/Themes/Components";
import AdminThemeChange from "./Admin/Pages/Themes/AdminThemeChange";
import GlobalThemeChange from "./Admin/Pages/Themes/GlobalThemeChange";

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
