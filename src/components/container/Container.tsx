import React from 'react'

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../header/Header';
import MainContent from '../maincontent';

const Container = () => {
  return (
    <Box sx={{}}>
      <CssBaseline />
      <Header />
      <MainContent />
    </Box>
  )
}

export default Container