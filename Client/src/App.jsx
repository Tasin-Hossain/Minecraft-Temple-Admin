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
import ApiLogs from "./Admin/Pages/Records/ApiLogs";
import ActivityLogs from "./Admin/Pages/Records/ActivityLogs";
import AuthLogs from "./Admin/Pages/Records/AuthLogs";
import AdminLogs from "./Admin/Pages/Records/AdminLogs";
import SecurityLogs from "./Admin/Pages/Records/SecurityLogs";
import SystemLogs from "./Admin/Pages/Records/SystemLogs";
import Breadcrumbs from "./Components/Breadcrumbs";

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

        // Dashboard
        { path: "dashboard", element: <Dashboard /> },

        // Users
        { path: "/admin/users", element: <div><Breadcrumbs /> <AllMembers /></div> },
        { path: "/admin/users/:userId",element: <div><Breadcrumbs /> <MembersDetails /></div>},
        { path: "/admin/users/:userId/edit",element: <div><Breadcrumbs /> <EditMember /></div>},

        // Records
        { path: "/admin/activity-logs", element: <div><Breadcrumbs /> <ActivityLogs /></div> },
        { path: "/admin/api-logs", element: <div> <Breadcrumbs /> <ApiLogs /></div> },
        { path: "/admin/auth-logs", element: <div><Breadcrumbs />  <AuthLogs /> </div>},
        { path: "/admin/admin-logs", element: <div><Breadcrumbs />  <AdminLogs /></div> },
        { path: "/admin/security-logs", element: <div><Breadcrumbs /> <SecurityLogs /></div> },
        { path: "/admin/system-logs", element:<div><Breadcrumbs />  <SystemLogs /></div> },

        { path: "/admin/components", element: <Components /> },
        { path: "/admin/admin-theme-change", element: <AdminThemeChange /> },
        { path: "/admin/global-theme-change", element: <GlobalThemeChange /> },
        { path: "/admin/theme-logs", element: <ChangeThemesLogs /> },

        // Profile
        { path: "/admin/settings", element: <Settings /> },
      ],
    },

    
    // Auth
    { path: "/login",element: <Login />},
    { path: "/register",element: <Register />},
    { path: "/verify",element: <Verify />},
    { path: "/2fa/verify",element: <TwoFactorVerify />},
    { path: "/verify-email",element: <VerifyEmail />},


  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
