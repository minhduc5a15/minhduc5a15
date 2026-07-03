import { CommandContext, CommandResponse } from './types';
import { FileSystem } from './FileSystem';
import { contentBlocks } from '../../constants/terminalData';

export const executeCommandEngine = (
  args: string[],
  ctx: CommandContext
): CommandResponse => {
  if (args.length === 0) return {};

  const cmd = args[0];
  const params = args.slice(1);

  switch (cmd) {
    case 'clear':
      return { clearTerminal: true };

    case 'whoami':
      return {
        output: (
          <span className="text-slate-300">duck (Root Access Granted)</span>
        ),
      };

    case 'sudo':
      if (params[0] === 'rm' && params[1] === '-rf' && params[2] === '/') {
        return {
          error: true,
          output: (
            <span className="text-red-500 font-bold">
              Nice try! Permission denied. You don't have enough ducks to do
              this.
            </span>
          ),
        };
      }
      return {
        error: true,
        output: <span className="text-red-400">sudo: permission denied</span>,
      };

    case 'matrix':
      return {
        action: 'toggle_matrix',
        output: (
          <span className="text-green-500">Toggling Matrix Protocol...</span>
        ),
      };

    case 'pwd':
      return {
        output: (
          <span className="text-slate-300">
            {ctx.cwd.replace('~', '/home/duck')}
          </span>
        ),
      };

    case 'cd': {
      if (params.length === 0) return { newCwd: '~' };
      const targetPath = params[0];
      const resolvedPath = FileSystem.resolvePath(ctx.cwd, targetPath);
      const node = FileSystem.getNode(ctx.fs, resolvedPath);

      if (!node) {
        return {
          error: true,
          output: (
            <span className="text-red-400">
              cd: {targetPath}: No such file or directory
            </span>
          ),
        };
      }
      if (node.type !== 'directory') {
        return {
          error: true,
          output: (
            <span className="text-red-400">
              cd: {targetPath}: Not a directory
            </span>
          ),
        };
      }
      return { newCwd: resolvedPath };
    }

    case 'ls': {
      const targetPath = params[0]
        ? FileSystem.resolvePath(ctx.cwd, params[0])
        : ctx.cwd;
      const node = FileSystem.getNode(ctx.fs, targetPath);

      if (!node) {
        return {
          error: true,
          output: (
            <span className="text-red-400">
              ls: {params[0] ? params[0] : ''}: No such file or directory
            </span>
          ),
        };
      }
      if (node.type === 'file') {
        return { output: <span className="text-slate-300">{node.name}</span> };
      }

      const children = Object.values(node.children).sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === 'directory' ? -1 : 1;
      });

      return {
        output: (
          <div className="flex gap-4 font-semibold flex-wrap">
            {children.map((child) => (
              <span
                key={child.name}
                className={
                  child.type === 'directory'
                    ? 'text-teal-400'
                    : 'text-indigo-300'
                }
              >
                {child.name}
                {child.type === 'directory' ? '/' : ''}
              </span>
            ))}
          </div>
        ),
      };
    }

    case 'cat': {
      if (params.length === 0)
        return {
          error: true,
          output: (
            <span className="text-red-400">cat: missing file operand</span>
          ),
        };

      const targetPath = params[0];
      const resolvedPath = FileSystem.resolvePath(ctx.cwd, targetPath);
      const node = FileSystem.getNode(ctx.fs, resolvedPath);

      if (!node) {
        return {
          error: true,
          output: (
            <span className="text-red-400">
              cat: {targetPath}: No such file or directory
            </span>
          ),
        };
      }
      if (node.type === 'directory') {
        return {
          error: true,
          output: (
            <span className="text-red-400">
              cat: {targetPath}: Is a directory
            </span>
          ),
        };
      }

      return { output: node.content };
    }

    case 'help':
      return { output: contentBlocks.help };

    default:
      return {
        error: true,
        output: (
          <span className="text-red-400">
            zsh: command not found: {cmd}. Type 'help' for available commands.
          </span>
        ),
      };
  }
};
