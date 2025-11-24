
import React from 'react';
import AppRouter from './router/AppRouter';
import { AppProvider } from './context/AppContext';
import { FirebaseProvider } from './auth/FirebaseProvider';

const App: React.FC = () => {
  return (
    <FirebaseProvider>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </FirebaseProvider>
  );
};

export default App;
