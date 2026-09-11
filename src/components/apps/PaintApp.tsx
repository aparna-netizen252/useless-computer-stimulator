import React, { useRef, useState, useEffect } from 'react';
import { Palette, Trash2, Download } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';

export const PaintApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#38bdf8');
  const [, setStrokeCount] = useState<number>(0);
  const { showUselessMessage } = useToast();
  const { playClick, playError } = useSound();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial canvas background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setStrokeCount((prev) => {
        const next = prev + 1;
        if (next % 4 === 0) {
          playError();
          showUselessMessage('Artistic ability not detected.', 'Useless Paint', 'warning');
        }
        return next;
      });
    }
  };

  const clearCanvas = () => {
    playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    showUselessMessage('Canvas wiped. It was probably for the best.', 'Paint', 'info');
  };

  const saveArt = () => {
    playError();
    showUselessMessage('Artistic ability not detected. Masterpiece denied.', 'Paint', 'error');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/95 text-slate-100 select-none overflow-hidden font-sans">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-2 bg-slate-950/70 border-b border-slate-800">
        <div className="flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-bold text-slate-200">Useless Paint</span>
        </div>

        <div className="h-4 w-[1px] bg-slate-800 mx-1" />

        {/* Color swatches */}
        <div className="flex items-center gap-1.5">
          {['#38bdf8', '#f43f5e', '#10b981', '#fbbf24', '#a855f7', '#f8fafc'].map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                playClick();
              }}
              style={{ backgroundColor: c }}
              className={`w-5 h-5 rounded-full border transition-transform ${
                color === c ? 'scale-125 border-white shadow' : 'border-transparent hover:scale-110'
              }`}
            />
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={clearCanvas}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
          <button
            onClick={saveArt}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-xs font-medium"
          >
            <Download className="w-3.5 h-3.5" />
            Save (Refused)
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-slate-950 flex items-center justify-center p-3">
        <canvas
          ref={canvasRef}
          width={640}
          height={400}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="rounded-xl border border-slate-800 cursor-crosshair shadow-inner"
        />
      </div>
    </div>
  );
};
