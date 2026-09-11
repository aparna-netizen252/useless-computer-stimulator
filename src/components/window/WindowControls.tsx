import React from 'react';
import { Minus, Square, X } from 'lucide-react';

interface WindowControlsProps {
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  isMaximized: boolean;
}

export const WindowControls: React.FC<WindowControlsProps> = ({
  onMinimize,
  onMaximize,
  onClose,
  isMaximized,
}) => {
  return (
    <div className="flex items-center space-x-1.5 ml-auto pl-4">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMinimize();
        }}
        title="Minimize problem"
        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-700/50 transition-colors"
        aria-label="Minimize Window"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onMaximize();
        }}
        title={isMaximized ? 'Restore problem' : 'Maximize problem'}
        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-700/50 transition-colors"
        aria-label={isMaximized ? 'Restore Window' : 'Maximize Window'}
      >
        <Square className="w-3 h-3" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        title="Close (pretend to exit)"
        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-600/80 transition-colors"
        aria-label="Close Window"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
