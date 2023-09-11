import { QueryClient } from '@tanstack/react-query'

export const defaultQueryClientOptions = {
  queries: {
    staleTime: 600000, 
    cacheTime: 900000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  },
}

export const queryClient = new QueryClient({
  defaultOptions: defaultQueryClientOptions
})
