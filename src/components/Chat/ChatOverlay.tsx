import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatOverlayProps {
  onClose: () => void;
}

export function ChatOverlay({ onClose }: ChatOverlayProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I received your message. How can I help?',
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[85%] p-2 rounded-lg text-[11px] ${
              message.sender === 'user'
                ? 'ml-auto bg-blue-500 text-white'
                : 'bg-gray-700/50 text-white'
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-2 border-t border-gray-700/50">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="w-full bg-gray-700/50 text-white text-[11px] rounded-md pl-3 pr-8 py-2
              border border-gray-600/50 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded
              ${input.trim()
                ? 'text-blue-400 hover:text-blue-300'
                : 'text-gray-500 cursor-not-allowed'}`}
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}