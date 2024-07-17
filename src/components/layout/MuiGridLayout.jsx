import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const MuiGridLayout = () => {
  return (
    <>
      <h1>Grid</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs>
            <Item>Left</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>Middle</Item>
          </Grid>
          <Grid item xs>
            <Item>Right</Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MuiGridLayout;
