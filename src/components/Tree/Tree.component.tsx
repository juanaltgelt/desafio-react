import React, { useState, useCallback } from 'react';
import { TreeNodeType } from '../../types/tree.types';
import { TreeContext } from '../../contexts/TreeContext';
import { TreeNode } from './TreeNode.component';

interface Props {
  title: string;
  value: TreeNodeType;
  onChange: (newTree: TreeNodeType) => void;
  isEditMode: boolean;
}

export const Tree: React.FC<Props> = ({
  title,
  value,
  onChange,
  isEditMode,
}) => {
  const [tree, setTree] = useState<TreeNodeType>(value);

  const addNode = useCallback(
    (parent: TreeNodeType, title: string) => {
      const newNode = { title, children: [] };
      const updateTree = (node: TreeNodeType): TreeNodeType => {
        if (node === parent) {
          return { ...node, children: [...(node.children || []), newNode] };
        }
        return { ...node, children: node.children?.map(updateTree) };
      };
      const updatedTree = updateTree(tree);
      setTree(updatedTree);
      onChange(updatedTree);
    },
    [tree, onChange]
  );

  const removeNode = useCallback(
    (nodeToRemove: TreeNodeType) => {
      const updateTree = (node: TreeNodeType): TreeNodeType | null => {
        if (node === nodeToRemove) return null;
        const updatedChildren = node.children
          ?.map(updateTree)
          .filter((child) => child !== null);
        return { ...node, children: updatedChildren };
      };
      const updatedTree = updateTree(tree)!;
      setTree(updatedTree);
      onChange(updatedTree);
    },
    [tree, onChange]
  );

  return (
    <TreeContext.Provider value={{ isEditMode, addNode, removeNode }}>
      <div>
        <h1 data-testid="tree-title">{title}</h1>
        <ul>
          <TreeNode node={tree} level={0} />
        </ul>
      </div>
    </TreeContext.Provider>
  );
};
