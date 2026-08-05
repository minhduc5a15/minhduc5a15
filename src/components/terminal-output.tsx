import { HistoryItem } from '../utils/vfs/types';

interface TerminalOutputProps {
  history: HistoryItem[];
}

export default function TerminalOutput({ history }: TerminalOutputProps) {
  return (
    <div className="space-y-6">
      {history.map((item) => (
        <div key={item.id}>
          {item.type === 'input' ? (
            <div className="flex items-center gap-2 font-semibold text-base">
              <span className="text-indigo-400">duck</span>
              <span className="text-slate-400">in</span>
              <span className="text-teal-400">{item.cwd || '~/portfolio'}</span>
              <span className="text-slate-300 ml-2">λ</span>
              <span className="text-slate-100 ml-2">{item.content}</span>
            </div>
          ) : (
            <div className="mt-4">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}
