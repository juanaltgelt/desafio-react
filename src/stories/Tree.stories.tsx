import type { Meta, StoryObj } from '@storybook/react';
import { TreeNodeType } from '../types/tree.types';
import { userEvent, within, expect } from '@storybook/test';
import { Tree } from '../components/Tree/Tree.component';

const meta: Meta<typeof Tree> = {
  title: 'Components/Tree',
  component: Tree,
  argTypes: {
    isEditMode: { control: 'boolean' },
    onChange: { action: 'onChange' },
  },
};

export default meta;

type Story = StoryObj<typeof Tree>;

const initialTree: TreeNodeType = {
  title: 'Raíz',
  children: [
    { title: 'Hijo 1', children: [{ title: 'Nieto 1', children: [] }] },
    { title: 'Hijo 2', children: [] },
  ],
};

export const Default: Story = {
  args: {
    title: 'Árbol',
    value: initialTree,
    isEditMode: false,
  },
};

export const EditMode: Story = {
  args: {
    title: 'Árbol Modo Edición',
    value: initialTree,
    isEditMode: true,
  },
};

export const Interactions: Story = {
  args: {
    title: 'Árbol Interactivo',
    value: initialTree,
    isEditMode: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const addButton = canvas.getByTestId('add-button-Raíz');
    await userEvent.click(addButton);

    const input = canvas.getByTestId('new-node-input-Raíz');
    await userEvent.type(input, 'Nuevo Nodo');

    const saveButton = canvas.getByTestId('save-button-Raíz');
    await userEvent.click(saveButton);

    await expect(
      canvas.getByTestId('tree-node-Nuevo Nodo')
    ).toBeInTheDocument();
  },
};
