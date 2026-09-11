import React, { useState, useEffect } from 'react';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';

export const Clock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());
  const { showUselessMessage } = useToast();
  const { playClick } = useSound();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    const responses = [
      'Time is passing. You are still here.',
      "Yes, that's the time. Congratulations.",
      'Time is an illusion, lunchtime doubly so.',
      'Another minute has been successfully wasted.',
    ];
    const picked = responses[Math.floor(Math.random() * responses.length)];
    showUselessMessage(picked, 'Real-Time Clock', 'info');
  };

  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = time.toLocaleDateString([], { month: 'short', day: 'numeric' });

  return (
    <button
      onClick={handleClick}
      title="View useless passage of time"
      className="flex flex-col items-end justify-center px-2 py-1 rounded-lg hover:bg-white/10 active:scale-95 transition-all text-right"
    >
      <span className="text-xs font-semibold text-slate-200 leading-tight">{timeString}</span>
      <span className="text-[10px] text-slate-400 leading-tight">{dateString}</span>
    </button>
  );
};
