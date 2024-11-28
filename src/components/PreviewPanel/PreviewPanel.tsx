import React, { useCallback, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AlertCircle, Loader, Code } from 'lucide-react';
import type { RootState } from '../../store';
import { StatusMessage } from '../Feedback/StatusMessage';
import { useUrlPreview } from '../../hooks/useUrlPreview';

export function PreviewPanel() {
  const { url, isLoading, error } = useSelector((state: RootState) => state.preview);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { loadUrl } = useUrlPreview();

  const handleFullscreen = useCallback(() => {
    if (iframeRef.current) {
      if (!document.fullscreenElement) {
        iframeRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  }, []);

  return (
    <div className="h-full flex flex-col p-4">
      <StatusMessage />

      <div className="flex-1 relative rounded-lg overflow-hidden bg-white shadow-sm">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm z-10">
            <Loader className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="text-center max-w-md mx-auto px-6">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <p className="text-sm text-gray-600">{error.message}</p>
            </div>
          </div>
        )}

        {!url && !isLoading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center max-w-md mx-auto px-6">
              <Code className="w-8 h-8 text-blue-500/80 mx-auto mb-3" />
              <p className="text-sm text-gray-500">
                Enter a URL in the sidebar to preview content
              </p>
            </div>
          </div>
        )}

        {url && !error && (
          <iframe
            ref={iframeRef}
            src={url}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms"
            title="Preview"
          />
        )}
      </div>
    </div>
  );
}