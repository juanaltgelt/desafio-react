import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { ROUTES } from '../../utils/const';

export const NavigationTabs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [ROUTES.HOME, ROUTES.EXAMPLE];

  const currentTab = routes.indexOf(location.pathname);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    navigate(routes[newValue]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab !== -1 ? currentTab : 0}
          onChange={handleChange}
          aria-label="navigation tabs"
        >
          <Tab label="HOME" data-testid="tab-home" />
          <Tab label="EXAMPLE" data-testid="tab-example" />
        </Tabs>
      </Box>
    </Box>
  );
};
