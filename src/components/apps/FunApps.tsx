import React, { useState } from 'react';
import { Zap, ShieldAlert, Flame } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';

export const ProductivityDestroyerApp: React.FC = () => {
  const [destroyedHours, setDestroyedHours] = useState<number>(1);
  const { showUselessMessage } = useToast();
  const { playFanfare } = useSound();

  const handleDestroy = () => {
    playFanfare();
    setDestroyedHours((prev) => prev + 1);
    showUselessMessage('Congratulations. Productivity destroyed.', 'Productivity Destroyer', 'achievement');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-900/95 text-slate-100 p-6 select-none text-center">
      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400 mb-4 animate-pulse">
        <Zap className="w-12 h-12" />
      </div>

      <h2 className="text-lg font-bold text-slate-100">Productivity Annihilator 3000</h2>
      <p className="text-xs text-slate-400 max-w-xs mt-1 mb-6">
        Click below to immediately evaporate any lingering desire to do actual work.
      </p>

      <button
        onClick={handleDestroy}
        className="w-full max-w-xs py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 hover:from-amber-400 hover:to-red-500 active:scale-95 text-white font-bold text-sm shadow-xl shadow-rose-500/20 transition-all flex items-center justify-center gap-2"
      >
        <Flame className="w-5 h-5" />
        Destroy 1 More Hour
      </button>

      <div className="mt-6 text-xs text-slate-500 font-mono">
        Hours wasted in this session: <strong className="text-amber-400">{destroyedHours}</strong>
      </div>
    </div>
  );
};

export const DefinitelyNotMalwareApp: React.FC = () => {
  const [scanning, setScanning] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('Everything is totally fine. Do not investigate.');
  const { showUselessMessage } = useToast();
  const { playClick, playError } = useSound();

  const handleScan = () => {
    playClick();
    setScanning(true);
    setStatus('Scanning for productivity...');
    setTimeout(() => {
      setScanning(false);
      playError();
      setStatus('Productivity detected. Attempting to remove productivity...');
      setTimeout(() => {
        showUselessMessage('Productivity successfully removed. You are safe now.', 'Definitely Not Malware', 'warning');
        setStatus('Clean. No productivity remains.');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/95 text-slate-100 p-6 select-none justify-between">
      <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
        <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-100">Totally Legitimate Security</h2>
          <p className="text-xs text-emerald-400 font-medium">100% Not Malware Guarantee</p>
        </div>
      </div>

      <div className="my-auto text-center p-6 rounded-2xl bg-slate-950/60 border border-slate-800">
        <p className="text-xs text-slate-300 mb-4">{status}</p>
        <button
          onClick={handleScan}
          disabled={scanning}
          className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-xs font-bold text-white transition-all disabled:opacity-50"
        >
          {scanning ? 'Removing Work...' : 'Scan System'}
        </button>
      </div>

      <div className="text-[10px] text-slate-500 text-center">
        Disclaimer: Any data gathered is strictly forwarded to nobody.
      </div>
    </div>
  );
};
