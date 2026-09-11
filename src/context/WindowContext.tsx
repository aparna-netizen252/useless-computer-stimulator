import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { AppId, WindowState } from '../types/os';
import { FAKE_APPS } from '../data/fakeApps';
import { useToast } from './ToastContext';
import { REQUIRED_MESSAGES } from '../data/uselessQuotes';
import { soundEffects } from '../audio/soundEffects';

interface WindowContextType {
  windows: WindowState[];
  activeWindowId: string | null;
  highestZIndex: number;
  openWindow: (appId: AppId) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
  bsodOpen: boolean;
  triggerBSOD: () => void;
  closeBSOD: () => void;
}

const WindowContext = createContext<WindowContextType | null>(null);

export const WindowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [highestZIndex, setHighestZIndex] = useState<number>(10);
  const [bsodOpen, setBsodOpen] = useState<boolean>(false);
  const { showUselessMessage } = useToast();
  const nextZRef = useRef(10);

  const focusWindow = useCallback((id: string) => {
    nextZRef.current += 1;
    const newZ = nextZRef.current;
    setHighestZIndex(newZ);
    setActiveWindowId(id);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w))
    );
  }, []);

  const openWindow = useCallback(
    (appId: AppId) => {
      soundEffects.playClick();

      // Check if it's a direct action refusal
      const appDef = FAKE_APPS.find((a) => a.id === appId);
      if (appDef?.directAction === 'refuse-files' || appDef?.directAction === 'refuse-folder') {
        soundEffects.playError();
        showUselessMessage(REQUIRED_MESSAGES.FILE_ICON, appDef.title, 'warning');
        return;
      }

      // Check if window is already open
      const existing = windows.find((w) => w.appId === appId);
      if (existing) {
        if (existing.isMinimized) {
          setWindows((prev) =>
            prev.map((w) => (w.id === existing.id ? { ...w, isMinimized: false } : w))
          );
        }
        focusWindow(existing.id);
        return;
      }

      // Calculate initial position centered or cascaded
      const screenW = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const screenH = typeof window !== 'undefined' ? window.innerHeight : 800;
      const appWidth = Math.min(appDef?.defaultWidth || 560, screenW - 40);
      const appHeight = Math.min(appDef?.defaultHeight || 440, screenH - 120);

      const offset = (windows.length % 6) * 28;
      const initialX = Math.max(20, Math.floor((screenW - appWidth) / 2) + offset - 60);
      const initialY = Math.max(20, Math.floor((screenH - appHeight - 60) / 2) + offset - 40);

      nextZRef.current += 1;
      const newZ = nextZRef.current;
      setHighestZIndex(newZ);

      const newWindow: WindowState = {
        id: 'win_' + Math.random().toString(36).substring(2, 9),
        appId,
        title: appDef?.title || 'Application',
        iconName: appDef?.iconName || 'Square',
        isMinimized: false,
        isMaximized: false,
        position: { x: initialX, y: initialY },
        size: { width: appWidth, height: appHeight },
        zIndex: newZ,
      };

      setWindows((prev) => [...prev, newWindow]);
      setActiveWindowId(newWindow.id);

      // Sarcastic specific alert for certain apps
      if (appId === 'printer') {
        showUselessMessage(REQUIRED_MESSAGES.PRINT, 'Printer Simulator', 'printer');
      } else if (appId === 'settings') {
        showUselessMessage(REQUIRED_MESSAGES.SETTINGS, 'Settings', 'info');
      } else if (appId === 'recycle-bin') {
        showUselessMessage(REQUIRED_MESSAGES.RECYCLE_BIN, 'Recycle Bin', 'warning');
      }
    },
    [windows, focusWindow, showUselessMessage]
  );

  const closeWindow = useCallback((id: string) => {
    soundEffects.playClick();
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveWindowId((prevActive) => (prevActive === id ? null : prevActive));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    soundEffects.playClick();
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    setActiveWindowId((prev) => (prev === id ? null : prev));
  }, []);

  const toggleMaximizeWindow = useCallback((id: string) => {
    soundEffects.playClick();
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  }, []);

  const updatePosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position } : w))
    );
  }, []);

  const updateSize = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, size } : w))
    );
  }, []);

  const triggerBSOD = useCallback(() => {
    soundEffects.playError();
    setBsodOpen(true);
  }, []);

  const closeBSOD = useCallback(() => {
    soundEffects.playClick();
    setBsodOpen(false);
  }, []);

  return (
    <WindowContext.Provider
      value={{
        windows,
        activeWindowId,
        highestZIndex,
        openWindow,
        closeWindow,
        minimizeWindow,
        toggleMaximizeWindow,
        focusWindow,
        updatePosition,
        updateSize,
        bsodOpen,
        triggerBSOD,
        closeBSOD,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindowManager = () => {
  const ctx = useContext(WindowContext);
  if (!ctx) throw new Error('useWindowManager must be used within WindowProvider');
  return ctx;
};
