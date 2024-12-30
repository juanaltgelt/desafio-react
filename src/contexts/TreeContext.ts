import { createContext } from 'react';
import { TreeNodeType } from '../types/tree.types';

export const TreeContext = createContext<{
  isEditMode: boolean;
  addNode: (parent: TreeNodeType, title: string) => void;
  removeNode: (node: TreeNodeType) => void;
} | null>(null);
