import React, { useState } from 'react';
import { Compass, ArrowLeft, ArrowRight, RotateCw, Globe, ShieldAlert, WifiOff } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';

export const BrowserApp: React.FC = () => {
  const [url, setUrl] = useState<string>('https://google.com');
  const [loading, setLoading] = useState<boolean>(false);
  const { showUselessMessage } = useToast();
  const { playClick, playError } = useSound();

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      playError();
      showUselessMessage('The internet is currently unavailable because we forgot where it is.', 'Useless Browser', 'error');
    }, 1200);
  };

  const handleRefresh = () => {
    playClick();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showUselessMessage('The internet is currently hiding.', 'Useless Browser', 'warning');
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/95 text-slate-100 select-none overflow-hidden font-sans">
      {/* Browser Chrome Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-950/70 border-b border-slate-800">
        <div className="flex items-center gap-1 text-slate-400">
          <button
            onClick={() => showUselessMessage('Back button: Past regrets cannot be undone.', 'Browser', 'info')}
            className="p-1 rounded hover:bg-slate-800 hover:text-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => showUselessMessage('Forward button: The future holds no web pages.', 'Browser', 'info')}
            className="p-1 rounded hover:bg-slate-800 hover:text-slate-200"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleRefresh}
            className="p-1 rounded hover:bg-slate-800 hover:text-slate-200"
          >
            <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin text-sky-400' : ''}`} />
          </button>
        </div>

        {/* Address Bar Form */}
        <form onSubmit={handleNavigate} className="flex-1 flex items-center">
          <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-slate-200 font-mono text-xs"
            />
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-medium">
              Disconnected
            </span>
          </div>
        </form>
      </div>

      {/* Web Page Viewport */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center text-center overflow-auto bg-slate-950/40">
        <div className="max-w-md p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center">
          <div className="p-4 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-4">
            <WifiOff className="w-10 h-10" />
          </div>

          <h3 className="text-lg font-bold text-slate-100 mb-1">The internet is currently hiding.</h3>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            The internet is currently unavailable because we forgot where it is. We checked between the couch cushions and behind the router.
          </p>

          <div className="w-full p-3 rounded-lg bg-slate-950/60 border border-slate-800 font-mono text-xs text-amber-400 mb-5 text-left">
            <div>ERR_INTERNET_DISAPPEARED</div>
            <div className="text-slate-500 mt-1">Host: {url}</div>
          </div>

          <button
            onClick={handleRefresh}
            className="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 active:scale-95 text-white font-semibold text-xs shadow-lg shadow-sky-500/20 transition-all"
          >
            Look for Internet Again
          </button>
        </div>
      </div>
    </div>
  );
};
