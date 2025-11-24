import React from 'react';
import { AppMode } from '../types';
import { useApp } from '../context/AppContext';

const ModeSwitcher: React.FC = () => {
  const { selectedMode, setSelectedMode } = useApp();

  const modes = [
    { id: AppMode.AGENT, label: 'Agent' },
    { id: AppMode.DEEP_SEARCH, label: 'DeepSearch' },
    { id: AppMode.VOICE, label: 'Voice' },
  ];

  return (
    <div className="flex items-center justify-center mb-4">
      <div className="flex bg-white p-1 rounded-full shadow-sm border border-gray-100">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setSelectedMode(mode.id)}
            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
              selectedMode === mode.id
                ? 'bg-accent text-white shadow-md'
                : 'text-muted hover:text-primary'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModeSwitcher;