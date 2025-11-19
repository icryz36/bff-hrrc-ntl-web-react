import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '@mui/material';
import { Form } from 'components/hook-form';
import { EditCandidateSchema, TEditCandidateSchema } from '../schema';

// ----------------------------------------------------------------------

const defaultValues: TEditCandidateSchema = {
  title: '',
  name: '',
  surName: '',
  nickName: '',
  candidateId: '',
  gender: '',
  age: '',
  contactNo: '',
};

// ----------------------------------------------------------------------

export const EditCandidateForm = () => {
  // form ---------------------------------------------------------------

  const methods = useForm({
    resolver: zodResolver(EditCandidateSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  // func ---------------------------------------------------------------

  const onSubmit = (data: TEditCandidateSchema) => {
    console.log('data', data);
  };

  // ---------------------------------------------------------------------

  return (
    <Container maxWidth="md">
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        sdsds
      </Form>
    </Container>
  );
};
