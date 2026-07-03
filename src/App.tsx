import React, { useState, useEffect, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Terminal as TerminalIcon, Volume2, VolumeX, Maximize2, X, Minus } from 'lucide-react';

import { audioManager } from './utils/audio';
import BootSequence from './components/BootSequence';
import MatrixRain from './components/MatrixRain';
import { contentBlocks } from './constants/terminalData';

type HistoryItem = {
  id: string;
  type: 'input' | 'output';
  content: React.ReactNode;
};

function App() {
  const [isBooting, setIsBooting] = useState(() => {
    return localStorage.getItem('duckos_booted') !== 'true';
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState('');
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    audioManager.init();
  }, []);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const pushOutput = (content: React.ReactNode) => {
      setHistory(prev => [...prev, { id: crypto.randomUUID(), type: 'output', content }]);
    };

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmed === 'ls') return pushOutput(contentBlocks.ls);
    if (trimmed === 'help') return pushOutput(contentBlocks.help);
    if (trimmed === 'whoami') return pushOutput(<span className="text-slate-300">duck (Root Access Granted)</span>);
    if (trimmed === 'sudo rm -rf /') return pushOutput(<span className="text-red-500 font-bold">Nice try! Permission denied. You don't have enough ducks to do this.</span>);
    if (trimmed === 'matrix') {
      setIsMatrixMode(prev => !prev);
      return pushOutput(<span className="text-green-500">Toggling Matrix Protocol...</span>);
    }

    if (trimmed.startsWith('cat ')) {
      const arg = trimmed.replace('cat ', '').trim();
      if (arg === 'about.txt') pushOutput(contentBlocks.about);
      else if (arg === 'skills.txt') pushOutput(contentBlocks.skills);
      else if (arg === 'contact.txt') pushOutput(contentBlocks.contact);
      else pushOutput(<span className="text-red-400">cat: {arg}: No such file or directory</span>);
      return;
    }

    if (trimmed.startsWith('cd ')) {
      const arg = trimmed.replace('cd ', '').trim();
      if (arg === 'projects' || arg === 'projects/') pushOutput(contentBlocks.projects);
      else pushOutput(<span className="text-red-400">cd: {arg}: Not a directory</span>);
      return;
    }

    pushOutput(<span className="text-red-400">zsh: command not found: {trimmed}. Type 'help' for available commands.</span>);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (soundEnabled) {
      if (e.key.length === 1 || e.key === 'Backspace') {
        audioManager.playClick(0.05);
      } else if (e.key === 'Enter') {
        audioManager.playClick(0.1);
      }
    }

    if (e.key === 'Enter') {
      const cmd = input;
      setInput('');
      setHistory(prev => [...prev, { id: crypto.randomUUID(), type: 'input', content: cmd }]);
      executeCommand(cmd);
    }
  };

  const handleTabClick = (cmd: string) => {
    if (soundEnabled) audioManager.playClick(0.1);
    setHistory(prev => [...prev, { id: crypto.randomUUID(), type: 'input', content: cmd }]);
    executeCommand(cmd);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!isBooting && history.length === 0) {
      setHistory([
        { id: crypto.randomUUID(), type: 'output', content: <span className="text-slate-400">Welcome to DuckOS. Type <span className="text-teal-400 font-bold">help</span> to get started.</span> },
        { id: crypto.randomUUID(), type: 'output', content: contentBlocks.about }
      ]);
      inputRef.current?.focus();
    }
  }, [isBooting]);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (scrollContainerRef.current) {
      if (isInitialMount.current && history.length <= 2) {
        if (history.length > 0) isInitialMount.current = false;
        return;
      }
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history, input]);

  if (isBooting) {
    return <BootSequence onComplete={() => {
      localStorage.setItem('duckos_booted', 'true');
      setIsBooting(false);
    }} />;
  }

  return (
    <div 
      ref={boundsRef}
      className="relative w-full min-h-screen p-4 md:p-8 flex items-center justify-center overflow-hidden selection:bg-blue-500/30 selection:text-white font-mono"
      onClick={() => inputRef.current?.focus()}
    >
      <div className={`absolute inset-0 z-0 ${isMatrixMode ? 'bg-black' : 'bg-[#0a0a0a]'}`}>
        {!isMatrixMode ? (
          <>
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] mix-blend-screen"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-600/10 blur-[100px] mix-blend-screen"></div>
            <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-blue-500/15 blur-[100px] mix-blend-screen"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </>
        ) : (
          <MatrixRain />
        )}
      </div>
      
      <button 
        onClick={(e) => { e.stopPropagation(); setSoundEnabled(!soundEnabled); }}
        className="absolute top-6 right-6 z-20 text-slate-400 hover:text-white transition-colors bg-white/5 p-3 rounded-full backdrop-blur-md border border-white/10"
      >
        {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

      <motion.div 
        drag
        dragConstraints={boundsRef}
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-10 w-full max-w-5xl h-[85vh] border bg-slate-950/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col rounded-2xl overflow-hidden ${isMatrixMode ? 'border-green-500/30 ring-1 ring-green-500/20' : 'border-white/10 ring-1 ring-white/5'}`}
      >
        <div 
          className="bg-slate-900/50 border-b border-white/5 p-4 flex items-center justify-between backdrop-blur-md cursor-grab active:cursor-grabbing select-none"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <div className="flex gap-2.5">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500/90 shadow-[inset_0_1px_4px_rgba(0,0,0,0.4)] flex items-center justify-center group"><X size={8} className="opacity-0 group-hover:opacity-100 text-black"/></div>
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/90 shadow-[inset_0_1px_4px_rgba(0,0,0,0.4)] flex items-center justify-center group"><Minus size={8} className="opacity-0 group-hover:opacity-100 text-black"/></div>
            <div className="w-3.5 h-3.5 rounded-full bg-green-500/90 shadow-[inset_0_1px_4px_rgba(0,0,0,0.4)] flex items-center justify-center group"><Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black"/></div>
          </div>
          <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 opacity-70 pointer-events-none">
            <TerminalIcon size={16} className={isMatrixMode ? 'text-green-500' : 'text-slate-400'} />
            <span className={`text-sm font-semibold tracking-wide ${isMatrixMode ? 'text-green-400' : 'text-slate-300'}`}>duck@portfolio ~ -zsh</span>
          </div>
          <div></div>
        </div>

        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar relative">
          <div className="flex flex-wrap gap-3 mb-8 border-b border-white/5 pb-6 select-none">
            {['cat about.txt', 'cat skills.txt', 'cd projects', 'cat contact.txt'].map(tab => (
              <button
                key={tab}
                onClick={(e) => { e.stopPropagation(); handleTabClick(tab); }}
                className="text-sm px-4 py-2 rounded-lg transition-all duration-300 font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 bg-white/[0.02] border border-white/5"
              >
                <span className="opacity-40 mr-2 text-slate-500">./</span>{tab.split(' ')[1] || tab.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto pb-20">
            <div className="mb-8 text-slate-500 text-sm opacity-80">
              Last login: {new Date().toDateString()} on ttys000
            </div>

            <div className="space-y-6">
              {history.map((item) => (
                <div key={item.id}>
                  {item.type === 'input' ? (
                    <div className="flex items-center gap-2 font-semibold text-base">
                      <span className="text-indigo-400">duck</span>
                      <span className="text-slate-400">in</span>
                      <span className="text-teal-400">~/portfolio</span>
                      <span className="text-slate-300 ml-2">λ</span>
                      <span className="text-slate-100 ml-2">{item.content}</span>
                    </div>
                  ) : (
                    <div className="mt-4">{item.content}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 font-semibold text-base mt-6">
              <span className="text-indigo-400">duck</span>
              <span className="text-slate-400">in</span>
              <span className="text-teal-400">~/portfolio</span>
              <span className="text-slate-300 ml-2">λ</span>
              <div className="relative flex-1 flex items-center min-w-[200px]">
                <input 
                  ref={inputRef}
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-slate-100 ml-2 caret-transparent"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
                <span 
                  className={`absolute w-2.5 h-5 ${isMatrixMode ? 'bg-green-500' : 'bg-indigo-400/80'} animate-pulse rounded-[1px] pointer-events-none`}
                  style={{ left: `calc(0.5rem + ${input.length} * 9.6px)` }}
                ></span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
