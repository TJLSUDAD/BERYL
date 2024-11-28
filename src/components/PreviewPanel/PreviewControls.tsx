import React from 'react';
import { RefreshCw, Maximize2, RotateCcw } from 'lucide-react';
import { colors } from '../../styles/colors';

interface PreviewControlsProps {
  onRefresh: () => void;
  onFullscreen: () => void;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function PreviewControls({
  onRefresh,
  onFullscreen,
  onRetry,
  showRetry = false,
}: PreviewControlsProps) {
  const buttonClass = `
    p-2 rounded-md text-white transition-colors duration-200
    hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  return (
    <div className="flex items-center space-x-2 mb-4">
      <button
        onClick={onRefresh}
        className={buttonClass}
        style={{ backgroundColor: colors.gold }}
        title="Refresh"
      >
        <RefreshCw className="w-5 h-5" />
      </button>
      <button
        onClick={onFullscreen}
        className={buttonClass}
        style={{ backgroundColor: colors.gold }}
        title="Fullscreen"
      >
        <Maximize2 className="w-5 h-5" />
      </button>
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className={buttonClass}
          style={{ backgroundColor: colors.gold }}
          title="Retry"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}