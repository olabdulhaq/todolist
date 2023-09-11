import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosInstance } from '../utils/helpers';

const addTodo = async (params: any) => {
  await axiosInstance.post('/tasks', params);
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,

    onError: (err: any) => {

     alert(err.error)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      alert('Task created successfully')
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
