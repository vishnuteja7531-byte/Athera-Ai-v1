import React from 'react';
import ChatLayout from '../layouts/ChatLayout';

const AgentDashboard: React.FC = () => {
  return (
    <ChatLayout>
      <div className="flex-1 overflow-y-auto pt-8 pb-32 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Agent Dashboard</h1>
          <div className="bg-surface rounded-lg border border-gray-100 p-6">
            <p className="text-muted">Agent dashboard coming soon...</p>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default AgentDashboard;