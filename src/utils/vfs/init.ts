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
        'about.txt': {
          name: 'about.txt',
          type: 'file',
          content: contentBlocks.about,
        },
        'skills.txt': {
          name: 'skills.txt',
          type: 'file',
          content: contentBlocks.skills,
        },
        'contact.txt': {
          name: 'contact.txt',
          type: 'file',
          content: contentBlocks.contact,
        },
        projects: {
          name: 'projects',
          type: 'directory',
          children: {
            'list.txt': {
              name: 'list.txt',
              type: 'file',
              content: contentBlocks.projects,
            },
          },
        },
      },
    },
  },
};
