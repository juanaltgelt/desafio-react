import React, { useState, useContext, useEffect } from 'react';
import { TreeContext } from '../../contexts/TreeContext';
import { TreeNodeType } from '../../types/tree.types';
import { Box, Button, Chip, IconButton, TextField } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import { getChipColor } from '../../utils/getChipColor';

interface Props {
  node: TreeNodeType;
  level?: number;
}

export const TreeNode: React.FC<Props> = ({ node, level = 0 }) => {
  const { isEditMode, addNode, removeNode } = useContext(TreeContext)!;
  const { showSnackbar } = useContext(SnackbarContext);

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    setIsAdding(false);
  }, [isEditMode, isCollapsed]);

  const handleAddNode = () => {
    if (newTitle.trim()) {
      addNode(node, newTitle);

      showSnackbar({
        message: `¡Nodo '${newTitle}' ha sido creado exitosamente!`,
      });
    }
    setNewTitle('');
    setIsAdding(false);
    setIsCollapsed(false);
  };

  const handleRemoveNode = () => {
    removeNode(node);

    showSnackbar({
      message: `¡Nodo eliminado exitosamente!`,
    });
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const showCollapseIcon =
    level >= 2 && node.children && node.children.length > 0;

  return (
    <Box
      data-testid={`tree-node-${node.title}`}
      component="li"
      style={{
        margin: 20,
        listStyle: 'none',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Chip
            data-testid={`chip-level-${level}`}
            sx={{
              mr: 1,
              backgroundColor: getChipColor(level),
              color: 'black',
            }}
            label={`${level + 1}`}
          />
          {showCollapseIcon && (
            <IconButton onClick={toggleCollapse} size="small">
              {isCollapsed ? <Add /> : <Remove />}
            </IconButton>
          )}
          <span style={{ marginLeft: showCollapseIcon ? 4 : 0 }}>
            {node.title}
          </span>
        </Box>
        {isEditMode && (
          <Box sx={{ display: 'flex', gap: 1, marginLeft: '8px' }}>
            <Button
              data-testid={`add-button-${node.title}`}
              size="small"
              variant="contained"
              onClick={() => setIsAdding(true)}
            >
              Agregar
            </Button>

            {level !== 0 && (
              <Button
                data-testid={`remove-button-${node.title}`}
                size="small"
                variant="outlined"
                onClick={handleRemoveNode}
              >
                Eliminar
              </Button>
            )}
          </Box>
        )}
      </Box>

      {isAdding && isEditMode && (
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
          marginTop={2}
        >
          <TextField
            data-testid={`new-node-input-${node.title}`}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Ingresar Nodo"
            size="small"
          />
          <Button
            data-testid={`save-button-${node.title}`}
            size="small"
            onClick={handleAddNode}
            disabled={newTitle === ''}
          >
            Guardar
          </Button>
          <Button size="small" onClick={() => setIsAdding(false)}>
            Cancelar
          </Button>
        </Box>
      )}
      {!isCollapsed && node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} level={level + 1} />
          ))}
        </ul>
      )}
    </Box>
  );
};
