import { useRef, useCallback } from 'react';
import { useToast } from '../context/ToastContext';
import { CLICK_STREAK_MESSAGES, START_MENU_SPAM_MESSAGES } from '../data/uselessQuotes';

export const useClickTracker = () => {
  const { showUselessMessage, addToast } = useToast();
  const clickCountMap = useRef<Map<string, { count: number; lastTime: number }>>(new Map());
  const startClickCount = useRef<number>(0);

  const registerClick = useCallback(
    (targetId: string, customMessage?: string) => {
      const now = Date.now();
      const current = clickCountMap.current.get(targetId) || { count: 0, lastTime: 0 };

      // Reset count if more than 3.5s elapsed
      const count = now - current.lastTime < 3500 ? current.count + 1 : 1;
      clickCountMap.current.set(targetId, { count, lastTime: now });

      if (CLICK_STREAK_MESSAGES[count]) {
        const isAchievement = count === 10;
        addToast({
          title: isAchievement ? 'Achievement Unlocked!' : 'Persistence Detected',
          message: CLICK_STREAK_MESSAGES[count],
          type: isAchievement ? 'achievement' : 'warning',
          duration: 5000,
        });
        return;
      }

      if (customMessage) {
        showUselessMessage(customMessage);
      }
    },
    [showUselessMessage, addToast]
  );

  const registerStartClick = useCallback(() => {
    startClickCount.current += 1;
    const count = startClickCount.current;
    if (count >= 2 && count <= 5) {
      const msg = START_MENU_SPAM_MESSAGES[Math.min(count - 2, START_MENU_SPAM_MESSAGES.length - 1)];
      showUselessMessage(msg, 'Start Menu', 'warning');
    }
  }, [showUselessMessage]);

  return { registerClick, registerStartClick };
};
