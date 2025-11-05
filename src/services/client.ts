import { QueryClient, type QueryClientConfig } from '@tanstack/react-query';

// ----------------------------------------------------------------------

const clientConfig: QueryClientConfig =
  import.meta.env.MODE !== 'test'
    ? {
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 24, // 1 day
            staleTime: 1000 * 60 * 30, // 30 min
          },
        },
      }
    : {
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      };

export const queryClient = new QueryClient(clientConfig);
