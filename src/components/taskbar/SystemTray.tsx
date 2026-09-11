import React from 'react';
import { Volume2, VolumeX, Wifi, Bell } from 'lucide-react';
import { Clock } from './Clock';
import { useSound } from '../../context/SoundContext';
import { useToast } from '../../context/ToastContext';
import { REQUIRED_MESSAGES } from '../../data/uselessQuotes';

interface SystemTrayProps {
  onToggleNetwork: () => void;
  onToggleNotifications: () => void;
  networkOpen: boolean;
  notificationsOpen: boolean;
}

export const SystemTray: React.FC<SystemTrayProps> = ({
  onToggleNetwork,
  onToggleNotifications,
  networkOpen,
  notificationsOpen,
}) => {
  const { soundEnabled, toggleSound, playClick } = useSound();
  const { showUselessMessage } = useToast();

  const handleVolumeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSound();
    showUselessMessage(
      soundEnabled ? 'Sound Muted: Pure, unadulterated silence.' : 'Sound Enabled: Synthesizer primed for disappointment.',
      'Audio Settings',
      'info'
    );
  };

  const handleNetworkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    onToggleNetwork();
  };

  const handleNotificationsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    onToggleNotifications();
  };

  return (
    <div className="flex items-center gap-1 sm:gap-1.5 ml-auto">
      {/* Sound Toggle */}
      <button
        onClick={handleVolumeClick}
        title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
        className="p-1.5 rounded-lg hover:bg-white/10 active:scale-95 transition-all text-slate-300 hover:text-slate-100"
      >
        {soundEnabled ? <Volume2 className="w-4 h-4 text-sky-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
      </button>

      {/* Network Button */}
      <button
        onClick={handleNetworkClick}
        title="Network: Not networking"
        className={`p-1.5 rounded-lg active:scale-95 transition-all ${
          networkOpen ? 'bg-sky-500/30 text-sky-300' : 'hover:bg-white/10 text-slate-300 hover:text-slate-100'
        }`}
      >
        <Wifi className="w-4 h-4" />
      </button>

      {/* Notification Center Button */}
      <button
        onClick={handleNotificationsClick}
        title="Notifications: No messages"
        className={`p-1.5 rounded-lg active:scale-95 transition-all ${
          notificationsOpen ? 'bg-sky-500/30 text-sky-300' : 'hover:bg-white/10 text-slate-300 hover:text-slate-100'
        }`}
      >
        <Bell className="w-4 h-4" />
      </button>

      <div className="h-5 w-[1px] bg-slate-700/60 mx-1" />

      {/* Real-time Clock */}
      <Clock />
    </div>
  );
};
