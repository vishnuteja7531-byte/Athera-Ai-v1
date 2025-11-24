import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from '../pages/Chat.tsx';
import Login from '../auth/pages/login.tsx';
import Signup from '../auth/pages/signup.tsx';
import Settings from '../pages/Settings.tsx';
import AgentDashboard from '../pages/AgentDashboard.tsx';
import DeepSearchResults from '../pages/DeepSearchResults.tsx';
import ProtectedRoute from '../auth/ProtectedRoute.tsx';
import RootRedirect from '../auth/pages/RootRedirect.tsx';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/app/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/app/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/app/agent-dashboard" element={<ProtectedRoute><AgentDashboard /></ProtectedRoute>} />
        <Route path="/app/deepsearch" element={<ProtectedRoute><DeepSearchResults /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;