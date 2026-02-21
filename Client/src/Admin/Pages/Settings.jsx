// Settings.jsx
import React, { useState } from "react";
import { CgBell, CgCreditCard, CgLink, CgProfile } from "react-icons/cg";
import { MdOutlineLock } from "react-icons/md";

import { NotificationSettings } from "../Components/Settings/NotificationSettings";
import { SecuritySettings } from "../Components/Settings/SecuritySettings";
import { ProfileSettings } from "../Components/Settings/ProfileSettings";

const tabs = [
  { id: "profile", label: "Profile", icon: <CgProfile size={18} /> },
  { id: "security", label: "Security", icon: <MdOutlineLock size={18} /> },
  { id: "notification", label: "Notification", icon: <CgBell size={18} /> },
  { id: "billing", label: "Billing", icon: <CgCreditCard size={18} /> },
  { id: "integration", label: "Integration", icon: <CgLink size={18} /> },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-(--card) rounded-md border border-(--border)">
      <div className="mx-auto px-6 py-6">
        <h1 className="title">Settings</h1>

        <div className="flex gap-10">
          {/* Sidebar Navigation */}
          <nav className="w-74 shrink-0">
            <div className="sticky top-10 space-y-1.5 rounded-md p-3 ">
              {tabs.map((tab) => (
                <button
                  onClick={() => setActiveTab(tab.id)}
                  key={tab.id}
                  className={`
                    group flex w-full items-center cursor-pointer gap-3 rounded-md px-4 py-3 text-[14px] font-medium transition-all
                    ${activeTab === tab.id ? "bg-(--hover) text-(--theme)" : "hover:bg-(--hover)"}`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="rounded-xl  p-8 backdrop-blur-sm">
              {/* Tab Content */}
              {activeTab === "profile" && <ProfileSettings />}
              {activeTab === "security" && <SecuritySettings />}
              {activeTab === "notification" && <NotificationSettings />}
              
              {/* Add more conditions when you implement Billing & Integration */}

              {/* Example placeholder for unimplemented tabs */}
              {(activeTab === "billing" || activeTab === "integration") && (
                <div className="py-20 text-center text-gray-500">
                  <p className="text-xl">Coming soon...</p>
                  <p className="mt-2">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
                    section under development
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
