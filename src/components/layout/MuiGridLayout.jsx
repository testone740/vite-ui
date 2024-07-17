import { styled } from '@mui/material/styles';
import { Box, Grid, Paper } from '@mui/material';
// import BasicReactGrid from '../reactGrid/BasicReactGrid';
import CustomReactGrid from '../reactGrid/CustomReactGrid';

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
      <Box sx={{ margin: 2, width: '500px' }}>
        <h1>React Grid</h1>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
            <BasicReactGrid />
          </Grid> */}
          <Grid item xs={12}>
            <CustomReactGrid />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MuiGridLayout;
