import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Notifications, AccountCircle } from '@mui/icons-material';

const Navbar = ({selectedNavItem}) => {

  let title=""
  switch(selectedNavItem){
    case 'Dashboard':
      title="Dashboard"
      break;
      case 'Channel':
      title="Channel"
      break;
      case 'Program' :
        title="Program"
        break;
        default:
          title='Dashboard'
  }


  return (
    <AppBar position="fixed" sx={{ width: 'calc(100% - 240px)', marginLeft: 240, zIndex: 4, top: 0,background:"#09143C" }}> {/* Adjust marginLeft to the width of the sidebar */}
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Box>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
