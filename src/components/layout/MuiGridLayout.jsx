import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper } from '@mui/material';
// import FlagCellDemo from '../reactGrid/demo/FlagCellDemo';
import DropDownDemo from '../reactGrid/demo/DropDownDemo';
import DateTable from '../reactGrid/DateTable';
import DropDownTable from '../reactGrid/DropDownTable';
import CustomTable from '../reactGrid/CustomTable';

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
      <h1>React Grid</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
            <DropDownDemo />
          </Grid> */}
          <Grid item xs={12}>
            <DropDownTable />
          </Grid>
          <Grid item xs={12}>
            <CustomTable />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MuiGridLayout;
