import React from 'react';
import { Box, Paper } from '@mui/material';

const Body = ({ selectedComponent: SelectedComponent }) => {
  return (
    <Box sx={{ p: 2, paddingTop: '80px', paddingLeft: '270px', paddingRight: '16px', background: "whitesmoke" }}> {/* Add padding to accommodate fixed elements */}
      <Paper sx={{ p: 2 }}>
        <SelectedComponent />
      </Paper>
    </Box>
  );
};

export default Body;
