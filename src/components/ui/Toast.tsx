import React from 'react';
import { ToastItem } from '../../types/os';
import { AlertTriangle, CheckCircle, Info, Trophy, Printer, X, ShieldAlert } from 'lucide-react';

interface ToastProps {
  toast: ToastItem;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'achievement':
        return <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />;
      case 'error':
        return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      case 'printer':
        return <Printer className="w-5 h-5 text-sky-400 animate-pulse" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-400" />;
      case 'warning':
      default:
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'achievement':
        return 'border-amber-500/40 shadow-amber-500/10';
      case 'error':
        return 'border-rose-500/40 shadow-rose-500/10';
      case 'printer':
        return 'border-sky-500/40 shadow-sky-500/10';
      default:
        return 'border-slate-700/60 shadow-black/40';
    }
  };

  return (
    <div
      role="alert"
      className={`relative flex items-start gap-3 w-80 sm:w-96 p-4 rounded-xl bg-slate-900/90 backdrop-blur-xl border ${getBorderColor()} shadow-2xl transition-all duration-300 animate-scale-in group`}
    >
      <div className="shrink-0 mt-0.5 p-2 rounded-lg bg-slate-800/80 border border-white/5">
        {getIcon()}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
          {toast.title}
        </h4>
        <p className="text-sm font-medium text-slate-100 break-words leading-snug">
          {toast.message}
        </p>
      </div>

      <button
        onClick={() => onClose(toast.id)}
        className="shrink-0 text-slate-400 hover:text-slate-100 transition-colors p-1 rounded-lg hover:bg-slate-800/60"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
