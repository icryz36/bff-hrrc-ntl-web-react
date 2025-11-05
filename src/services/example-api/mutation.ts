import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'services/client';
import { TCreateExamplePayload } from 'types/example/get-example';
import { useExampleQuery } from './query';
import { postCreateExample } from './services';

// ----------------------------------------------------------------------

const useCreateExampleMutation = () =>
  useMutation({
    mutationFn: (payload: TCreateExamplePayload) => postCreateExample(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: useExampleQuery.keys() });
    },
  });

//   etc api...

export { useCreateExampleMutation };
