import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../utils/helpers';
import { TasksProps } from '../types';

async function updateTodo(data: TasksProps) {
  const response = await axiosInstance.put(`/tasks/${data.id}`, data);

  return response.data;
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,

    // onError: err => {
    //   handleErrorResponse(err)
    // },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}
