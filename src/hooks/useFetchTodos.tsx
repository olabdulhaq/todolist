import { Dispatch, SetStateAction, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../utils/helpers';
import { TasksProps } from '../types';


async function getTasks(page: number = 0): Promise<TasksProps> {
    const { data } = await axiosInstance.get('/tasks?page=' + page);
    
  return data
}

interface UseFetchTodo {
  data: {
    received: number
    rows: TasksProps[]
  };
  status: "error" | "success" | "loading"
  isFetching: boolean
  activePage: number
  setActivePage: Dispatch<SetStateAction<number>>;
}

export function useFetchTodos(): UseFetchTodo {
//   const queryClient = useQueryClient();
  const [activePage, setActivePage] = useState<number>(1);

  const fallback = {
    received: 0,
    rows: [],
  } as any;

  const {
    data = fallback,
    isFetching,
    status,
  } = useQuery({
    queryKey: ['tasks', activePage],
    queryFn: () => getTasks(activePage),
    keepPreviousData: true,
  });

//   useEffect(() => {
//     if (!isPreviousData && activePage < data?.totalPages) {
//         queryClient.prefetchQuery({
//           queryKey: ['tasks', activePage + 1],
//           queryFn: () => getTasks(activePage + 1),
//         })
//       }
//   }, [queryClient, activePage, data, isPreviousData]);

  return {
    data,
    status,
    isFetching,
    activePage,
    setActivePage,
  };
}
