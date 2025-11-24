import React from 'react';
import Sidebar from '../components/Sidebar';
import { useApp } from '../context/AppContext';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { sidebarOpen } = useApp();
  
  return (
    <div className="min-h-screen bg-background text-primary font-sans antialiased selection:bg-accent selection:text-white">
      <Sidebar />
      <main className={`transition-all duration-300 ${sidebarOpen ? 'md:ml-[260px]' : ''} min-h-screen relative`}>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
