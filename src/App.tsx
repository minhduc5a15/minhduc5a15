import React, { useState, useEffect, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Terminal as TerminalIcon, Code, Cpu, Database, ChevronRight, Github, Volume2, VolumeX, Maximize2, X, Minus } from 'lucide-react';

// --- Web Audio API for Keyboard Sound ---
const playClickSound = (volume = 0.05) => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.02);
    
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.02);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch (e) {
    // Ignore audio errors
  }
};

// --- Boot Sequence Component ---
const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const bootLogs = [
    "BIOS Date 07/03/26 15:10:30 Ver 1.00",
    "CPU: Duck Quantum Processor @ 4.2GHz",
    "Memory Test: 65536K OK",
    "Loading Kernel...",
    "[ OK ] Mounted Root File System",
    "[ OK ] Started Logging Service",
    "[ OK ] Started Container Engine",
    "[ OK ] Reached target Graphical Interface",
    "Boot sequence complete. Initializing DuckOS..."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      setLines(prev => [...prev, bootLogs[currentLine]]);
      currentLine++;
      if (currentLine >= bootLogs.length) {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black text-green-500 font-mono p-6 z-50 flex flex-col gap-1 text-sm md:text-base overflow-hidden">
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <div className="animate-pulse w-2 h-4 bg-green-500 mt-2"></div>
    </div>
  );
};

type HistoryItem = {
  id: string;
  type: 'input' | 'output';
  content: React.ReactNode;
};

