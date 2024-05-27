import React,{useState} from 'react';
import { BrowserRouter as Router, Route, createRoutesFromElements, Routes } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Body from './components/Body';

import Dashboard from './pages/Dashboard';
import Channel from './pages/Channels';
import Program from './pages/Program';
import Login from './pages/Login';
const App = () => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  const handleSidebarItemClick = (item) => {
    setSelectedItem(item);
  };

  const getComponent = () => {
    switch (selectedItem) {
      case 'Dashboard':
        return Dashboard;
      case 'Channel':
        return Channel;
      case 'Program':
        return Program;
      default:
        return Dashboard;
    }
  };

  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <CssBaseline />
        <Sidebar selectedItem={selectedItem} onSidebarItemClick={handleSidebarItemClick} />
        <Box sx={{ flexGrow: 1 }}>
          <Navbar selectedNavItem={selectedItem} />
          <Body selectedComponent={getComponent()} />
        </Box>
      </Box>
    </Router>
  );
};

export default App;
