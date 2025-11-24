
import React from 'react';
import AppRouter from './router/AppRouter';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
