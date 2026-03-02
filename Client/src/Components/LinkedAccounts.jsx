// components/LinkedAccountsButtons.jsx
import React from 'react';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const providerIcons = {
  discord: <FaDiscord className="text-[20px]" />,
  google: <FcGoogle className="text-[20px]" />,
  github: <FaGithub className="text-[20px]" />,
};

const getProviderStyle = (provider) => {
  const lower = provider.toLowerCase();
  switch (lower) {
    case 'discord':
      return 'text-zinc-200 bg-[#5865F2] hover:bg-[#3b4aed]';
    case 'google':
      return 'text-[#413f3f] hover:bg-[#afaea7] bg-[#d9d8d0] ';
    case 'github':
      return 'bg-gray-900 hover:bg-gray-800 border-gray-700 text-white';
    default:
      return 'bg-gray-800 hover:bg-gray-700 border-gray-700 text-white';
  }
};

const LinkedAccountsButtons = ({ user }) => {
  const providers = user?.oauthProviders || [];

  if (providers.length === 0) {
    return (
      <span className="text-(--muted-text) text-sm">
        No linked accounts
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {providers.map((p, index) => {
        const providerName = p.provider.toLowerCase();
        const Icon = providerIcons[providerName];

        if (!Icon) {
          return (
            <span
              key={index}
              className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium bg-gray-800 border border-gray-700 text-white"
            >
              {p.provider}
            </span>
          );
        }

        const styleClasses = getProviderStyle(p.provider);

        return (
          <button
            key={index}
            className={`cursor-pointer flex gap-2 items-center px-2 py-1 rounded-lg font-medium text-[14px] border border-(--border) transition-all ease-in duration-200 ${styleClasses}`}
          >
            {Icon}
            <span className="capitalize">{p.provider}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LinkedAccountsButtons;