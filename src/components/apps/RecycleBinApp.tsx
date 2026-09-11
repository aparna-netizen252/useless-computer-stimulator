import React, { useState } from 'react';
import { Trash2, RotateCcw, AlertTriangle, FileText, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';
import { REQUIRED_MESSAGES } from '../../data/uselessQuotes';

interface DeletedItem {
  id: string;
  name: string;
  originalPath: string;
  size: string;
  deletedTime: string;
}

const INITIAL_ITEMS: DeletedItem[] = [
  { id: '1', name: 'Motivation.dll', originalPath: 'C:\\Life\\MentalState', size: '0 KB', deletedTime: 'Just now' },
  { id: '2', name: 'Productivity.docx', originalPath: 'C:\\Users\\Work', size: '0 KB', deletedTime: '9:00 AM' },
  { id: '3', name: 'That important document.pdf', originalPath: 'C:\\Desktop\\NeverSaved', size: '999 GB', deletedTime: 'Yesterday' },
  { id: '4', name: 'Free time.zip', originalPath: 'C:\\Calendar\\Weekends', size: '1 byte', deletedTime: '2020' },
  { id: '5', name: 'Common sense.exe', originalPath: 'C:\\System32\\Logic', size: 'Unknown', deletedTime: 'Long ago' },
];

export const RecycleBinApp: React.FC = () => {
  const [items] = useState<DeletedItem[]>(INITIAL_ITEMS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { showUselessMessage } = useToast();
  const { playClick, playError } = useSound();

  const handleEmpty = () => {
    playError();
    showUselessMessage('Items refuse to leave: they feel safer in the trash.', 'Recycle Bin', 'warning');
  };

  const handleRestore = () => {
    playError();
    showUselessMessage('Restore failed: You cannot resurrect what was never truly there.', 'Recycle Bin', 'error');
  };

  const handleItemClick = (item: DeletedItem) => {
    playClick();
    setSelectedId(item.id);
    showUselessMessage(`"${item.name}" was discarded for a reason. Please let it rest.`, 'Item Locked', 'info');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/95 text-slate-100 p-5 select-none overflow-hidden">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100">Recycle Bin</h2>
            <p className="text-xs text-amber-400 font-medium">
              {REQUIRED_MESSAGES.RECYCLE_BIN}
            </p>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRestore}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
            Restore All
          </button>
          <button
            onClick={handleEmpty}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-xs font-semibold text-rose-300 border border-rose-500/30 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Empty Recycle Bin
          </button>
        </div>
      </div>

      {/* Item Table */}
      <div className="flex-1 overflow-auto mt-3">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="pb-2 font-medium">Name</th>
              <th className="pb-2 font-medium">Original Location</th>
              <th className="pb-2 font-medium">Date Deleted</th>
              <th className="pb-2 font-medium text-right">Size</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {items.map((item) => (
              <tr
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`cursor-pointer transition-colors ${
                  selectedId === item.id
                    ? 'bg-sky-500/20 text-sky-200'
                    : 'hover:bg-slate-800/40 text-slate-300'
                }`}
              >
                <td className="py-2.5 flex items-center gap-2 font-medium">
                  <FileText className="w-4 h-4 text-slate-400" />
                  {item.name}
                </td>
                <td className="py-2.5 text-slate-400">{item.originalPath}</td>
                <td className="py-2.5 text-slate-400">{item.deletedTime}</td>
                <td className="py-2.5 text-right font-mono text-slate-400">{item.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Status */}
      <div className="pt-3 border-t border-slate-800 text-xs text-slate-500 flex justify-between">
        <span>{items.length} items occupying emotional storage</span>
        <span>Space recovered: 0.00 bytes</span>
      </div>
    </div>
  );
};
