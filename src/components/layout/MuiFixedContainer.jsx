import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiGridLayout from './MuiGridLayout';

const MuiFixedContainer = () => {
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#white', height: '100vh' }}>
          <MuiGridLayout />
        </Box>
      </Container>
    </>
  );
};

export default MuiFixedContainer;
