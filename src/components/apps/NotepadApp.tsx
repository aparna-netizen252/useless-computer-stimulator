import React, { useState } from 'react';
import { FileEdit, Save, Trash, HelpCircle, FileX } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';

export const NotepadApp: React.FC = () => {
  const [text, setText] = useState<string>('Type your brilliant, world-changing ideas here...');
  const { showUselessMessage } = useToast();
  const { playClick, playError } = useSound();

  const handleSave = () => {
    playError();
    showUselessMessage('Your note has been successfully forgotten.', 'Notepad', 'warning');
  };

  const handleClear = () => {
    playClick();
    setText('');
    showUselessMessage('Your thoughts have been saved nowhere.', 'Notepad', 'info');
  };

  const handleMenuClick = (menu: string) => {
    playClick();
    showUselessMessage(`Menu "${menu}" clicked: The developers forgot to hook this up.`, 'Notepad', 'info');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/95 text-slate-100 select-none overflow-hidden font-sans">
      {/* Menu Bar */}
      <div className="flex items-center gap-4 px-4 py-1.5 bg-slate-950/60 border-b border-slate-800 text-xs text-slate-300">
        <button onClick={() => handleMenuClick('File')} className="hover:text-sky-400">File</button>
        <button onClick={() => handleMenuClick('Edit')} className="hover:text-sky-400">Edit</button>
        <button onClick={() => handleMenuClick('Format')} className="hover:text-sky-400">Format</button>
        <button onClick={() => handleMenuClick('Help')} className="hover:text-sky-400">Help</button>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            Save (Forget)
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <Trash className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 w-full p-4 bg-slate-900/50 text-slate-200 resize-none font-mono text-sm leading-relaxed border-none outline-none focus:ring-0 placeholder:text-slate-600"
        placeholder="Start typing your unsaved memoirs..."
      />

      {/* Status Bar */}
      <div className="px-4 py-1.5 bg-slate-950/80 border-t border-slate-800 flex justify-between text-[11px] text-slate-500 font-mono">
        <span>Characters: {text.length} | Lines: {text.split('\n').length}</span>
        <span className="text-amber-500">Auto-saved to: /dev/null</span>
      </div>
    </div>
  );
};
