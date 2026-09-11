import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastItem, ToastType } from '../types/os';
import { soundEffects } from '../audio/soundEffects';
import confetti from 'canvas-confetti';

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => string;
  removeToast: (id: string) => void;
  showUselessMessage: (message: string, title?: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = 'toast_' + Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = { ...toast, id };

    setToasts((prev) => {
      // Keep max 5 toasts on screen
      const trimmed = prev.length >= 5 ? prev.slice(prev.length - 4) : prev;
      return [...trimmed, newToast];
    });

    if (toast.type === 'achievement') {
      soundEffects.playFanfare();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.85, x: 0.85 }
        });
      } catch {
        // Confetti fallback
      }
    } else if (toast.type === 'error') {
      soundEffects.playError();
    } else {
      soundEffects.playNotification();
    }

    const duration = toast.duration ?? 4500;
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [removeToast]);

  const showUselessMessage = useCallback((message: string, title: string = 'Useless Computer', type: ToastType = 'warning') => {
    addToast({
      title,
      message,
      type,
    });
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, showUselessMessage }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};
