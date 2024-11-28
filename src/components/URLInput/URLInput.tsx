import React, { useState } from 'react';
import { Globe, ArrowRight } from 'lucide-react';
import { useUrlPreview } from '../../hooks/useUrlPreview';

export function URLInput() {
  const [inputUrl, setInputUrl] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { loadUrl } = useUrlPreview();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loadUrl(inputUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-1.5 flex items-center pointer-events-none">
          <Globe className={`h-2.5 w-2.5 transition-colors duration-200 ${
            isFocused ? 'text-blue-500' : 'text-gray-400'
          }`} />
        </div>
        <input
          type="url"
          className={`block w-full pl-5 pr-14 py-1 bg-gray-700/50 text-white text-[10px]
            border rounded transition-all duration-200 focus:outline-none
            ${isFocused 
              ? 'border-blue-500/50 ring-1 ring-blue-500/20' 
              : 'border-gray-600/50 hover:border-gray-500/50'
            }`}
          placeholder="Enter URL to preview..."
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required
          pattern="https?://.*"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            type="submit"
            className="h-5 px-1.5 mr-0.5 flex items-center space-x-1 text-[10px] font-medium rounded
              bg-blue-500/90 hover:bg-blue-500 active:bg-blue-600 transition-colors duration-200
              text-white/90 hover:text-white"
          >
            <span>Load</span>
            <ArrowRight className="w-2 h-2" />
          </button>
        </div>
      </div>
    </form>
  );
}