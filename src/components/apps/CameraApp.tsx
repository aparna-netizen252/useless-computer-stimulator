import React, { useState } from 'react';
import { Camera, Aperture } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';

export const CameraApp: React.FC = () => {
  const [snapshotTaken, setSnapshotTaken] = useState<boolean>(false);
  const { showUselessMessage } = useToast();
  const { playClick, playError } = useSound();

  const takeSnapshot = () => {
    playClick();
    setSnapshotTaken(true);
    setTimeout(() => {
      setSnapshotTaken(false);
      playError();
      showUselessMessage('Camera successfully detected absolutely nothing.', 'Webcam 4K', 'warning');
    }, 500);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 select-none overflow-hidden font-sans p-4">
      {/* Viewfinder */}
      <div className="relative flex-1 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
        {/* Subtle scanline / sensor noise effect */}
        <div className="absolute inset-0 bg-emerald-950/20 scanlines pointer-events-none" />

        {/* Floating Face Detection Box (wandering in empty space) */}
        <div className="absolute top-1/4 left-1/3 w-28 h-28 border-2 border-emerald-400/70 rounded-lg animate-pulse pointer-events-none flex flex-col justify-between p-1">
          <span className="text-[9px] font-mono text-emerald-400">NO HUMAN FOUND</span>
          <span className="text-[9px] font-mono text-emerald-400 self-end">0.0% MATCH</span>
        </div>

        {/* Shutter flash */}
        {snapshotTaken && <div className="absolute inset-0 bg-white animate-fade-in z-20" />}

        {/* Center icon */}
        <div className="flex flex-col items-center gap-2 text-slate-600">
          <Camera className="w-12 h-12 stroke-[1.5]" />
          <p className="text-xs font-mono text-slate-500">Useless HD Webcam • 1080p 0fps</p>
        </div>

        {/* Live overlay banner */}
        <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[11px] font-mono">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          REC (NOT RECORDING)
        </div>
      </div>

      {/* Camera Controls */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={takeSnapshot}
          className="w-14 h-14 rounded-full bg-rose-500 hover:bg-rose-400 active:scale-90 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 transition-all border-4 border-slate-900"
          title="Capture Nothing"
        >
          <Aperture className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
