import React from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './App.css';
import Container from './components/container';
import { queryClient } from './utils/queryClient';
import { ThemeProvider } from '@mui/material';
import { theme } from './utils/theme';


function App() {
  return (
    <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Container />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
