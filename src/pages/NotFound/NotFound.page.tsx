import { Container, Typography } from '@mui/material';
import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <Container sx={{ pt: 2 }}>
      <Typography>Página no encontrada</Typography>
    </Container>
  );
};

export default NotFoundPage;
