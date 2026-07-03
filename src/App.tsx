import React, { useState, useEffect, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import {
  Terminal as TerminalIcon,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Minus,
} from 'lucide-react';

import { audioManager } from './utils/audio';
import BootSequence from './components/BootSequence';
import MatrixRain from './components/MatrixRain';
import { contentBlocks } from './constants/terminalData';
import { CommandParser } from './utils/vfs/CommandParser';
import { executeCommandEngine } from './utils/vfs/commands';
import { rootFS } from './utils/vfs/init';
import { FileSystem } from './utils/vfs/FileSystem';

type HistoryItem = {
  id: string;
  type: 'input' | 'output';
  content: React.ReactNode;
  cwd?: string;
};

function App() {
  const [isBooting, setIsBooting] = useState(() => {
    return localStorage.getItem('duckos_booted') !== 'true';
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('~/portfolio');
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [draftInput, setDraftInput] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    audioManager.init();
  }, []);

  const executeCommand = (cmd: string) => {
    const commands = CommandParser.parse(cmd);
    if (commands.length === 0) return;

    let currentCwd = cwd;
    const newHistoryItems: HistoryItem[] = [];
    let shouldClear = false;
    let shouldToggleMatrix = false;

    for (const args of commands) {
      if (args.length === 0) continue;

      const response = executeCommandEngine(args, {
        cwd: currentCwd,
        fs: rootFS,
      });

      if (response.clearTerminal) {
        shouldClear = true;
      }

      if (response.newCwd) {
        currentCwd = response.newCwd;
      }

      if (response.action === 'toggle_matrix') {
        shouldToggleMatrix = true;
      }

      if (response.output) {
        newHistoryItems.push({
          id: crypto.randomUUID(),
          type: 'output',
          content: response.output,
        });
      }

      if (response.error) {
        break; // Short-circuit on error
      }
    }

    if (shouldClear) {
      setHistory([]);
    } else if (newHistoryItems.length > 0) {
      setHistory((prev) => [...prev, ...newHistoryItems]);
    }

    if (shouldToggleMatrix) {
      setIsMatrixMode((prev) => !prev);
    }

    if (currentCwd !== cwd) {
      setCwd(currentCwd);
    }
  };

  const AVAILABLE_COMMANDS = [
    'help',
    'clear',
    'ls',
    'cd',
    'cat',
    'pwd',
    'whoami',
    'sudo',
    'matrix',
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (soundEnabled) {
      if (e.key.length === 1 || e.key === 'Backspace') {
        audioManager.playClick(0.05);
      } else if (e.key === 'Enter') {
        audioManager.playClick(0.1);
      }
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      if (!input) return;
      const parts = input.split(' ');
      if (parts.length === 1) {
        const matches = AVAILABLE_COMMANDS.filter((cmd) =>
          cmd.startsWith(parts[0])
        );
        if (matches.length === 1) {
          setInput(matches[0] + ' ');
        }
      } else if (parts.length === 2 && ['cd', 'cat', 'ls'].includes(parts[0])) {
        const prefix = parts[1];
        const lastSlashIdx = prefix.lastIndexOf('/');
        let dirPath = '';
        let filePrefix = prefix;
        if (lastSlashIdx !== -1) {
          dirPath = prefix.substring(0, lastSlashIdx);
          filePrefix = prefix.substring(lastSlashIdx + 1);
        }
        const resolvedDir = FileSystem.resolvePath(cwd, dirPath);
        const node = FileSystem.getNode(rootFS, resolvedDir);
        if (node && node.type === 'directory') {
          const childrenNames = Object.keys(node.children).filter((name) =>
            name.startsWith(filePrefix)
          );
          if (childrenNames.length === 1) {
            const childName = childrenNames[0];
            const childNode = node.children[childName];
            const separator = dirPath ? '/' : '';
            const suffix = childNode.type === 'directory' ? '/' : ' ';
            setInput(`${parts[0]} ${dirPath}${separator}${childName}${suffix}`);
          }
        }
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        if (historyIndex === -1) {
          setDraftInput(input);
        }
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput(draftInput);
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
      return;
    }

    if (e.key === 'Enter') {
      const cmd = input;
      setInput('');
      if (cmd.trim()) {
        setCommandHistory((prev) => [...prev, cmd]);
      }
      setHistoryIndex(-1);
      setDraftInput('');
      setHistory((prev) => [
        ...prev,
        { id: crypto.randomUUID(), type: 'input', content: cmd, cwd },
      ]);
      executeCommand(cmd);
    }
  };

  const getTabCommand = (tabName: string, currentCwd: string) => {
    const isRoot = currentCwd === '~/portfolio';
    const isProjects = currentCwd === '~/portfolio/projects';

    if (tabName.startsWith('cat ')) {
      const file = tabName.split(' ')[1];
      return isRoot ? `cat ${file}` : `cd ~/portfolio && cat ${file}`;
    }
    if (tabName.startsWith('cd ')) {
      const dir = tabName.split(' ')[1];
      if (dir === 'projects') {
        return isProjects
          ? `cat list.txt`
          : `cd ~/portfolio/projects && cat list.txt`;
      }
      return currentCwd === `~/portfolio/${dir}`
        ? `ls`
        : `cd ~/portfolio/${dir}`;
    }
    return tabName;
  };

  const handleTabClick = (baseCmd: string) => {
    if (soundEnabled) audioManager.playClick(0.1);
    const cmd = getTabCommand(baseCmd, cwd);
    setHistory((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: 'input', content: cmd, cwd },
    ]);
    executeCommand(cmd);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!isBooting && history.length === 0) {
      setHistory([
        {
          id: crypto.randomUUID(),
          type: 'output',
          content: (
            <span className="text-slate-400">
              Welcome to DuckOS. Type{' '}
              <span className="text-teal-400 font-bold">help</span> to get
              started.
            </span>
          ),
        },
        {
          id: crypto.randomUUID(),
          type: 'output',
          content: contentBlocks.about,
        },
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
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [history, input]);

  if (isBooting) {
    return (
      <BootSequence
        onComplete={() => {
          localStorage.setItem('duckos_booted', 'true');
          setIsBooting(false);
        }}
      />
    );
  }

  return (
    <div
      ref={boundsRef}
      className="relative w-full min-h-screen p-4 md:p-8 flex items-center justify-center overflow-hidden selection:bg-blue-500/30 selection:text-white font-mono"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        className={`absolute inset-0 z-0 ${isMatrixMode ? 'bg-black' : 'bg-[#0a0a0a]'}`}
      >
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
        onClick={(e) => {
          e.stopPropagation();
          setSoundEnabled(!soundEnabled);
        }}
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

        <div className="flex flex-wrap gap-2 px-6 md:px-10 py-3 border-b border-white/5 bg-[#020617]/40 select-none z-10">
          {[
            'cat about.txt',
            'cat skills.txt',
            'cd projects',
            'cat contact.txt',
          ].map((tab) => (
            <button
              key={tab}
              onClick={(e) => {
                e.stopPropagation();
                handleTabClick(tab);
              }}
              className="text-sm px-3 py-1.5 rounded-md transition-all duration-300 font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 bg-white/[0.02] border border-white/5"
            >
              <span className="opacity-40 mr-1.5 text-slate-500">./</span>
              {tab.split(' ')[1] || tab.split(' ')[0]}
            </button>
          ))}
        </div>

        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-6 md:p-10 pt-6 custom-scrollbar relative"
        >
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
                      <span className="text-teal-400">
                        {item.cwd || '~/portfolio'}
                      </span>
                      <span className="text-slate-300 ml-2">λ</span>
                      <span className="text-slate-100 ml-2">
                        {item.content}
                      </span>
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
              <span className="text-teal-400">{cwd}</span>
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
