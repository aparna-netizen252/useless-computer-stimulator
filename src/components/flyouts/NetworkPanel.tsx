import React, { useState } from 'react';
import { Wifi, RefreshCw, X } from 'lucide-react';
import { REQUIRED_MESSAGES } from '../../data/uselessQuotes';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';

interface NetworkPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NetworkPanel: React.FC<NetworkPanelProps> = ({ isOpen, onClose }) => {
  const [reconnecting, setReconnecting] = useState<boolean>(false);
  const { showUselessMessage } = useToast();
  const { playClick, playError } = useSound();

  if (!isOpen) return null;

  const handleReconnect = () => {
    if (reconnecting) return;
    playClick();
    setReconnecting(true);
    setTimeout(() => {
      setReconnecting(false);
      playError();
      showUselessMessage("We changed nothing. You're welcome.", 'Network Diagnostic', 'warning');
    }, 1600);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-14 right-4 sm:right-24 w-80 rounded-2xl glass-panel p-5 z-50 animate-scale-in flex flex-col gap-4 text-slate-100 shadow-2xl border border-white/10"
    >
      {/* Top Banner with REQUIRED message */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
            <Wifi className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Wi-Fi Connection
            </h3>
            <p className="text-[11px] text-amber-400 font-medium">
              {REQUIRED_MESSAGES.NETWORK}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Connection Stats */}
      <div className="space-y-2 text-xs">
        <div className="flex justify-between p-2 rounded-lg bg-slate-800/40 border border-slate-800">
          <span className="text-slate-400">Wi-Fi:</span>
          <span className="font-semibold text-amber-300">Connected-ish</span>
        </div>

        <div className="flex justify-between p-2 rounded-lg bg-slate-800/40 border border-slate-800">
          <span className="text-slate-400">Internet:</span>
          <span className="font-semibold text-rose-400">Probably not</span>
        </div>

        <div className="flex justify-between p-2 rounded-lg bg-slate-800/40 border border-slate-800">
          <span className="text-slate-400">Signal:</span>
          <span className="font-semibold text-purple-300">Emotionally unavailable</span>
        </div>

        <div className="flex justify-between p-2 rounded-lg bg-slate-800/40 border border-slate-800 font-mono text-[11px]">
          <span className="text-slate-400">Download:</span>
          <span className="text-sky-300">0.0000001 Mbps</span>
        </div>

        <div className="flex justify-between p-2 rounded-lg bg-slate-800/40 border border-slate-800 font-mono text-[11px]">
          <span className="text-slate-400">Upload:</span>
          <span className="text-slate-300">Still thinking...</span>
        </div>
      </div>

      {/* Reconnect Action Button */}
      <button
        onClick={handleReconnect}
        disabled={reconnecting}
        className="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 active:scale-95 text-white font-semibold text-xs shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${reconnecting ? 'animate-spin' : ''}`} />
        {reconnecting ? 'Reconnecting...' : 'Reconnect (Changes Nothing)'}
      </button>
    </div>
  );
};
