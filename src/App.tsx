import React from 'react';
import { SoundProvider } from './context/SoundContext';
import { ToastProvider } from './context/ToastContext';
import { WindowProvider } from './context/WindowContext';
import { Desktop } from './components/desktop/Desktop';

export const App: React.FC = () => {
  return (
    <SoundProvider>
      <ToastProvider>
        <WindowProvider>
          <Desktop />
        </WindowProvider>
      </ToastProvider>
    </SoundProvider>
  );
};

export default App;
