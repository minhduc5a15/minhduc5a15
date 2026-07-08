import { DirectoryNode } from './types';
import { contentBlocks } from '../../constants/terminalData';

export const rootFS: DirectoryNode = {
  name: '~',
  type: 'directory',
  children: {
    portfolio: {
      name: 'portfolio',
      type: 'directory',
      children: {
        'about.md': {
          name: 'about.md',
          type: 'file',
          content: contentBlocks.about,
        },
        'skills.md': {
          name: 'skills.md',
          type: 'file',
          content: contentBlocks.skills,
        },
        'contact.md': {
          name: 'contact.md',
          type: 'file',
          content: contentBlocks.contact,
        },
        projects: {
          name: 'projects',
          type: 'directory',
          children: {
            'list.md': {
              name: 'list.md',
              type: 'file',
              content: contentBlocks.projects,
            },
          },
        },
      },
    },
  },
};
