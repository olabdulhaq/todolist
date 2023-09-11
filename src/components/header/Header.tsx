import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import { appColor } from '../../constants/color';
import { MenuIcon, NotificationIcon, SettingsIcon } from '../../icons';

const navItems = [
  {
    id: 1,
    name: 'settings',
    icon: <SettingsIcon />,
  },
  {
    id: 2,
    name: 'notification',
    icon: <NotificationIcon />,
  },
];

const Header = () => {
  return (
    <AppBar
      component="nav"
      elevation={0}
      sx={{
        bgcolor: '#fff',
        color: '#000',
        height: '6.0625rem',
        borderBottom: `1px solid ${appColor.gray200}`,
        justifyContent: 'end'
      }}>
      <Toolbar sx={{pr: 0}}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: '1.5rem',
            // display: { xs: 'none', sm: 'block' },
          }}>
          ToDo
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {navItems.map((item) => (
            <IconButton key={item.id}>{item.icon}</IconButton>
          ))}
        </Box>
        <Tooltip title="Abdulhaq">
          <IconButton sx={{ p: 0, display: { xs: 'none', sm: 'block' } }}>
            <Avatar alt="Abdulhaq" src="/assets/user-avatar.svg" />
          </IconButton>
        </Tooltip>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        sx={{ mr: 2, display: { sm: 'none' } }}>
        <MenuIcon />
      </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
