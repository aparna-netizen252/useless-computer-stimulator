import React, { useState } from 'react';
import { Settings, Sun, Volume2, Wifi, Palette, Cpu, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';
import { REQUIRED_MESSAGES } from '../../data/uselessQuotes';

export const SettingsApp: React.FC = () => {
  const [brightness, setBrightness] = useState<number>(75);
  const [volume, setVolume] = useState<number>(0);
  const [performanceMode, setPerformanceMode] = useState<string>('Slower');
  const [checkingUpdate, setCheckingUpdate] = useState<boolean>(false);
  const { showUselessMessage } = useToast();
  const { playClick, playError } = useSound();

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playClick();
    const val = Number(e.target.value);
    setBrightness(val);
    showUselessMessage(`Brightness adjusted to ${val}%. The screen looks exactly the same.`, 'Display Settings', 'info');
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playClick();
    const val = Number(e.target.value);
    setVolume(val);
    showUselessMessage(`Volume level changed to ${val}%. Silence has never sounded louder.`, 'Audio Settings', 'info');
  };

  const handleWifiToggle = () => {
    playError();
    showUselessMessage('Wi-Fi Status: Permanently "Almost connected".', 'Network Settings', 'warning');
  };

  const handleThemeChange = () => {
    playClick();
    showUselessMessage('Theme option: "Coming eventually". Enjoy the existential void.', 'Personalization', 'warning');
  };

  const handlePerformanceChange = (mode: string) => {
    playClick();
    setPerformanceMode(mode);
    showUselessMessage('Performance setting updated: "Please lower your expectations".', 'Performance', 'warning');
  };

  const handleCheckUpdates = () => {
    if (checkingUpdate) return;
    playClick();
    setCheckingUpdate(true);
    setTimeout(() => {
      setCheckingUpdate(false);
      showUselessMessage('Your computer is already confused enough. No updates installed.', 'System Updates', 'warning');
    }, 1800);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/95 text-slate-100 p-6 select-none overflow-y-auto">
      {/* Header Banner */}
      <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800">
        <div className="p-2.5 bg-slate-800 rounded-xl text-sky-400">
          <Settings className="w-6 h-6 animate-spin-slow" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-100">System Preferences</h2>
          <p className="text-xs text-amber-400 font-semibold">{REQUIRED_MESSAGES.SETTINGS}</p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {/* Brightness */}
        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold">Display Brightness</span>
            <span className="ml-auto text-xs font-mono text-slate-400">{brightness}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={handleBrightnessChange}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <p className="text-[11px] text-slate-400 mt-2">Adjusting this changes literally nothing.</p>
        </div>

        {/* Volume */}
        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="w-4 h-4 text-sky-400" />
            <span className="text-sm font-semibold">Master Audio</span>
            <span className="ml-auto text-xs font-mono text-slate-400">{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full accent-sky-400 cursor-pointer"
          />
          <p className="text-[11px] text-slate-400 mt-2">Maximum silence guaranteed at any volume.</p>
        </div>

        {/* Wi-Fi Setting */}
        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-semibold">Wireless Networking</span>
            </div>
            <p className="text-xs text-amber-400 mt-1">Status: Almost connected</p>
          </div>
          <button
            onClick={handleWifiToggle}
            className="px-3 py-1.5 rounded-lg bg-slate-700/80 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-600 transition-colors"
          >
            Reconnect
          </button>
        </div>

        {/* Theme Setting */}
        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold">System Theme</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Status: Coming eventually</p>
          </div>
          <button
            onClick={handleThemeChange}
            className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 text-xs font-medium border border-purple-500/30 transition-colors"
          >
            Select
          </button>
        </div>
      </div>

      {/* Performance & Expectations */}
      <div className="mt-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold">Performance Mode</span>
          <span className="ml-auto text-xs text-emerald-400 font-mono">{performanceMode}</span>
        </div>
        <p className="text-xs text-slate-400 mb-3">Please lower your expectations:</p>
        <div className="grid grid-cols-3 gap-2">
          {['Slow', 'Slower', 'Hibernating'].map((mode) => (
            <button
              key={mode}
              onClick={() => handlePerformanceChange(mode)}
              className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                performanceMode === mode
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* System Updates */}
      <div className="mt-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <RefreshCw className={`w-4 h-4 text-sky-400 ${checkingUpdate ? 'animate-spin' : ''}`} />
            <span className="text-sm font-semibold">Useless OS Updates</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Your computer is already confused enough.</p>
        </div>
        <button
          onClick={handleCheckUpdates}
          disabled={checkingUpdate}
          className="py-2 px-3.5 rounded-lg bg-sky-500 hover:bg-sky-400 active:scale-95 text-xs font-semibold text-white transition-all disabled:opacity-50"
        >
          {checkingUpdate ? 'Confusing...' : 'Check Now'}
        </button>
      </div>
    </div>
  );
};