// --- Main App Component ---
function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState('');
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const contentBlocks = {
    about: (
      <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <h2 className="text-xl font-bold flex items-center gap-3 text-white uppercase tracking-wider">
          <span className="text-indigo-500">➜</span> IDENTIFICATION
        </h2>
        <div className="pl-6 flex flex-col md:flex-row gap-8 items-start">
          <div className="shrink-0 relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <img src={`${import.meta.env.BASE_URL}user-avatar.jpg`} alt="minhduc5a15 avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-[#0d1326] shadow-lg"></div>
          </div>
          <div className="space-y-5 flex-1">
            <p className="text-lg md:text-xl leading-relaxed font-medium">
              Hello, I am <span className="text-white">minhduc5a15</span> (Duck).
            </p>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center gap-3"><ChevronRight size={16} className="text-indigo-500 shrink-0"/> <span>Role: <span className="text-blue-300">AI Engineer | AI System Engineer | System Engineer</span></span></li>
              <li className="flex items-center gap-3"><ChevronRight size={16} className="text-indigo-500 shrink-0"/> <span>Location: Vietnam</span></li>
              <li className="flex items-center gap-3"><ChevronRight size={16} className="text-indigo-500 shrink-0"/> <span>Mission: Building highly optimized, privacy-first, and deeply integrated AI systems.</span></li>
            </ul>
            <div className="p-4 rounded-lg bg-white/5 border border-white/5 text-slate-400 italic">
              "What I cannot create, I do not understand." - Richard Feynman
            </div>
          </div>
        </div>
      </div>
    ),
    skills: (
      <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <h2 className="text-xl font-bold flex items-center gap-3 text-white uppercase tracking-wider">
          <span className="text-indigo-500">➜</span> CORE_CAPABILITIES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pl-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:bg-white/[0.04] transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4 text-teal-400 group-hover:scale-110 transition-transform">
              <Cpu size={20} />
            </div>
            <h3 className="font-semibold mb-2 text-white">Systems Engineering</h3>
            <p className="text-slate-400 text-sm leading-relaxed">C/C++, Modern C++20, Memory Management, SIMD AVX2, OpenMP, High-Performance Computing.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:bg-white/[0.04] transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 text-indigo-400 group-hover:scale-110 transition-transform">
              <Code size={20} />
            </div>
            <h3 className="font-semibold mb-2 text-white">AI / Machine Learning</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Python, PyTorch, Tensor Runtime implementation, Autograd systems, Deep Learning.</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:bg-white/[0.04] transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
              <Database size={20} />
            </div>
            <h3 className="font-semibold mb-2 text-white">Software Architecture</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Microservices, Distributed Systems, API Design (Golang/Node), System Optimization.</p>
          </div>
        </div>
      </div>
    ),
    projects: (
      <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <h2 className="text-xl font-bold flex items-center gap-3 text-white uppercase tracking-wider">
          <span className="text-indigo-500">➜</span> EXECUTABLES
        </h2>
        <div className="space-y-8 pl-6">
          <div className="relative group">
            <div className="absolute -inset-4 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-3">
                  <a href="https://github.com/minhduc5a15/HELIX" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                    HELIX <Github size={18} className="opacity-50" />
                  </a>
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/10 text-slate-300">C++20</span>
              </div>
              <p className="text-indigo-300 text-sm mb-3 font-medium">Deep Learning Framework in Modern C++</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Built entirely from scratch. Features Tensor Runtime with O(1) latency, Dynamic Autograd (Define-by-Run), and hardware-level optimizations (SIMD AVX2, OpenMP) reaching up to 37 GFLOPS for matrix multiplication.
              </p>
            </div>
          </div>
          <div className="relative group mt-8">
            <div className="absolute -inset-4 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-3">
                  <a href="https://github.com/minhduc5a15/duckpass" target="_blank" rel="noreferrer" className="hover:text-teal-400 transition-colors flex items-center gap-2">
                    duckpass <Github size={18} className="opacity-50" />
                  </a>
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/10 text-slate-300">C++20 / OpenSSL</span>
              </div>
              <p className="text-teal-300 text-sm mb-3 font-medium">Secure Command-Line Password Manager</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                A highly secure CLI vault built in C++20. Implements OpenSSL Secure Heap allocation and CAP_IPC_LOCK to prevent memory swapping to disk. Uses Argon2 for key derivation to ensure maximum protection of sensitive data.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    contact: (
      <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <h2 className="text-xl font-bold flex items-center gap-3 text-white uppercase tracking-wider">
          <span className="text-indigo-500">➜</span> ESTABLISH_CONNECTION
        </h2>
        <div className="pl-6 space-y-6">
          <p className="text-slate-400">Awaiting secure transmission...</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="mailto:minhduc5a15@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all group">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-indigo-500 group-hover:text-white transition-colors">@</div>
              <div>
                <div className="text-xs text-slate-500 mb-1 font-semibold uppercase">Email</div>
                <div className="text-slate-200 text-sm">minhduc5a15@gmail.com</div>
              </div>
            </a>
            <a href="https://github.com/minhduc5a15" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-slate-400/50 hover:bg-slate-400/10 transition-all group">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-slate-700 group-hover:text-white transition-colors"><Github size={18}/></div>
              <div>
                <div className="text-xs text-slate-500 mb-1 font-semibold uppercase">GitHub</div>
                <div className="text-slate-200 text-sm">github.com/minhduc5a15</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    ),
    help: (
      <div className="space-y-2 text-slate-300">
        <p className="text-indigo-400 font-bold mb-4">DuckOS Terminal Help</p>
        <p><span className="text-teal-400 font-bold w-20 inline-block">ls</span>: List available files</p>
        <p><span className="text-teal-400 font-bold w-20 inline-block">cat</span>: Read a file (e.g., cat about.txt)</p>
        <p><span className="text-teal-400 font-bold w-20 inline-block">clear</span>: Clear terminal history</p>
        <p><span className="text-teal-400 font-bold w-20 inline-block">whoami</span>: Print current user</p>
        <p><span className="text-teal-400 font-bold w-20 inline-block">matrix</span>: Toggle matrix protocol</p>
      </div>
    ),
    ls: (
      <div className="flex gap-4 text-indigo-300 font-semibold">
        <span>about.txt</span>
        <span>skills.txt</span>
        <span className="text-teal-400">projects/</span>
        <span>contact.txt</span>
      </div>
    )
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const pushOutput = (content: React.ReactNode) => {
      setHistory(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), type: 'output', content }]);
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
    if (soundEnabled && e.key !== 'Enter' && e.key !== 'Shift') playClickSound();

    if (e.key === 'Enter') {
      if (soundEnabled) playClickSound(0.1); // Louder sound for enter
      const cmd = input;
      setInput('');
      setHistory(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), type: 'input', content: cmd }]);
      executeCommand(cmd);
    }
  };

  const handleTabClick = (cmd: string) => {
    if (soundEnabled) playClickSound(0.1);
    setHistory(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), type: 'input', content: cmd }]);
    executeCommand(cmd);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!isBooting && history.length === 0) {
      setHistory([
        { id: 'w1', type: 'output', content: <span className="text-slate-400">Welcome to DuckOS. Type <span className="text-teal-400 font-bold">help</span> to get started.</span> },
        { id: 'w2', type: 'output', content: contentBlocks.about }
      ]);
      inputRef.current?.focus();
    }
  }, [isBooting]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, input]);

  if (isBooting) {
    return <BootSequence onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div 
      className="relative w-full min-h-screen p-4 md:p-8 flex items-center justify-center overflow-hidden selection:bg-blue-500/30 selection:text-white font-mono"
      onClick={() => inputRef.current?.focus()}
    >
      <div className={`absolute inset-0 z-0 ${isMatrixMode ? 'bg-black' : 'bg-[#0a0a0a]'}`}>
        {!isMatrixMode && (
          <>
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] mix-blend-screen"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-600/10 blur-[100px] mix-blend-screen"></div>
            <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-blue-500/15 blur-[100px] mix-blend-screen"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </>
        )}
        {isMatrixMode && (
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #0f0 2px, #0f0 4px)', backgroundSize: '100% 4px' }}></div>
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
          <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 opacity-70">
            <TerminalIcon size={16} className={isMatrixMode ? 'text-green-500' : 'text-slate-400'} />
            <span className={`text-sm font-semibold tracking-wide ${isMatrixMode ? 'text-green-400' : 'text-slate-300'}`}>duck@portfolio ~ -zsh</span>
          </div>
          <div></div>
        </div>

        <div ref={containerRef} className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar relative">
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
