export type AppId = 
  | 'printer'
  | 'settings'
  | 'recycle-bin'
  | 'calculator'
  | 'notepad'
  | 'browser'
  | 'paint'
  | 'music'
  | 'camera'
  | 'weather'
  | 'calendar'
  | 'task-manager'
  | 'destroyer'
  | 'malware'
  | 'my-files'
  | 'important-stuff';

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  iconName: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export type ToastType = 'default' | 'warning' | 'error' | 'success' | 'achievement' | 'printer';

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type?: ToastType;
  duration?: number;
  icon?: string;
}

export interface FakeAppDefinition {
  id: AppId;
  title: string;
  description: string;
  iconName: string;
  defaultWidth: number;
  defaultHeight: number;
  isSystem?: boolean;
  pinnedInTaskbar?: boolean;
  onDesktop?: boolean;
  directAction?: 'refuse-files' | 'refuse-folder';
}

export interface FakeProcess {
  id: string;
  name: string;
  cpu: number;
  memory: string;
  status: string;
}
