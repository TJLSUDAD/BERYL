import React from 'react';
import { useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import { useAgentManager } from '../../hooks/useAgentManager';
import { ApiKeyInput } from './ApiKeyInput';
import type { RootState } from '../../store';
import type { Agent } from '../../types';

export function AgentSelector() {
  const { agents, selectedAgent } = useSelector((state: RootState) => state.agent);
  const { selectAgent } = useAgentManager();

  const handleAgentChange = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      selectAgent(agent);
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        AI Agent
      </h2>
      
      <div className="space-y-2">
        <div className="relative">
          <select
            className="w-full bg-gray-700 text-white text-xs rounded-md py-2 pl-3 pr-8 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedAgent?.id || ''}
            onChange={(e) => handleAgentChange(e.target.value)}
          >
            <option value="">Select an agent</option>
            {agents.map((agent: Agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>

        {selectedAgent && (
          <ApiKeyInput
            agentId={selectedAgent.id}
            currentKey={selectedAgent.apiKey}
          />
        )}
      </div>
    </div>
  );
}