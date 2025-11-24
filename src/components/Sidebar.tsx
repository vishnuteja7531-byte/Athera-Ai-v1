
import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../auth/useAuth';

const Sidebar: React.FC = () => {
  const { sidebarOpen, syncData, isSyncing, createNewConversation } = useApp();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!sidebarOpen) return null;

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const NavItem = ({ to, label, icon, onClick }: { to?: string; label: string; icon: React.ReactNode, onClick?: () => void }) => {
    const content = (
      <>
        {icon}
        <span>{label}</span>
      </>
    );

    const className = `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors duration-160 cursor-pointer w-full ${
      to && isActive(to)
        ? 'bg-surface text-primary shadow-sm'
        : 'text-muted hover:text-primary hover:bg-white/50'
    }`;

    if (to) {
      return <Link to={to} className={className}>{content}</Link>;
    }
    return <button onClick={onClick} className={className}>{content}</button>;
  };

  return (
    <aside className="hidden md:flex flex-col w-[260px] h-screen bg-background border-r border-gray-100 p-6 fixed left-0 top-0 z-20">
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-accent rounded-full"></div>
          <span className="text-lg font-semibold text-primary tracking-tight">Athera</span>
        </div>
        <button 
            onClick={createNewConversation} 
            className="p-1.5 hover:bg-white rounded-md transition-colors text-muted hover:text-primary"
            title="New Chat"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>

      {user && (
        <div className="mb-6 px-4 py-3 bg-white/60 rounded-lg border border-gray-100/50">
            <div className="flex items-center gap-3 mb-2">
                 <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">
                    {user.email ? user.email[0].toUpperCase() : 'U'}
                 </div>
                 <div className="overflow-hidden">
                     <div className="text-xs font-medium text-primary truncate">{user.displayName || 'User'}</div>
                     <div className="text-[10px] text-muted truncate">{user.email}</div>
                 </div>
            </div>
            <button 
                onClick={syncData} 
                disabled={isSyncing}
                className="w-full text-[10px] bg-white border border-gray-200 rounded py-1 text-muted hover:text-primary transition-colors flex items-center justify-center gap-1"
            >
                {isSyncing ? (
                    <>
                        <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Syncing...
                    </>
                ) : (
                    <>
                         <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>
                         Sync Now
                    </>
                )}
            </button>
        </div>
      )}

      <nav className="flex-1 space-y-1">
        <NavItem 
          to="/" 
          label="Home" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          } 
        />
        <NavItem 
          to="/chat" 
          label="Chat" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
          } 
        />
        <NavItem 
          to="/agent-dashboard" 
          label="Agents" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
          } 
        />
         <NavItem 
          to="/deepsearch" 
          label="Deep Search" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          } 
        />
      </nav>

      <div className="pt-6 border-t border-gray-100 space-y-1">
        <NavItem 
          to="/settings" 
          label="Settings" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          } 
        />
        {user ? (
          <NavItem 
            onClick={handleSignOut}
            label="Log out" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            } 
          />
        ) : (
           <NavItem 
            to="/login"
            label="Log In" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
            } 
          />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
