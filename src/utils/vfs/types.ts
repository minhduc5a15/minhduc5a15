import React from 'react';

export type NodeType = 'file' | 'directory';

export interface BaseNode {
  name: string;
  type: NodeType;
}

export interface FileNode extends BaseNode {
  type: 'file';
  content: React.ReactNode;
}

export interface DirectoryNode extends BaseNode {
  type: 'directory';
  children: Record<string, VFSNode>;
}

export type VFSNode = FileNode | DirectoryNode;

export interface CommandContext {
  cwd: string;
  fs: DirectoryNode; // Root directory
}

export interface CommandResponse {
  output?: React.ReactNode;
  newCwd?: string;
  clearTerminal?: boolean;
  action?: 'toggle_matrix';
  error?: boolean;
}
