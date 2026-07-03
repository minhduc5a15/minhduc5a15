import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Cpu, Database, ChevronRight, Github } from 'lucide-react';

// --- Typing Effect Component ---
const Typewriter = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let timeout: number;
    let currentIndex = 0;
    
    const startTyping = () => {
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeout = window.setTimeout(typeNextChar, 30 + Math.random() * 50);
        }
      };
      typeNextChar();
    };

    const initialDelay = window.setTimeout(startTyping, delay);
    return () => {
      clearTimeout(timeout);
      clearTimeout(initialDelay);
    };
  }, [text, delay]);

  return <span>{displayText}<span className="animate-pulse">_</span></span>;
};

// --- Main App Component ---
function App() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="relative w-full min-h-screen p-4 md:p-8 flex items-center justify-center overflow-hidden selection:bg-blue-500/30 selection:text-white font-mono">
      
      {/* 🌌 Aurora Gradient Background (Premium vibe) */}
      <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-600/10 blur-[100px] mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-blue-500/15 blur-[100px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>
      
      {/* 💻 Glass Terminal UI */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl h-[85vh] border border-white/10 bg-slate-950/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col rounded-2xl overflow-hidden ring-1 ring-white/5"
      >
        {/* Header - macOS style */}
        <div className="bg-slate-900/50 border-b border-white/5 p-4 flex items-center justify-between backdrop-blur-md">
          <div className="flex gap-2.5">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500/90 shadow-[inset_0_1px_4px_rgba(0,0,0,0.4)]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/90 shadow-[inset_0_1px_4px_rgba(0,0,0,0.4)]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-green-500/90 shadow-[inset_0_1px_4px_rgba(0,0,0,0.4)]"></div>
          </div>
          <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 opacity-70">
            <Terminal size={16} className="text-slate-400" />
            <span className="text-sm font-semibold tracking-wide text-slate-300">duck@portfolio ~ -zsh</span>
          </div>
          <div></div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar relative">
          
          {/* Content Wrapper */}
          <div className="max-w-4xl mx-auto">
            {/* Prompt */}
            <div className="mb-10 flex flex-col gap-3">
              <div className="text-slate-500 text-sm opacity-80">Last login: {new Date().toDateString()} on ttys000</div>
              <div className="flex items-center gap-2 font-semibold text-base md:text-lg">
                <span className="text-indigo-400">duck</span>
                <span className="text-slate-400">in</span>
                <span className="text-teal-400">~/portfolio</span>
                <span className="text-slate-400">on</span>
                <span className="text-purple-400">main</span>
                <span className="text-slate-300 ml-2">λ</span>
                <span className="text-slate-100 ml-2"><Typewriter text="./execute.sh" delay={300} /></span>
              </div>
            </div>

            {/* Navigation Tabs (as commands) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="flex flex-wrap gap-3 mb-10 border-b border-white/5 pb-6"
            >
              {['about', 'skills', 'projects', 'contact'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm px-5 py-2.5 rounded-lg transition-all duration-300 font-medium ${
                    activeTab === tab 
                      ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <span className="opacity-40 mr-2 text-slate-500">./</span>{tab}
                </button>
              ))}
            </motion.div>

            {/* Content Area */}
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 text-slate-300"
            >
              {/* --- ABOUT --- */}
              {activeTab === 'about' && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold flex items-center gap-3 text-white uppercase tracking-wider">
                    <span className="text-indigo-500">➜</span> IDENTIFICATION
                  </h2>
                  <div className="pl-6 flex flex-col md:flex-row gap-8 items-start">
                    <div className="shrink-0 relative">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                        <img src="/user-avatar.jpg" alt="minhduc5a15 avatar" className="w-full h-full object-cover" />
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
              )}

              {/* --- SKILLS --- */}
              {activeTab === 'skills' && (
                <div className="space-y-5">
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
              )}

              {/* --- PROJECTS --- */}
              {activeTab === 'projects' && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold flex items-center gap-3 text-white uppercase tracking-wider">
                    <span className="text-indigo-500">➜</span> EXECUTABLES
                  </h2>
                  <div className="space-y-8 pl-6">
                    {/* HELIX */}
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

                    {/* duckpass */}
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



                    <div className="pt-4 mt-4">
                      <a href="https://github.com/minhduc5a15" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10">
                        Explore more on GitHub <ChevronRight size={16}/>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* --- CONTACT --- */}
              {activeTab === 'contact' && (
                <div className="space-y-5">
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
              )}
            </motion.div>
            
            {/* Blinking Cursor at bottom */}
            <div className="mt-12 flex items-center gap-2 text-slate-500">
              <span className="text-indigo-500 font-bold">➜</span>
              <span>~</span>
              <span className="w-2.5 h-5 bg-indigo-400/80 animate-pulse ml-1 rounded-[1px]"></span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
