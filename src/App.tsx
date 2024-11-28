import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Navigation } from './components/Layout/Navigation';
import { PreviewPanel } from './components/PreviewPanel/PreviewPanel';
import { FileExplorer } from './components/IDE/FileExplorer';
import { colors } from './styles/colors';

export default function App() {
  const [showFiles, setShowFiles] = useState(false);

  return (
    <Provider store={store}>
      <div className="min-h-screen flex bg-gray-50" style={{ backgroundColor: colors.bgPrimary }}>
        {/* Left Navigation Panel - 250px */}
        <Navigation onToggleFiles={() => setShowFiles(!showFiles)} showFiles={showFiles} />
        
        {/* Main Content Area */}
        <main className="flex-1 ml-[250px] flex">
          {/* Center Preview Area */}
          <div className="flex-1 h-screen">
            <PreviewPanel />
          </div>

          {/* Files Panel - Conditionally rendered */}
          {showFiles && (
            <div className="w-[200px] h-screen border-l border-gray-200 bg-white">
              <FileExplorer />
            </div>
          )}
        </main>
      </div>
    </Provider>
  );
}