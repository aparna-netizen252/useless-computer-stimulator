import React, { useState } from 'react';
import { Search, Sparkles, Frown, X } from 'lucide-react';
import { REQUIRED_MESSAGES, SARCASTIC_SEARCH_RESPONSES } from '../../data/uselessQuotes';
import { useSound } from '../../context/SoundContext';

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchPanel: React.FC<SearchPanelProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const { playError } = useSound();

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    playError();
    setHasSearched(true);
    // Pick 2-3 sarcastic responses
    const shuffled = [...SARCASTIC_SEARCH_RESPONSES].sort(() => 0.5 - Math.random());
    setResults(shuffled.slice(0, 3));
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-14 left-4 sm:left-1/2 sm:-translate-x-1/2 w-80 sm:w-96 rounded-2xl glass-panel p-5 z-50 animate-scale-in flex flex-col gap-4 text-slate-100 shadow-2xl border border-white/10"
    >
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-sky-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            {REQUIRED_MESSAGES.SEARCH}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Search Input Form */}
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for lost hopes, files, or answers..."
          autoFocus
          className="w-full py-2.5 pl-9 pr-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-xs text-slate-100 outline-none focus:border-sky-400/80 transition-colors"
        />
        <Search className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-500" />
      </form>

      {/* Results Container */}
      <div className="min-h-32 flex flex-col justify-center">
        {hasSearched ? (
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-500 block">
              Search results for "{query}":
            </span>
            {results.map((res, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 text-xs text-amber-300 flex items-center gap-2 animate-fade-in"
              >
                <Frown className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{res}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500 text-xs py-4 flex flex-col items-center gap-1.5">
            <Sparkles className="w-5 h-5 text-slate-600" />
            <p>Type anything and discover how little it matters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
