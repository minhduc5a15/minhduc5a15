import { useState, useEffect, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Terminal as TerminalIcon, Maximize2, X, Minus } from 'lucide-react';

import BootSequence from './components/BootSequence';
import MatrixRain from './components/MatrixRain';
import { useTerminal } from './hooks/useTerminal';

const TABS = [
  'cat about.txt',
  'cat skills.txt',
  'cd projects',
  'cat contact.txt',
];

function App() {
  const [isBooting, setIsBooting] = useState(() => {
    return localStorage.getItem('duckos_booted') !== 'true';
  });

  const {
    history,
    input,
    setInput,
    cwd,
    isMatrixMode,
    inputRef,
    handleKeyDown,
    handleTabClick,
    initTerminal,
  } = useTerminal(isBooting);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const isInitialMount = useRef(true);

  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [targetTab, setTargetTab] = useState(TABS[0]);

  const [isAutoCycling, setIsAutoCycling] = useState(true);

  const handleTabClickRef = useRef(handleTabClick);

  useEffect(() => {
    handleTabClickRef.current = handleTabClick;
  }, [handleTabClick]);

  useEffect(() => {
    if (isBooting || !isAutoCycling) return;

    let step = 1;
    const maxSteps = TABS.length - 1;

    setTargetTab(TABS[step]);

    const interval = setInterval(() => {
      const currentTab = TABS[step];
      setActiveTab(currentTab);
      handleTabClickRef.current(currentTab, true);

      if (step >= maxSteps) {
        setIsAutoCycling(false);
        clearInterval(interval);
      } else {
        step++;
        setTargetTab(TABS[step]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isBooting, isAutoCycling]);

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
          initTerminal();
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

        <div className="relative border-b border-white/5 bg-[#020617]/40 select-none z-10">
          <svg className="absolute w-0 h-0">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="5"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="
                  1 0 0 0 0  
                  0 1 0 0 0  
                  0 0 1 0 0  
                  0 0 0 20 -10"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>

          {/* Gooey Background Layer */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{ filter: 'url(#goo)' }}
          >
            <div className="flex flex-wrap gap-2 px-6 md:px-10 py-3 w-full h-full">
              {TABS.map((tab) => {
                const isTarget = targetTab === tab;
                return (
                  <div
                    key={`goo-${tab}`}
                    className="relative px-3 py-1.5 text-sm font-medium"
                  >
                    <span className="opacity-0 mr-1.5">./</span>
                    <span className="opacity-0">
                      {tab.split(' ')[1] || tab.split(' ')[0]}
                    </span>

                    {isTarget && (
                      <motion.div
                        layoutId="gooIndicator"
                        className="absolute inset-0 bg-indigo-500 rounded-md"
                        animate={
                          isAutoCycling
                            ? {
                                scaleX: [1, 1.05, 1.1, 1.5, 1],
                                scaleY: [1, 0.95, 0.9, 0.5, 1],
                              }
                            : { scaleX: 1, scaleY: 1 }
                        }
                        transition={
                          isAutoCycling
                            ? {
                                duration: 3,
                                ease: [0.9, 0, 1, 1],
                              }
                            : { type: 'spring', stiffness: 120, damping: 14 }
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Foreground Buttons Layer */}
          <div className="relative flex flex-wrap gap-2 px-6 md:px-10 py-3 w-full h-full">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAutoCycling(false);
                    setActiveTab(tab);
                    setTargetTab(tab);
                    handleTabClick(tab, true);
                  }}
                  className={`relative text-sm px-3 py-1.5 rounded-md transition-colors duration-300 font-medium ${
                    isActive
                      ? 'text-indigo-300'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <span
                    className={`relative z-10 opacity-40 mr-1.5 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`}
                  >
                    ./
                  </span>
                  <span className="relative z-10">
                    {tab.split(' ')[1] || tab.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-6 md:p-10 pt-6 custom-scrollbar relative"
        >
          <div className="max-w-4xl mx-auto pb-20">
            <div className="mb-8 text-slate-500 text-sm opacity-80">
              Last login: {new Date().toDateString()} on ttys000
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
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
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
