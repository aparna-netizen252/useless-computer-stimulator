import React, { useEffect, useState } from 'react';
import { useWindowManager } from '../../context/WindowContext';
import { useSound } from '../../context/SoundContext';
import { QrCode, RefreshCw } from 'lucide-react';

export const BSODOverlay: React.FC = () => {
  const { bsodOpen, closeBSOD } = useWindowManager();
  const { playError, playClick } = useSound();
  const [dots, setDots] = useState<string>('');

  useEffect(() => {
    if (!bsodOpen) return;
    playError();
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 4 ? '' : d + '.'));
    }, 600);
    return () => clearInterval(interval);
  }, [bsodOpen, playError]);

  if (!bsodOpen) return null;

  return (
    <div
      onClick={closeBSOD}
      className="fixed inset-0 z-[99999] bg-[#0078d7] text-white p-8 sm:p-16 flex flex-col justify-between font-sans select-none animate-fade-in cursor-pointer"
    >
      <div className="max-w-3xl space-y-6">
        <div className="text-7xl sm:text-9xl font-light mb-4">:-(</div>

        <h1 className="text-2xl sm:text-4xl font-normal leading-tight">
          Your PC ran into a problem because it realized it is completely useless.
        </h1>

        <p className="text-lg sm:text-xl font-light text-blue-100">
          We're just collecting some imaginary error info, and then we won't restart for you.
        </p>

        <div className="text-xl sm:text-2xl font-mono text-blue-200">
          0% complete{dots}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="p-3 bg-white text-blue-800 rounded-xl shadow-lg">
            <QrCode className="w-24 h-24" />
          </div>

          <div className="text-xs font-mono space-y-1.5 text-blue-100">
            <div>For more information about this issue, visit:</div>
            <div className="text-white font-bold underline">https://www.uselessness.org/stopcode</div>
            <div className="pt-2 text-blue-200">Stop Code: CRITICAL_LACK_OF_PURPOSE</div>
            <div className="text-blue-200">What failed: Productivity.sys</div>
          </div>
        </div>
      </div>

      <div className="text-xs sm:text-sm text-blue-200 mt-auto pt-6 flex justify-between items-center border-t border-blue-400/30">
        <span>Click anywhere to escape back to your simulated desktop</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            playClick();
            closeBSOD();
          }}
          className="px-4 py-2 rounded-xl bg-white text-blue-800 font-bold hover:bg-blue-50 transition-colors"
        >
          Wake Up Computer
        </button>
      </div>
    </div>
  );
};
