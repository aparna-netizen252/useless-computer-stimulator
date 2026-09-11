import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';

const FUNNY_MATH_RESULTS = [
  "2 + 2 = Please don't ask difficult questions.",
  "Calculation postponed indefinitely.",
  "Result: 42 (Unverified)",
  "Error: Math is an illusion.",
  "Result: Approximately somewhere between 0 and Infinity.",
  "Calculator is taking a mental health day.",
  "Why solve numbers when we can stare into space?",
  "Result: NaN (Not a Number, Not your business)",
];

export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const { showUselessMessage } = useToast();
  const { playClick, playError } = useSound();

  const handleDigit = (digit: string) => {
    playClick();
    setDisplay((prev) => (prev === '0' || prev.length > 15 ? digit : prev + digit));
  };

  const handleClear = () => {
    playClick();
    setDisplay('0');
    showUselessMessage('Display wiped clean. Ignorance is bliss.', 'Calculator', 'info');
  };

  const handleEquals = () => {
    playError();
    const randomMsg = FUNNY_MATH_RESULTS[Math.floor(Math.random() * FUNNY_MATH_RESULTS.length)];
    setDisplay('???');
    showUselessMessage(randomMsg, 'Math Refusal', 'warning');
  };

  const handleOp = (op: string) => {
    playClick();
    setDisplay((prev) => prev + ' ' + op + ' ');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/95 text-slate-100 p-4 select-none">
      {/* Display */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-right mb-4">
        <div className="text-xs text-slate-500 font-mono">Useless Calc v0.0</div>
        <div className="text-2xl sm:text-3xl font-mono font-bold text-sky-400 truncate mt-1">
          {display}
        </div>
      </div>

      {/* Buttons Keypad */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        {['C', '(', ')', '/'].map((item) => (
          <button
            key={item}
            onClick={() => (item === 'C' ? handleClear() : handleOp(item))}
            className="rounded-xl bg-slate-800/80 hover:bg-slate-700/80 active:scale-95 font-semibold text-sm text-sky-300 border border-slate-700 transition-all flex items-center justify-center"
          >
            {item}
          </button>
        ))}

        {['7', '8', '9', '*'].map((item) => (
          <button
            key={item}
            onClick={() => (item === '*' ? handleOp(item) : handleDigit(item))}
            className="rounded-xl bg-slate-800/50 hover:bg-slate-700 active:scale-95 font-semibold text-base text-slate-200 border border-slate-700/60 transition-all flex items-center justify-center"
          >
            {item}
          </button>
        ))}

        {['4', '5', '6', '-'].map((item) => (
          <button
            key={item}
            onClick={() => (item === '-' ? handleOp(item) : handleDigit(item))}
            className="rounded-xl bg-slate-800/50 hover:bg-slate-700 active:scale-95 font-semibold text-base text-slate-200 border border-slate-700/60 transition-all flex items-center justify-center"
          >
            {item}
          </button>
        ))}

        {['1', '2', '3', '+'].map((item) => (
          <button
            key={item}
            onClick={() => (item === '+' ? handleOp(item) : handleDigit(item))}
            className="rounded-xl bg-slate-800/50 hover:bg-slate-700 active:scale-95 font-semibold text-base text-slate-200 border border-slate-700/60 transition-all flex items-center justify-center"
          >
            {item}
          </button>
        ))}

        <button
          onClick={() => handleDigit('0')}
          className="col-span-2 rounded-xl bg-slate-800/50 hover:bg-slate-700 active:scale-95 font-semibold text-base text-slate-200 border border-slate-700/60 transition-all flex items-center justify-center"
        >
          0
        </button>
        <button
          onClick={() => handleDigit('.')}
          className="rounded-xl bg-slate-800/50 hover:bg-slate-700 active:scale-95 font-semibold text-base text-slate-200 border border-slate-700/60 transition-all flex items-center justify-center"
        >
          .
        </button>
        <button
          onClick={handleEquals}
          className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 active:scale-95 font-bold text-lg text-white shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center"
        >
          =
        </button>
      </div>
    </div>
  );
};
