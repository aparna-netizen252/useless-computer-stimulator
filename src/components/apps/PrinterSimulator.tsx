import React, { useState, useEffect } from 'react';
import { Printer, FileText } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';
import { REQUIRED_MESSAGES } from '../../data/uselessQuotes';

export const PrinterSimulator: React.FC = () => {
  const [printing, setPrinting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('Printer Ready (Low on imaginary ink)');
  const [paperCount, setPaperCount] = useState<number>(0);
  const { showUselessMessage, addToast } = useToast();
  const { playPrinterStep, playFanfare } = useSound();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (printing) {
      interval = setInterval(() => {
        setProgress((prev) => {
          playPrinterStep();
          if (prev < 30) {
            setStatusText('Preparing printer...');
            return prev + 5;
          } else if (prev < 65) {
            setStatusText('Wasting ink...');
            return prev + 6;
          } else if (prev < 95) {
            setStatusText('Printing absolutely nothing...');
            return prev + 4;
          } else if (prev >= 95 && prev < 100) {
            return 100;
          } else {
            clearInterval(interval);
            setPrinting(false);
            setStatusText('Done.');
            setPaperCount((c) => c + 1);
            playFanfare();
            addToast({
              title: 'Print Complete',
              message: REQUIRED_MESSAGES.PRINT_DONE,
              type: 'printer',
              duration: 5000,
            });
            return 100;
          }
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [printing, playPrinterStep, playFanfare, addToast]);

  const startPrint = () => {
    if (printing) return;
    showUselessMessage(REQUIRED_MESSAGES.PRINT, 'Printer', 'printer');
    setProgress(0);
    setPrinting(true);
  };

  const cancelPrint = () => {
    if (!printing) {
      showUselessMessage('There is nothing to cancel, yet you tried anyway.', 'Printer', 'warning');
      return;
    }
    showUselessMessage('Cancelling cancelled: Printer insisted on continuing to waste ink.', 'Printer', 'error');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/90 text-slate-100 p-6 select-none overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-4 pb-5 border-b border-slate-700/60">
        <div className="p-3 bg-sky-500/10 border border-sky-500/30 rounded-xl text-sky-400">
          <Printer className="w-8 h-8 animate-pulse" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-100">LaserJet Useless 9000 Pro</h2>
          <p className="text-xs text-slate-400">Status: {statusText}</p>
        </div>
        <div className="ml-auto text-right">
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Online-ish
          </span>
          <p className="text-xs text-slate-500 mt-1">Sheets wasted: {paperCount}</p>
        </div>
      </div>

      {/* Main Print Progress Visualizer */}
      <div className="my-6 p-5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col gap-4">
        <div className="flex justify-between items-center text-sm font-semibold">
          <span className="text-slate-300">{statusText}</span>
          <span className="text-sky-400 font-mono">{progress}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-700/80">
          <div
            className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Terminal Print Log */}
        <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg font-mono text-xs text-slate-400 space-y-1">
          <div>$ spoolsv.exe --waste-cartridge --level=maximum</div>
          {progress >= 30 && <div className="text-sky-400">████░░░░░░ 40% Preparing printer...</div>}
          {progress >= 65 && <div className="text-amber-400">███████░░░ 70% Wasting ink...</div>}
          {progress >= 100 && (
            <div className="text-emerald-400 font-bold">
              ██████████ 100% Congratulations. You printed nothing.
            </div>
          )}
        </div>
      </div>

      {/* Print Config & Controls */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/40 text-xs">
          <span className="text-slate-400">Ink Level:</span>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block" title="Cyan: Wasted"></span>
            <span className="w-3 h-3 rounded-full bg-pink-500 inline-block" title="Magenta: Depleted"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" title="Yellow: Vanished"></span>
            <span className="w-3 h-3 rounded-full bg-black inline-block border border-slate-600" title="Black: 0%"></span>
            <span className="text-rose-400 ml-1 font-semibold">0% remaining</span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/40 text-xs">
          <span className="text-slate-400">Print Quality:</span>
          <p className="mt-1 font-semibold text-slate-200">Ultra-High Def Void (1200 DPI)</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex items-center gap-3">
        <button
          onClick={startPrint}
          disabled={printing}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 active:scale-95 text-white font-semibold text-sm shadow-lg shadow-sky-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" />
          {printing ? 'Printing Nothing...' : 'Print Nothing Now'}
        </button>

        <button
          onClick={cancelPrint}
          className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 font-semibold text-sm border border-slate-700 transition-all flex items-center gap-1.5"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
