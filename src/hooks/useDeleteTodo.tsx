import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../utils/helpers';

async function deleteTodo(id: number) {
  const response = await axiosInstance.delete(`/tasks/${id}`);

  return response.data;
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,

    // onError: err => {
    //   handleErrorResponse(err)
    // },

    onSuccess: () => {
        alert('Task deleted')
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}
