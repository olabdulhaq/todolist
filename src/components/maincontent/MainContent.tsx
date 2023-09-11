import React from 'react'

import Box from '@mui/material/Box';

import Todos from './Todos';

const MainContent = () => {
  return (
    <Box sx={{mt: '6.9rem', mb: ['0','0','6rem']}}>
        <Todos />
    </Box>
  )
}

export default MainContent