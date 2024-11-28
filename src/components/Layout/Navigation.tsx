import React, { useState } from 'react';
import { AgentSelector } from '../AgentSelector/AgentSelector';
import { URLInput } from '../URLInput/URLInput';
import { Brain, Code, Database, Globe, MessageSquare, X } from 'lucide-react';
import { colors } from '../../styles/colors';
import { NavigationTabs } from './NavigationTabs';
import { ChatOverlay } from '../Chat/ChatOverlay';

interface NavigationProps {
  onToggleFiles: () => void;
  showFiles: boolean;
}

export function Navigation({ onToggleFiles, showFiles }: NavigationProps) {
  const [activeTab, setActiveTab] = useState('ide');
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <nav
      className="fixed left-0 top-0 h-full w-[250px] flex flex-col"
      style={{ background: colors.bgSidebar }}
    >
      {/* Header */}
      <div className="h-12 px-3 flex items-center justify-between border-b border-gray-700/50">
        <div className="flex items-center space-x-2">
          <div className="p-1 bg-blue-500/90 rounded">
            <Brain className="w-3 h-3 text-white" />
          </div>
          <span className="text-[11px] font-medium text-white">Beryl</span>
        </div>
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="p-1.5 rounded hover:bg-gray-700/30 transition-colors duration-200"
        >
          {isChatOpen ? (
            <X className="w-3.5 h-3.5 text-gray-400" />
          ) : (
            <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
          )}
        </button>
      </div>

      {isChatOpen ? (
        <ChatOverlay onClose={() => setIsChatOpen(false)} />
      ) : (
        <>
          {/* Navigation Tabs */}
          <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Main Navigation Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2 space-y-4">
              {activeTab === 'ide' && <AgentSelector />}
              {activeTab === 'web' && (
                <div className="space-y-2">
                  <h2 className="text-[10px] font-medium text-gray-400 uppercase tracking-wider flex items-center">
                    <Globe className="w-2.5 h-2.5 mr-1" />
                    Web Tools
                  </h2>
                  <URLInput />
                </div>
              )}
              {activeTab === 'db' && (
                <div className="space-y-2">
                  <h2 className="text-[10px] font-medium text-gray-400 uppercase tracking-wider flex items-center">
                    <Database className="w-2.5 h-2.5 mr-1" />
                    Database
                  </h2>
                  {/* Database tools will go here */}
                </div>
              )}
            </div>
          </div>

          {/* Files Toggle */}
          <button
            onClick={onToggleFiles}
            className={`px-3 py-2 w-full flex items-center space-x-2 text-[10px] transition-colors duration-200
              ${showFiles 
                ? 'bg-gray-700/50 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/30'}`}
          >
            <Code className="w-3 h-3" />
            <span>Files</span>
          </button>
        </>
      )}
    </nav>
  );
}