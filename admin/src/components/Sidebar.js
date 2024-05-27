import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton, Drawer, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { Dashboard, Tv, VideoLibrary, Menu } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Sidebar = ({ selectedItem, onSidebarItemClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Channel', icon: <Tv />, path: '/channel' },
    { text: 'Program', icon: <VideoLibrary />, path: '/program' }
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 240,
        bgcolor: 'background.paper',
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden', // Added overflowX to hide horizontal overflow
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: 'divider', boxShadow: 1 }}>
        <Dashboard />
        <Typography variant="h6" sx={{ ml: 1 }}>
          T-Move
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            onClick={() => onSidebarItemClick(item.text)}
            sx={{
              bgcolor: selectedItem === item.text ? '#09143C' : 'inherit',
              color: selectedItem === item.text ? 'white' : 'inherit',
              '&:hover': {
                bgcolor: '#09143C',
                color: 'white',
              }
            }}
          >
            <ListItemIcon sx={{ color: selectedItem === item.text ? 'white' : 'inherit', minWidth: 35 }}>
              {item.icon}
            </ListItemIcon>
            {!isMobile && (
              <ListItemText primary={item.text} />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ position: 'fixed', top: 16, left: 16, zIndex: 4 }}
          >
            <Menu />
          </IconButton>
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }} // Better open performance on mobile.
          >
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            width: 240,
            bgcolor: 'background.paper',
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 3,
            overflowY: 'auto',
            overflowX: 'hidden', // Added overflowX to hide horizontal overflow
          }}
        >
          {drawerContent}
        </Box>
      )}
    </>
  );
};

export default Sidebar;
