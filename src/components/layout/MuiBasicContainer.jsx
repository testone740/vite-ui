import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiGridLayout from './MuiGridLayout';

const MuiBasicContainer = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: 'white', height: '50rem' }}>
          <MuiGridLayout />
        </Box>
      </Container>
    </>
  );
};

export default MuiBasicContainer;
