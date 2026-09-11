import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';

export const CalendarApp: React.FC = () => {
  const { showUselessMessage } = useToast();
  const { playClick, playError } = useSound();

  const handleAddEvent = () => {
    playError();
    showUselessMessage('Your schedule has been successfully ignored.', 'Calendar', 'warning');
  };

  const handleDayClick = (day: number) => {
    playClick();
    showUselessMessage(`Day ${day}: Successfully marked for procrastination.`, 'Calendar', 'info');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/95 text-slate-100 p-5 select-none overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-5 h-5 text-sky-400" />
          <h2 className="text-sm font-bold text-slate-100">Procrastination Planner</h2>
        </div>

        <button
          onClick={handleAddEvent}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-xs font-semibold text-white transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Event
        </button>
      </div>

      <div className="p-3 my-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
        <strong>Status:</strong> Your schedule has been successfully ignored.
      </div>

      {/* Calendar Month Grid */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 mb-2">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        <div className="grid grid-cols-7 gap-1 flex-1">
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1;
            const isToday = day === 11;
            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                className={`p-2 rounded-xl text-xs flex flex-col items-center justify-center border transition-all ${
                  isToday
                    ? 'bg-sky-500/30 border-sky-400 text-sky-200 font-bold'
                    : 'bg-slate-800/30 border-slate-800/60 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{day}</span>
                {isToday && <span className="text-[9px] text-sky-300 font-normal">Today</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
