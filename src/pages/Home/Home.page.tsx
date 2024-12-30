import React, { useState } from 'react';
import { Container, FormControlLabel, Switch } from '@mui/material';
import { localStorageService } from '../../services/localStorageService';
import { TreeNodeType } from '../../types/tree.types';
import { Tree } from '../../components/Tree/Tree.component';

const initialTree: TreeNodeType = {
  title: 'Raíz',
  children: [],
};

const HomePage: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [tree, setTree] = useState<TreeNodeType>(
    localStorageService.getItem('tree') || initialTree
  );

  const handleChange = (newTree: TreeNodeType) => {
    setTree(newTree);
    localStorageService.setItem('tree', newTree);
  };

  return (
    <Container sx={{ pt: 2 }}>
      <FormControlLabel
        control={
          <Switch
            data-testid="edit-mode-switch"
            checked={isEditMode}
            onChange={(e) => setIsEditMode(e.target.checked)}
          />
        }
        label={`${isEditMode ? 'Modo Edición' : 'Modo Vista'}`}
      />

      <Tree
        title="Árbol"
        value={tree}
        onChange={handleChange}
        isEditMode={isEditMode}
      />
    </Container>
  );
};

export default HomePage;
