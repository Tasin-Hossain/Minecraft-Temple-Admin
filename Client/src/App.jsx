import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "./Admin/Pages/AdminLayout";
import Dashboard from "./Admin/Pages/Dashboard";
import Components from "./Admin/Pages/Themes/Components";

import GlobalThemeChange from "./Admin/Pages/Themes/GlobalThemeChange";
import ChangeThemesLogs from "./Admin/Pages/Themes/ChangeThemesLogs";
import AdminThemeChange from "./Admin/Pages/Themes/AdminThemeChange";
import Login from "./Pages/Auth/Login";
import Settings from "./Admin/Pages/Settings";
import Register from "./Pages/Auth/Register";
import TwoFactorVerify from "./Pages/Auth/TwoFactorVerify";
import Verify from "./Pages/Auth/Verify";
import VerifyEmail from "./Pages/Auth/VerifyEmail";
import AllUsers from "./Admin/Pages/Members/AllMembers";
import AllMembers from "./Admin/Pages/Members/AllMembers";
import MembersDetails from "./Admin/Pages/Members/MembersDetails";
import EditMember from "./Admin/Pages/Members/EditMember";

const App = () => {
  const router = createBrowserRouter([
    // Admin
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
      
        { path: "dashboard", element: <Dashboard /> },

        { path: "/admin/all-members", element: <AllMembers /> },
        { path: "/admin/all-members/:userId", element: <MembersDetails /> },
        { path: "/admin/all-members/edit/:userId", element: <EditMember /> },

        { path: "/admin/components", element: <Components /> },
        { path: "/admin/admin-theme-change", element: <AdminThemeChange /> },
        { path: "/admin/global-theme-change", element: <GlobalThemeChange /> },
        { path: "/admin/theme-logs", element: <ChangeThemesLogs /> },
        
        // Profile
        { path: "/admin/settings", element: <Settings /> },
      ],
    },
    // Auth
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/verify",
      element: <Verify />,
    },
    {
      path: "/2fa/verify",
      element: <TwoFactorVerify />,
    },
    {
      path: "/verify-email",
      element: <VerifyEmail />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
