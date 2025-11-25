import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useCandidateQuery } from 'services/candidate/query';
import { EditCandidateForm } from '../components/edit-candidate-form';

// ----------------------------------------------------------------------

const EditCandidateView = () => {
  const { id = '' } = useParams();

  // api ---------------------------------------------------------------

  const { data: candidateDetail } = useQuery({
    ...useCandidateQuery.detail({ candidateId: id }),
    enabled: !!id,
  });
  console.log('candidateDetail', candidateDetail);

  // ----------------------------------------------------------------------

  return (
    <div>
      <EditCandidateForm />
    </div>
  );
};

export { EditCandidateView };
