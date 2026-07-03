import { useState, useEffect } from 'react';

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
    }, 100);
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

export default BootSequence;
