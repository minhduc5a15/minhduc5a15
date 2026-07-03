import { motion } from 'framer-motion';

interface TerminalTabsProps {
  tabs: string[];
  activeTab: string;
  targetTab: string;
  isAutoCycling: boolean;
  onTabClick: (tab: string) => void;
}

export default function TerminalTabs({
  tabs,
  activeTab,
  targetTab,
  isAutoCycling,
  onTabClick,
}: TerminalTabsProps) {
  return (
    <div className="relative border-b border-white/5 bg-[#020617]/40 select-none z-10">
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
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
          {tabs.map((tab) => {
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
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={(e) => {
                e.stopPropagation();
                onTabClick(tab);
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
  );
}
