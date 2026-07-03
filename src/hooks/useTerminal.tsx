import React, { useState, useRef } from 'react';
import { contentBlocks } from '../constants/terminalData';
import { CommandParser } from '../utils/vfs/CommandParser';
import { executeCommandEngine } from '../utils/vfs/commands';
import { rootFS } from '../utils/vfs/init';
import { FileSystem } from '../utils/vfs/FileSystem';
import { HistoryItem } from '../utils/vfs/types';

export const useTerminal = (isBooting: boolean) => {
  const getInitialHistory = () => {
    return [
      {
        id: crypto.randomUUID(),
        type: 'output' as const,
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
        type: 'output' as const,
        content: contentBlocks.about,
      },
    ];
  };

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    return isBooting ? [] : getInitialHistory();
  });
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('~/portfolio');
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [draftInput, setDraftInput] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const initTerminal = () => {
    setHistory(getInitialHistory());
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

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
    const cmd = getTabCommand(baseCmd, cwd);
    setHistory((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: 'input', content: cmd, cwd },
    ]);
    executeCommand(cmd);
    inputRef.current?.focus();
  };

  return {
    history,
    input,
    setInput,
    cwd,
    isMatrixMode,
    inputRef,
    handleKeyDown,
    handleTabClick,
    initTerminal,
  };
};
