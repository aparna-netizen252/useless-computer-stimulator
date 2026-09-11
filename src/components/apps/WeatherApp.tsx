import React from 'react';
import { CloudSun, CloudRain, Sun, Wind, Droplets } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';

export const WeatherApp: React.FC = () => {
  const { showUselessMessage } = useToast();
  const { playClick } = useSound();

  const handleRefreshWeather = () => {
    playClick();
    showUselessMessage('Weather: probably something.', 'Weather Forecast', 'info');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/95 text-slate-100 p-6 select-none overflow-y-auto font-sans justify-between">
      {/* Current Conditions Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-500/20 via-indigo-500/10 to-transparent border border-sky-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-100">Somewhere on Earth</h2>
            <p className="text-xs text-sky-400 font-semibold mt-0.5">Weather: probably something.</p>
          </div>
          <CloudSun className="w-12 h-12 text-amber-400 animate-pulse" />
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-slate-100">Room Temp</span>
          <span className="text-xs text-slate-400">(21°C / 70°F-ish)</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-700/60 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-sky-400" />
            <span>Humidity: <strong className="text-slate-100">Yes</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wind className="w-3.5 h-3.5 text-indigo-400" />
            <span>Wind: <strong className="text-slate-100">Towards the future</strong></span>
          </div>
        </div>
      </div>

      {/* 5-Day Useless Forecast */}
      <div className="mt-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">5-Day Inevitability Forecast</h3>
        <div className="space-y-2">
          {[
            { day: 'Today', cond: 'Atmospheric conditions', temp: 'Present' },
            { day: 'Tomorrow', cond: 'Tomorrow will occur', temp: 'Pending' },
            { day: 'Wednesday', cond: 'Sky exists', temp: 'Likely' },
            { day: 'Thursday', cond: 'Probably rain or not', temp: '50/50' },
            { day: 'Friday', cond: 'Weekend hope', temp: 'Uncertain' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 text-xs"
            >
              <span className="font-semibold text-slate-200 w-24">{item.day}</span>
              <span className="text-slate-400 flex-1">{item.cond}</span>
              <span className="font-mono text-sky-400">{item.temp}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleRefreshWeather}
        className="mt-4 w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
      >
        Predict Today Again
      </button>
    </div>
  );
};
