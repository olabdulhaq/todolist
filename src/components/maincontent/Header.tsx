import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { appColor } from '../../constants/color';

const Header = () => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Typography
          sx={{
            fontSize: ['1.5rem', '1.5rem','1.875rem'],
            fontWeight: 600,
            lineHeight: '2.375rem',
            color: appColor.gray900,
          }}>
          Good morning!
        </Typography>
        <Button
          variant="contained"
          sx={{
            display: ['none', 'none', 'flex' ],
            fontSize: '0.875rem',
            padding: '0.625rem 1rem',
            fontWeight: 600,
            lineHeight: '1.25rem',
            borderRadius: '0.5rem',
            border: `1px solid ${appColor.primary}`,
            background: appColor.primary,
            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
            textTransform: 'none',
            '&:hover': { backgroundColor: appColor.primary100 },
          }}
          startIcon={<AddCircleOutlineIcon />}>
          Create New Task
        </Button>
      </Box>
      <Typography
        sx={{
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: '1.5rem',
          color: appColor.gray600
        }}>You got some task to do.</Typography>
    </Box>
  );
};

export default Header;
