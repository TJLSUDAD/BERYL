import React, { useState } from 'react';
import { Settings, Check, AlertCircle } from 'lucide-react';
import { useAgentManager } from '../../hooks/useAgentManager';
import { colors } from '../../styles/colors';

interface ApiKeyInputProps {
  agentId: string;
  currentKey?: string;
}

export function ApiKeyInput({ agentId, currentKey }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState(currentKey || '');
  const [isValidating, setIsValidating] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateAgentKey } = useAgentManager();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    setError(null);

    try {
      const isValid = await updateAgentKey(agentId, apiKey);
      if (!isValid) {
        setError('Invalid API key');
      } else {
        setShowInput(false);
      }
    } catch (err) {
      setError('Failed to validate API key');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={() => setShowInput(!showInput)}
        className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-white transition-colors duration-200"
      >
        <Settings className="w-3 h-3" />
        <span>API Key {currentKey ? '(Set)' : ''}</span>
      </button>

      {showInput && (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="relative">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className={`w-full bg-gray-700 text-white text-xs border rounded-md py-1.5 px-2.5 pr-8
                focus:outline-none focus:ring-1 focus:ring-blue-500
                ${error ? 'border-red-500' : 'border-gray-600'}`}
              placeholder="Enter API key..."
            />
            {error && (
              <AlertCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-red-500" />
            )}
            {currentKey && !error && (
              <Check className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-green-500" />
            )}
          </div>
          
          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={isValidating || !apiKey}
            className={`w-full py-1.5 px-3 text-xs font-medium rounded-md
              ${isValidating
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'}
              text-white transition-colors duration-200`}
          >
            {isValidating ? 'Validating...' : 'Save API Key'}
          </button>
        </form>
      )}
    </div>
  );
}