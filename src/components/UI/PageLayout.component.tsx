import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import SnackbarProvider from '../../contexts/SnackbarContext';
import { Outlet } from 'react-router';
import { NavigationTabs } from './NavigationTabs.component';

export const PageLayout: React.FC = () => {
  return (
    <SnackbarProvider>
      <CssBaseline />
      <Container sx={{ minHeight: '100vh' }}>
        <NavigationTabs />
        <Outlet />
      </Container>
    </SnackbarProvider>
  );
};
