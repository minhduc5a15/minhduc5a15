import { Maximize2, Minus, X, Terminal as TerminalIcon } from 'lucide-react';
import React from 'react';

interface TerminalWindowProps {
  isMatrixMode: boolean;
  dragControls: any;
}

export default function TerminalWindow({
  isMatrixMode,
  dragControls,
}: TerminalWindowProps) {
  return (
    <div
      className="bg-slate-900/50 border-b border-white/5 p-4 flex items-center justify-between backdrop-blur-md cursor-grab active:cursor-grabbing select-none"
      onPointerDown={(e) => dragControls.start(e)}
    >
      <div className="flex gap-2.5">
        <div className="w-3.5 h-3.5 rounded-full bg-red-500/90 shadow-[inset_0_1px_4px_rgba(0,0,0,0.4)] flex items-center justify-center group">
          <X
            size={8}
            className="opacity-0 group-hover:opacity-100 text-black"
          />
        </div>
        <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/90 shadow-[inset_0_1px_4px_rgba(0,0,0,0.4)] flex items-center justify-center group">
          <Minus
            size={8}
            className="opacity-0 group-hover:opacity-100 text-black"
          />
        </div>
        <div className="w-3.5 h-3.5 rounded-full bg-green-500/90 shadow-[inset_0_1px_4px_rgba(0,0,0,0.4)] flex items-center justify-center group">
          <Maximize2
            size={8}
            className="opacity-0 group-hover:opacity-100 text-black"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 opacity-70 pointer-events-none">
        <TerminalIcon
          size={16}
          className={isMatrixMode ? 'text-green-500' : 'text-slate-400'}
        />
        <span
          className={`text-sm font-semibold tracking-wide ${isMatrixMode ? 'text-green-400' : 'text-slate-300'}`}
        >
          duck@portfolio ~ -zsh
        </span>
      </div>
      <div></div>
    </div>
  );
}
