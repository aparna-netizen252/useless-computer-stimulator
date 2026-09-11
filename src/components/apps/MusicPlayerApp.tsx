import React, { useState, useEffect } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack, VolumeX, Disc } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';

export const MusicPlayerApp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(35);
  const { showUselessMessage } = useToast();
  const { playClick } = useSound();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    playClick();
    setIsPlaying(!isPlaying);
    showUselessMessage('Playing silence in ultra-HD.', 'Music Player', 'info');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/95 text-slate-100 p-6 select-none justify-between overflow-hidden">
      {/* Vinyl / Cover Art */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="relative w-40 h-40 rounded-full bg-slate-950 border-4 border-slate-800 flex items-center justify-center shadow-2xl group">
          <Disc className={`w-36 h-36 text-slate-800 ${isPlaying ? 'animate-spin-slow' : ''}`} />
          <div className="absolute w-12 h-12 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center">
            <Music className="w-5 h-5 text-sky-400" />
          </div>
        </div>

        {/* Track Title */}
        <div className="text-center mt-5">
          <h3 className="text-base font-bold text-slate-100">Absolute Silence (Remastered)</h3>
          <p className="text-xs text-sky-400 mt-0.5">Playing silence in ultra-HD.</p>
          <span className="text-[10px] text-slate-500 font-mono">FLAC 24-bit / 192kHz • 0 bps</span>
        </div>

        {/* Fake Visualizer Bars */}
        <div className="flex items-end gap-1.5 h-10 mt-5">
          {[40, 75, 20, 90, 60, 30, 85, 45, 95, 30, 65, 50].map((h, idx) => (
            <div
              key={idx}
              className="w-1.5 bg-gradient-to-t from-sky-500 to-indigo-500 rounded-full transition-all duration-300"
              style={{
                height: isPlaying ? `${Math.max(10, (h * ((progress + idx * 7) % 100)) / 100)}%` : '15%',
              }}
            />
          ))}
        </div>
      </div>

      {/* Playback Controls */}
      <div className="mt-4 pt-4 border-t border-slate-800/80">
        {/* Progress scrub */}
        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mb-3 border border-slate-800">
          <div className="bg-sky-500 h-full rounded-full" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex items-center justify-center gap-5">
          <button
            onClick={() => showUselessMessage('Skip Back: Still nothing.', 'Music Player', 'info')}
            className="text-slate-400 hover:text-slate-100"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-400 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-sky-500/30 transition-all"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <button
            onClick={() => showUselessMessage('Skip Forward: Next track is also pure silence.', 'Music Player', 'info')}
            className="text-slate-400 hover:text-slate-100"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
