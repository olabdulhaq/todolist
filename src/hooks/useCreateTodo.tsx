import { useState, SyntheticEvent } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { axiosInstance } from '../utils/helpers';

const addTodo = async (params: any) => {
  await axiosInstance.post('/tasks', params);
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return useMutation({
    mutationFn: addTodo,

    onError: (err: any) => {
        handleClick()

      return (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {err?.error}
          </Alert>
        </Snackbar>
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      handleClick()

      return (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}>
            Todo added successfully
          </Alert>
        </Snackbar>
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
