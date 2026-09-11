import React from 'react';
import { useWindowManager } from '../../context/WindowContext';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';
import { useClickTracker } from '../../hooks/useClickTracker';
import { REQUIRED_MESSAGES } from '../../data/uselessQuotes';
import { FAKE_APPS } from '../../data/fakeApps';
import { SystemTray } from './SystemTray';
import { DynamicIcon } from '../ui/DynamicIcon';
import { Search } from 'lucide-react';
import { AppId } from '../../types/os';

interface TaskbarProps {
  startMenuOpen: boolean;
  searchOpen: boolean;
  networkOpen: boolean;
  notificationsOpen: boolean;
  onToggleStartMenu: () => void;
  onToggleSearch: () => void;
  onToggleNetwork: () => void;
  onToggleNotifications: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  startMenuOpen,
  searchOpen,
  networkOpen,
  notificationsOpen,
  onToggleStartMenu,
  onToggleSearch,
  onToggleNetwork,
  onToggleNotifications,
}) => {
  const { windows, activeWindowId, openWindow, minimizeWindow, focusWindow } = useWindowManager();
  const { showUselessMessage } = useToast();
  const { playClick } = useSound();
  const { registerStartClick } = useClickTracker();

  const handleTaskbarAreaClick = (e: React.MouseEvent) => {
    // Only fire if clicking directly on the taskbar surface, not its buttons
    if (e.target === e.currentTarget) {
      playClick();
      showUselessMessage(REQUIRED_MESSAGES.TASKBAR, 'Multi-Taskbar', 'warning');
    }
  };

  const handleStartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    registerStartClick();
    onToggleStartMenu();
  };

  const handleSearchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    onToggleSearch();
  };

  const handleAppTaskClick = (appId: AppId) => {
    const existing = windows.find((w) => w.appId === appId);
    if (!existing) {
      openWindow(appId);
      return;
    }

    if (existing.id === activeWindowId && !existing.isMinimized) {
      minimizeWindow(existing.id);
    } else {
      focusWindow(existing.id);
    }
  };

  // Pinned apps from list
  const pinnedApps = FAKE_APPS.filter((a) => a.pinnedInTaskbar);

  return (
    <nav
      onClick={handleTaskbarAreaClick}
      aria-label="Main taskbar"
      className="fixed bottom-0 left-0 right-0 h-12 glass-taskbar px-3 flex items-center gap-1 z-40 select-none shadow-2xl"
    >
      {/* Start Button */}
      <button
        onClick={handleStartClick}
        title="Start (Click here and hope)"
        className={`flex items-center justify-center p-2 rounded-xl active:scale-90 transition-all ${
          startMenuOpen
            ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
            : 'bg-slate-800/80 hover:bg-slate-700/80 text-sky-400 hover:text-sky-300 border border-slate-700/60'
        }`}
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 0h7v7h-7v-7z" />
        </svg>
      </button>

      {/* Search Button */}
      <button
        onClick={handleSearchClick}
        title={REQUIRED_MESSAGES.SEARCH}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs active:scale-95 transition-all ${
          searchOpen
            ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
            : 'bg-slate-800/60 hover:bg-slate-700/60 text-slate-400 hover:text-slate-200 border border-slate-700/40'
        }`}
      >
        <Search className="w-3.5 h-3.5 text-sky-400" />
        <span className="hidden sm:inline">Search...</span>
      </button>

      <div className="h-5 w-[1px] bg-slate-700/60 mx-1 hidden sm:block" />

      {/* Pinned & Running Apps Container */}
      <div className="flex items-center gap-1 overflow-x-auto max-w-xl py-1">
        {pinnedApps.map((app) => {
          const openWin = windows.find((w) => w.appId === app.id);
          const isOpen = Boolean(openWin);
          const isActive = openWin?.id === activeWindowId && !openWin?.isMinimized;

          return (
            <button
              key={app.id}
              onClick={() => handleAppTaskClick(app.id)}
              title={app.title}
              className={`relative p-2 rounded-xl transition-all flex items-center justify-center ${
                isActive
                  ? 'bg-slate-700/80 text-sky-400 border border-sky-400/30 shadow'
                  : isOpen
                  ? 'bg-slate-800/60 text-slate-200 hover:bg-slate-700/60'
                  : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'
              }`}
            >
              <DynamicIcon name={app.iconName} className="w-5 h-5" />
              {isOpen && (
                <span
                  className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                    isActive ? 'bg-sky-400' : 'bg-slate-500'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* System Tray */}
      <SystemTray
        onToggleNetwork={onToggleNetwork}
        onToggleNotifications={onToggleNotifications}
        networkOpen={networkOpen}
        notificationsOpen={notificationsOpen}
      />
    </nav>
  );
};
