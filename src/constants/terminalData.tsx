import { Cpu, Code, Database, ChevronRight, Github } from 'lucide-react';
import { GithubHoverPreview } from '../components/GithubHoverPreview';

export const contentBlocks = {
  about: (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h2 className="text-xl font-bold flex items-center gap-3 text-white uppercase tracking-wider">
        <span className="text-indigo-500">➜</span> IDENTIFICATION
      </h2>
      <div className="pl-6 flex flex-col md:flex-row gap-8 items-start">
        <div className="shrink-0 relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <img
              src={`${import.meta.env.BASE_URL}user-avatar.jpg`}
              alt="minhduc5a15 avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-[#0d1326] shadow-lg"></div>
        </div>
        <div className="space-y-5 flex-1">
          <p className="text-lg md:text-xl leading-relaxed font-medium">
            Hello, I am <span className="text-white">minhduc5a15</span> (Duck).
          </p>
          <ul className="space-y-3 text-slate-400">
            <li className="flex items-center gap-3">
              <ChevronRight size={16} className="text-indigo-500 shrink-0" />{' '}
              <span>
                Role:{' '}
                <span className="text-blue-300">
                  AI Engineer | AI System Engineer | System Engineer
                </span>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <ChevronRight size={16} className="text-indigo-500 shrink-0" />{' '}
              <span>Location: Vietnam</span>
            </li>
            <li className="flex items-center gap-3">
              <ChevronRight size={16} className="text-indigo-500 shrink-0" />{' '}
              <span>
                Mission: Building highly optimized, privacy-first, and deeply
                integrated AI systems.
              </span>
            </li>
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
          <p className="text-slate-400 text-sm leading-relaxed">
            C/C++, Modern C++20, Memory Management, SIMD AVX2, OpenMP,
            High-Performance Computing.
          </p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:bg-white/[0.04] transition-colors group">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 text-indigo-400 group-hover:scale-110 transition-transform">
            <Code size={20} />
          </div>
          <h3 className="font-semibold mb-2 text-white">
            AI / Machine Learning
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Python, PyTorch, Tensor Runtime implementation, Autograd systems,
            Deep Learning.
          </p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:bg-white/[0.04] transition-colors group">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
            <Database size={20} />
          </div>
          <h3 className="font-semibold mb-2 text-white">
            Software Architecture
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Microservices, Distributed Systems, API Design (Golang/Node), System
            Optimization.
          </p>
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
                <GithubHoverPreview repo="minhduc5a15/HELIX">
                  <a
                    href="https://github.com/minhduc5a15/HELIX"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                  >
                    HELIX <Github size={18} className="opacity-50" />
                  </a>
                </GithubHoverPreview>
              </h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/10 text-slate-300">
                C++20
              </span>
            </div>
            <p className="text-indigo-300 text-sm mb-3 font-medium">
              Deep Learning Framework in Modern C++
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Built entirely from scratch. Features Tensor Runtime with O(1)
              latency, Dynamic Autograd (Define-by-Run), and hardware-level
              optimizations (SIMD AVX2, OpenMP) reaching up to 37 GFLOPS for
              matrix multiplication.
            </p>
          </div>
        </div>
        <div className="relative group mt-8">
          <div className="absolute -inset-4 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-3">
                <GithubHoverPreview repo="minhduc5a15/duckpass">
                  <a
                    href="https://github.com/minhduc5a15/duckpass"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-teal-400 transition-colors flex items-center gap-2"
                  >
                    duckpass <Github size={18} className="opacity-50" />
                  </a>
                </GithubHoverPreview>
              </h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/10 text-slate-300">
                C++20 / OpenSSL
              </span>
            </div>
            <p className="text-teal-300 text-sm mb-3 font-medium">
              Secure Command-Line Password Manager
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              A highly secure CLI vault built in C++20. Implements OpenSSL
              Secure Heap allocation and CAP_IPC_LOCK to prevent memory swapping
              to disk. Uses Argon2 for key derivation to ensure maximum
              protection of sensitive data.
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
          <a
            href="mailto:minhduc5a15@gmail.com"
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              @
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1 font-semibold uppercase">
                Email
              </div>
              <div className="text-slate-200 text-sm">
                minhduc5a15@gmail.com
              </div>
            </div>
          </a>
          <a
            href="https://github.com/minhduc5a15"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-slate-400/50 hover:bg-slate-400/10 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-slate-700 group-hover:text-white transition-colors">
              <Github size={18} />
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1 font-semibold uppercase">
                GitHub
              </div>
              <div className="text-slate-200 text-sm">
                github.com/minhduc5a15
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  ),
  help: (
    <div className="space-y-2 text-slate-300">
      <p className="text-indigo-400 font-bold mb-4">DuckOS Terminal Help</p>
      <p>
        <span className="text-teal-400 font-bold w-20 inline-block">ls</span>:
        List available files
      </p>
      <p>
        <span className="text-teal-400 font-bold w-20 inline-block">cat</span>:
        Read a file (e.g., cat about.txt)
      </p>
      <p>
        <span className="text-teal-400 font-bold w-20 inline-block">clear</span>
        : Clear terminal history
      </p>
      <p>
        <span className="text-teal-400 font-bold w-20 inline-block">
          whoami
        </span>
        : Print current user
      </p>
      <p>
        <span className="text-teal-400 font-bold w-20 inline-block">
          matrix
        </span>
        : Toggle matrix protocol
      </p>
    </div>
  ),
  ls: (
    <div className="flex gap-4 text-indigo-300 font-semibold">
      <span>about.txt</span>
      <span>skills.txt</span>
      <span className="text-teal-400">projects/</span>
      <span>contact.txt</span>
    </div>
  ),
};
