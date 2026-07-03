import { useState, useEffect, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Terminal as TerminalIcon, Maximize2, X, Minus } from 'lucide-react';

import BootSequence from './components/BootSequence';
import MatrixRain from './components/MatrixRain';
import TerminalTabs from './components/TerminalTabs';
import TerminalWindow from './components/TerminalWindow';
import TerminalOutput from './components/TerminalOutput';
import TerminalInput from './components/TerminalInput';
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
        <TerminalWindow
          isMatrixMode={isMatrixMode}
          dragControls={dragControls}
        />

        <TerminalTabs
          tabs={TABS}
          activeTab={activeTab}
          targetTab={targetTab}
          isAutoCycling={isAutoCycling}
          onTabClick={(tab) => {
            setIsAutoCycling(false);
            setActiveTab(tab);
            setTargetTab(tab);
            handleTabClick(tab, true);
          }}
        />

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
              <TerminalOutput history={history} />

              <TerminalInput
                cwd={cwd}
                input={input}
                setInput={setInput}
                handleKeyDown={handleKeyDown}
                inputRef={inputRef}
                isMatrixMode={isMatrixMode}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
