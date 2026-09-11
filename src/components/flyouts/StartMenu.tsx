import React from 'react';
import { FAKE_APPS } from '../../data/fakeApps';
import { REQUIRED_MESSAGES } from '../../data/uselessQuotes';
import { useWindowManager } from '../../context/WindowContext';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';
import { DynamicIcon } from '../ui/DynamicIcon';
import { Power, RotateCcw, Moon, Sparkles, User } from 'lucide-react';
import { AppId } from '../../types/os';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose }) => {
  const { openWindow, triggerBSOD } = useWindowManager();
  const { showUselessMessage } = useToast();
  const { playClick, playError } = useSound();

  if (!isOpen) return null;

  const handleAppClick = (appId: AppId) => {
    openWindow(appId);
    onClose();
  };

  const handlePowerAction = (action: string) => {
    playClick();
    if (action === 'restart') {
      onClose();
      triggerBSOD();
    } else if (action === 'sleep') {
      showUselessMessage('Your computer refused to sleep: it is already in a permanent coma.', 'Power Options', 'warning');
    } else {
      showUselessMessage('Shutdown aborted: The computer has severe insomnia.', 'Power Options', 'error');
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-14 left-4 sm:left-1/2 sm:-translate-x-1/2 w-80 sm:w-96 rounded-2xl glass-panel p-5 z-50 animate-scale-in flex flex-col gap-4 text-slate-100 shadow-2xl border border-white/10"
    >
      {/* Top Banner with REQUIRED message */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-sky-500/20 to-indigo-500/20 border border-sky-500/30 text-center">
        <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">
          {REQUIRED_MESSAGES.START_MENU}
        </h3>
        <p className="text-[11px] text-slate-400 mt-0.5">Where high hopes meet zero results</p>
      </div>

      {/* App Grid */}
      <div className="flex-1 overflow-y-auto max-h-80 pr-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
          Simulated Applications
        </span>
        <div className="grid grid-cols-3 gap-2">
          {FAKE_APPS.map((app) => (
            <button
              key={app.id}
              onClick={() => handleAppClick(app.id)}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl hover:bg-slate-800/80 active:scale-95 transition-all group text-center border border-transparent hover:border-slate-700/60"
            >
              <div className="p-2 rounded-xl bg-slate-800/60 group-hover:bg-sky-500/20 text-slate-300 group-hover:text-sky-400 transition-colors mb-1.5 shadow-sm">
                <DynamicIcon name={app.iconName} className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-300 group-hover:text-slate-100 leading-tight truncate w-full">
                {app.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer / User Profile & Power Actions */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <div
          onClick={() => showUselessMessage('User Profile: Logged in as "Supreme Time Waster"', 'Profile', 'info')}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 text-xs">
            <User className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-slate-200">Admin (Powerless)</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePowerAction('sleep')}
            title="Sleep (does nothing)"
            className="p-1.5 rounded-lg text-slate-400 hover:text-sky-300 hover:bg-slate-800 transition-colors"
          >
            <Moon className="w-4 h-4" />
          </button>
          <button
            onClick={() => handlePowerAction('restart')}
            title="Restart (trigger crash)"
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => handlePowerAction('shutdown')}
            title="Shut Down (fails)"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
          >
            <Power className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
