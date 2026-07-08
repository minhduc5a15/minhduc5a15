import { KeyboardEvent, RefObject, useState } from 'react';

interface TerminalInputProps {
  cwd: string;
  input: string;
  setInput: (value: string) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
  isMatrixMode: boolean;
}

export default function TerminalInput({
  cwd,
  input,
  setInput,
  handleKeyDown,
  inputRef,
  isMatrixMode,
}: TerminalInputProps) {
  const [cursorPos, setCursorPos] = useState(input.length);
  const [prevInput, setPrevInput] = useState(input);

  if (input !== prevInput) {
    setPrevInput(input);
    setCursorPos(input.length);
  }

  const updateCursor = () => {
    if (inputRef.current) {
      setCursorPos(inputRef.current.selectionStart || 0);
    }
  };

  return (
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
          onChange={(e) => {
            setInput(e.target.value);
            updateCursor();
          }}
          onKeyDown={handleKeyDown}
          onKeyUp={updateCursor}
          onClick={updateCursor}
          onFocus={updateCursor}
          className="w-full bg-transparent border-none outline-none text-slate-100 ml-2 caret-transparent"
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
        <span
          className={`absolute w-2.5 h-5 ${
            isMatrixMode ? 'bg-green-500' : 'bg-indigo-400/80'
          } animate-pulse rounded-[1px] pointer-events-none`}
          style={{ left: `calc(0.5rem + ${cursorPos} * 9.6px)` }}
        ></span>
      </div>
    </div>
  );
}
