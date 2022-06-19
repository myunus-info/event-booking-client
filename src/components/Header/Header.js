import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Events from '../Events/Events';

const Header = () => {
  return (
    <AppBar elevation={0} position="sticky">
      <Toolbar>
        <Typography variant="h5">BOOKING APP</Typography>
        <Events />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
