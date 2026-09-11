import React, { useState, useRef, useEffect } from 'react';
import { WindowState } from '../../types/os';
import { useWindowManager } from '../../context/WindowContext';
import { WindowControls } from './WindowControls';
import { DynamicIcon } from '../ui/DynamicIcon';

// Apps
import { PrinterSimulator } from '../apps/PrinterSimulator';
import { SettingsApp } from '../apps/SettingsApp';
import { RecycleBinApp } from '../apps/RecycleBinApp';
import { CalculatorApp } from '../apps/CalculatorApp';
import { NotepadApp } from '../apps/NotepadApp';
import { BrowserApp } from '../apps/BrowserApp';
import { PaintApp } from '../apps/PaintApp';
import { MusicPlayerApp } from '../apps/MusicPlayerApp';
import { CameraApp } from '../apps/CameraApp';
import { WeatherApp } from '../apps/WeatherApp';
import { CalendarApp } from '../apps/CalendarApp';
import { TaskManagerApp } from '../apps/TaskManagerApp';
import { ProductivityDestroyerApp, DefinitelyNotMalwareApp } from '../apps/FunApps';

interface FakeWindowProps {
  window: WindowState;
}

export const FakeWindow: React.FC<FakeWindowProps> = ({ window: win }) => {
  const {
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    updatePosition,
  } = useWindowManager();

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isActive = activeWindowId === win.id;

  const handleMouseDownHeader = (e: React.MouseEvent) => {
    if (win.isMaximized) return;
    focusWindow(win.id);
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - win.position.x,
      y: e.clientY - win.position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = Math.max(10, Math.min(e.clientX - dragOffset.current.x, (typeof window !== 'undefined' ? window.innerWidth : 1200) - 100));
      const newY = Math.max(10, Math.min(e.clientY - dragOffset.current.y, (typeof window !== 'undefined' ? window.innerHeight : 800) - 100));
      updatePosition(win.id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, win.id, updatePosition]);

  if (win.isMinimized) return null;

  const renderAppContent = () => {
    switch (win.appId) {
      case 'printer':
        return <PrinterSimulator />;
      case 'settings':
        return <SettingsApp />;
      case 'recycle-bin':
        return <RecycleBinApp />;
      case 'calculator':
        return <CalculatorApp />;
      case 'notepad':
        return <NotepadApp />;
      case 'browser':
        return <BrowserApp />;
      case 'paint':
        return <PaintApp />;
      case 'music':
        return <MusicPlayerApp />;
      case 'camera':
        return <CameraApp />;
      case 'weather':
        return <WeatherApp />;
      case 'calendar':
        return <CalendarApp />;
      case 'task-manager':
        return <TaskManagerApp />;
      case 'destroyer':
        return <ProductivityDestroyerApp />;
      case 'malware':
        return <DefinitelyNotMalwareApp />;
      default:
        return (
          <div className="p-8 text-center text-slate-400">
            <p>Application logic not implemented because we got tired.</p>
          </div>
        );
    }
  };

  const style: React.CSSProperties = win.isMaximized
    ? {
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 48px)', // above taskbar
        zIndex: win.zIndex,
      }
    : {
        top: `${win.position.y}px`,
        left: `${win.position.x}px`,
        width: `${win.size.width}px`,
        height: `${win.size.height}px`,
        zIndex: win.zIndex,
      };

  return (
    <div
      onMouseDown={() => focusWindow(win.id)}
      style={style}
      className={`fixed flex flex-col rounded-2xl glass-window overflow-hidden transition-all duration-150 shadow-2xl ${
        isActive ? 'ring-1 ring-sky-400/40' : 'opacity-95'
      }`}
    >
      {/* Window Title Bar */}
      <div
        onMouseDown={handleMouseDownHeader}
        className={`flex items-center px-4 py-2.5 bg-slate-950/70 border-b border-slate-800/80 cursor-grab active:cursor-grabbing select-none ${
          isActive ? 'text-slate-100' : 'text-slate-400'
        }`}
      >
        <div className="flex items-center gap-2 font-semibold text-xs tracking-wide">
          <DynamicIcon name={win.iconName} className="w-4 h-4 text-sky-400" />
          <span>{win.title}</span>
        </div>

        <WindowControls
          onMinimize={() => minimizeWindow(win.id)}
          onMaximize={() => toggleMaximizeWindow(win.id)}
          onClose={() => closeWindow(win.id)}
          isMaximized={win.isMaximized}
        />
      </div>

      {/* App Body Content */}
      <div className="flex-1 overflow-hidden relative">{renderAppContent()}</div>
    </div>
  );
};
