import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundEffects } from '../audio/soundEffects';

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playClick: () => void;
  playNotification: () => void;
  playError: () => void;
  playPrinterStep: () => void;
  playFanfare: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    soundEffects.setEnabled(soundEnabled);
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundEffects.setEnabled(next);
      if (next) {
        soundEffects.playClick();
      }
      return next;
    });
  };

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playClick: () => soundEffects.playClick(),
        playNotification: () => soundEffects.playNotification(),
        playError: () => soundEffects.playError(),
        playPrinterStep: () => soundEffects.playPrinterStep(),
        playFanfare: () => soundEffects.playFanfare(),
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be used within SoundProvider');
  return ctx;
};
