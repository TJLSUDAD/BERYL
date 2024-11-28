import React from 'react';
import { Code, Globe, Database } from 'lucide-react';

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  const tabs = [
    { id: 'ide', icon: Code, label: 'IDE' },
    { id: 'web', icon: Globe, label: 'Web' },
    { id: 'db', icon: Database, label: 'DB' }
  ];

  return (
    <div className="px-1 py-1 border-b border-gray-700/50">
      <div className="flex space-x-1">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex-1 flex items-center justify-center space-x-1 py-1.5 rounded-sm text-[10px]
              transition-colors duration-200
              ${activeTab === id
                ? 'bg-gray-700/50 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/30'}`}
          >
            <Icon className="w-3 h-3" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}