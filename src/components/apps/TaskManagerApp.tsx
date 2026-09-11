import React, { useState, useEffect } from 'react';
import { Activity, XCircle, Cpu, Layers } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';
import { FakeProcess } from '../../types/os';

const INITIAL_PROCESSES: FakeProcess[] = [
  { id: '1', name: 'Uselessness.exe', cpu: 97, memory: '4,096 MB', status: 'Crucial (Cannot Stop)' },
  { id: '2', name: 'Productivity.exe', cpu: 0, memory: '0 MB', status: 'Comatose' },
  { id: '3', name: 'Thinking.exe', cpu: 12, memory: '128 MB', status: 'Confused' },
  { id: '4', name: 'DoingStuff.exe', cpu: 0, memory: '0 MB', status: 'Not Found' },
  { id: '5', name: 'BackgroundNonsense.exe', cpu: 84, memory: '2,048 MB', status: 'Thriving' },
  { id: '6', name: 'OverthinkingEverything.dll', cpu: 45, memory: '890 MB', status: 'Overheating' },
  { id: '7', name: 'EndlessDistraction.sys', cpu: 62, memory: '1,500 MB', status: 'Active' },
];

export const TaskManagerApp: React.FC = () => {
  const [processes, setProcesses] = useState<FakeProcess[]>(INITIAL_PROCESSES);
  const [selectedId, setSelectedId] = useState<string>('1');
  const { showUselessMessage } = useToast();
  const { playClick, playError } = useSound();

  // Subtle live fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setProcesses((prev) =>
        prev.map((p) => {
          if (p.name === 'Productivity.exe' || p.name === 'DoingStuff.exe') return p;
          const delta = (Math.random() - 0.5) * 4;
          return {
            ...p,
            cpu: Math.min(99, Math.max(5, Math.round(p.cpu + delta))),
          };
        })
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleEndTask = () => {
    playError();
    const sel = processes.find((p) => p.id === selectedId);
    showUselessMessage(
      `Task Manager refuses to end ${sel?.name || 'task'} - it is critical to system uselessness.`,
      'Task Manager Refusal',
      'error'
    );
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/95 text-slate-100 p-5 select-none overflow-hidden font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <Activity className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm font-bold text-slate-100">Task Manager</h2>
        </div>

        <button
          onClick={handleEndTask}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-xs font-semibold text-rose-300 border border-rose-500/30 transition-colors"
        >
          <XCircle className="w-3.5 h-3.5" />
          End Task
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-3 my-3">
        <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Total Uselessness</span>
            <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">99.9%</div>
          </div>
          <Cpu className="w-6 h-6 text-amber-400/80" />
        </div>

        <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Productivity Rate</span>
            <div className="text-xl font-bold font-mono text-rose-400 mt-0.5">0.0%</div>
          </div>
          <Layers className="w-6 h-6 text-rose-400/80" />
        </div>
      </div>

      {/* Process Table */}
      <div className="flex-1 overflow-auto border border-slate-800 rounded-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="sticky top-0 bg-slate-950 text-slate-400">
            <tr className="border-b border-slate-800">
              <th className="p-2.5 font-medium">Process Name</th>
              <th className="p-2.5 font-medium text-right">CPU</th>
              <th className="p-2.5 font-medium text-right">Memory</th>
              <th className="p-2.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {processes.map((p) => (
              <tr
                key={p.id}
                onClick={() => {
                  playClick();
                  setSelectedId(p.id);
                }}
                className={`cursor-pointer transition-colors ${
                  selectedId === p.id
                    ? 'bg-sky-500/20 text-sky-200'
                    : 'hover:bg-slate-800/50 text-slate-300'
                }`}
              >
                <td className="p-2.5 font-mono font-medium">{p.name}</td>
                <td className="p-2.5 text-right font-mono">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] ${
                      p.cpu > 70
                        ? 'bg-rose-500/20 text-rose-400'
                        : p.cpu > 20
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'text-slate-500'
                    }`}
                  >
                    {p.cpu}%
                  </span>
                </td>
                <td className="p-2.5 text-right font-mono text-slate-400">{p.memory}</td>
                <td className="p-2.5 text-slate-400">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Bar */}
      <div className="pt-2.5 text-[11px] text-slate-500 flex justify-between">
        <span>7 useless tasks running...</span>
        <span>0 productive tasks running.</span>
      </div>
    </div>
  );
};
