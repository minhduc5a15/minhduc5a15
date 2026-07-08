import { DirectoryNode, VFSNode } from './types';

export class FileSystem {
  public static resolvePath(cwd: string, targetPath: string): string {
    if (!targetPath) return cwd;
    if (targetPath === '~') return '~';

    // Handle absolute vs relative
    let parts: string[];
    if (targetPath.startsWith('~/')) {
      parts = ['~', ...targetPath.slice(2).split('/')];
    } else if (targetPath.startsWith('/')) {
      parts = targetPath.split('/');
      parts[0] = '~'; // fake root to ~ for portfolio scope
    } else {
      parts = [...cwd.split('/'), ...targetPath.split('/')];
    }

    const resolved: string[] = [];
    for (const part of parts) {
      if (!part || part === '.') continue;
      if (part === '..') {
        if (resolved.length > 1) resolved.pop(); // don't pop ~
      } else {
        resolved.push(part);
      }
    }

    return resolved.join('/');
  }

  public static getNode(
    root: DirectoryNode,
    absolutePath: string
  ): VFSNode | null {
    if (absolutePath === '~') return root;

    const parts = absolutePath.split('/').filter((p) => p !== '~' && p !== '');
    let current: VFSNode = root;

    for (const part of parts) {
      if (current.type !== 'directory') return null;
      if (!current.children[part]) return null;
      current = current.children[part];
    }

    return current;
  }
}
