import React, { useState } from 'react';
import { FAKE_APPS } from '../../data/fakeApps';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from '../taskbar/Taskbar';
import { FakeWindow } from '../window/FakeWindow';
import { StartMenu } from '../flyouts/StartMenu';
import { SearchPanel } from '../flyouts/SearchPanel';
import { NetworkPanel } from '../flyouts/NetworkPanel';
import { NotificationCenter } from '../flyouts/NotificationCenter';
import { BSODOverlay } from '../dialogs/BSODOverlay';
import { ToastContainer } from '../ui/ToastContainer';
import { useWindowManager } from '../../context/WindowContext';
import { useSound } from '../../context/SoundContext';
import { useClickTracker } from '../../hooks/useClickTracker';

export const Desktop: React.FC = () => {
  const { windows } = useWindowManager();
  const { playClick } = useSound();
  const { registerClick } = useClickTracker();

  // Flyout visibility states
  const [startMenuOpen, setStartMenuOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [networkOpen, setNetworkOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);

  const closeAllFlyouts = () => {
    setStartMenuOpen(false);
    setSearchOpen(false);
    setNetworkOpen(false);
    setNotificationsOpen(false);
  };

  const handleDesktopClick = (e: React.MouseEvent) => {
    // Only fire when clicking directly on the desktop background
    if (e.target === e.currentTarget) {
      closeAllFlyouts();
      playClick();
      registerClick('desktop-wallpaper', 'Excellent choice. You clicked the wallpaper.');
    }
  };

  const desktopApps = FAKE_APPS.filter((a) => a.onDesktop);

  return (
    <main
      onClick={handleDesktopClick}
      className="relative w-screen h-screen overflow-hidden select-none bg-slate-950 font-sans"
    >
      {/* Dynamic Modern Desktop Wallpaper Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 25%, rgba(56, 189, 248, 0.15) 0%, transparent 45%),
            radial-gradient(circle at 80% 75%, rgba(168, 85, 247, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.5) 0%, transparent 70%),
            linear-gradient(135deg, #090d16 0%, #0f172a 50%, #020617 100%)
          `,
        }}
      />

      {/* Decorative Subtle Geometric Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Desktop Watermark */}
      <div className="absolute top-6 right-8 text-right pointer-events-none z-0">
        <h1 className="text-xl font-extrabold tracking-tight text-white/20 uppercase">
          Useless OS
        </h1>
        <p className="text-[11px] font-mono text-white/10 tracking-widest uppercase">
          Build 0.0.0 (Pure Inefficiency)
        </p>
      </div>

      {/* Desktop Icons Grid */}
      <div
        onClick={handleDesktopClick}
        className="relative z-10 p-4 sm:p-6 grid grid-flow-col grid-rows-6 auto-cols-max gap-3 sm:gap-4 max-h-[calc(100vh-60px)]"
      >
        {desktopApps.map((app) => (
          <DesktopIcon key={app.id} app={app} />
        ))}
      </div>

      {/* Windows Layer */}
      {windows.map((win) => (
        <FakeWindow key={win.id} window={win} />
      ))}

      {/* Flyouts Layer */}
      <StartMenu
        isOpen={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
      />

      <SearchPanel
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <NetworkPanel
        isOpen={networkOpen}
        onClose={() => setNetworkOpen(false)}
      />

      <NotificationCenter
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      {/* Taskbar */}
      <Taskbar
        startMenuOpen={startMenuOpen}
        searchOpen={searchOpen}
        networkOpen={networkOpen}
        notificationsOpen={notificationsOpen}
        onToggleStartMenu={() => {
          closeAllFlyouts();
          setStartMenuOpen(!startMenuOpen);
        }}
        onToggleSearch={() => {
          closeAllFlyouts();
          setSearchOpen(!searchOpen);
        }}
        onToggleNetwork={() => {
          closeAllFlyouts();
          setNetworkOpen(!networkOpen);
        }}
        onToggleNotifications={() => {
          closeAllFlyouts();
          setNotificationsOpen(!notificationsOpen);
        }}
      />

      {/* Toast Notification Layer */}
      <ToastContainer />

      {/* Blue Screen of Death (BSOD) Modal Overlay */}
      <BSODOverlay />
    </main>
  );
};
