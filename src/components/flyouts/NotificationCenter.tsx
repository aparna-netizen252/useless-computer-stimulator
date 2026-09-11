import React from 'react';
import { Bell, BellOff, X, Sparkles, CheckCheck } from 'lucide-react';
import { REQUIRED_MESSAGES } from '../../data/uselessQuotes';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const { showUselessMessage } = useToast();
  const { playClick } = useSound();

  if (!isOpen) return null;

  const handleClearAll = () => {
    playClick();
    showUselessMessage('Nothing was cleared, because nothing was there.', 'Notification Center', 'info');
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-14 right-4 w-80 sm:w-96 rounded-2xl glass-panel p-5 z-50 animate-scale-in flex flex-col gap-4 text-slate-100 shadow-2xl border border-white/10"
    >
      {/* Top Banner with REQUIRED message */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-sky-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Notifications
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearAll}
            className="text-[11px] text-sky-400 hover:text-sky-300 font-medium"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Awkward Grammar Banner */}
      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-medium text-center">
        {REQUIRED_MESSAGES.NOTIFICATIONS}
      </div>

      {/* Fake Empty Notifications Stack */}
      <div className="space-y-2 py-1">
        {[
          { title: 'System', text: 'No notifications.' },
          { title: 'Alerts', text: 'Seriously, nothing.' },
          { title: 'Double-Check', text: 'We checked again.' },
          { title: 'Final Status', text: 'Still nothing.' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-slate-800/40 border border-slate-800/70 text-xs flex items-center justify-between hover:bg-slate-800/60 transition-colors cursor-default"
          >
            <div>
              <h4 className="font-semibold text-slate-300 text-[11px]">{item.title}</h4>
              <p className="text-slate-400 mt-0.5">{item.text}</p>
            </div>
            <CheckCheck className="w-4 h-4 text-slate-600" />
          </div>
        ))}
      </div>
    </div>
  );
};
