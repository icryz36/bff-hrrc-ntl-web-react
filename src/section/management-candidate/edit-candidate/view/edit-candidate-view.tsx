import { useMemo } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useCandidateQuery } from 'services/candidate/query';
import { EditCandidateForm } from '../components/edit-candidate-form';
import { convertDefaultValuesForm } from '../helper';

// ----------------------------------------------------------------------

const EditCandidateView = () => {
  const { id = '' } = useParams();

  // api ---------------------------------------------------------------

  const { data: candidateDetail } = useQuery({
    ...useCandidateQuery.detail({ candidateId: id }),
    enabled: !!id,
  });

  // ----------------------------------------------------------------------

  const defaultValuesForm = useMemo(
    () => convertDefaultValuesForm(candidateDetail),
    [candidateDetail],
  );

  console.log('defaultValuesForm', defaultValuesForm);

  // ----------------------------------------------------------------------

  return (
    <div>
      <EditCandidateForm defaultValuesForm={defaultValuesForm} />
    </div>
  );
};

export { EditCandidateView };
