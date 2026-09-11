import React, { useState } from 'react';
import { FakeAppDefinition } from '../../types/os';
import { DynamicIcon } from '../ui/DynamicIcon';
import { useWindowManager } from '../../context/WindowContext';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';
import { useClickTracker } from '../../hooks/useClickTracker';
import { REQUIRED_MESSAGES } from '../../data/uselessQuotes';

interface DesktopIconProps {
  app: FakeAppDefinition;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ app }) => {
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const { openWindow } = useWindowManager();
  const { showUselessMessage } = useToast();
  const { playClick, playError } = useSound();
  const { registerClick } = useClickTracker();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Register click for easter egg streaks
    registerClick(app.id);

    // Handle required refusal icons
    if (app.directAction === 'refuse-folder' || app.directAction === 'refuse-files') {
      playError();
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      showUselessMessage(REQUIRED_MESSAGES.FILE_ICON, app.title, 'warning');
      return;
    }

    playClick();
    openWindow(app.id);
  };

  return (
    <div
      onClick={handleClick}
      title={app.description}
      className={`group flex flex-col items-center justify-center p-3 rounded-2xl cursor-pointer select-none transition-all duration-200 hover:bg-white/10 active:scale-95 text-center w-24 sm:w-28 ${
        isShaking ? 'animate-shake' : ''
      }`}
    >
      <div className="relative p-3.5 rounded-2xl bg-slate-800/60 group-hover:bg-slate-700/80 border border-white/10 group-hover:border-sky-400/40 text-sky-400 group-hover:text-sky-300 shadow-lg shadow-black/30 group-hover:shadow-sky-500/10 transition-all">
        <DynamicIcon name={app.iconName} className="w-8 h-8" />
      </div>
      <span className="mt-2 text-xs font-semibold text-slate-200 group-hover:text-white drop-shadow leading-tight break-words max-w-full">
        {app.title}
      </span>
    </div>
  );
};
