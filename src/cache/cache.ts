import { QueryClient } from "react-query";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});
