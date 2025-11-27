import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import AppliedJobTable from 'section/management-candidate/candidate-detail/components/applied-job-table';
import { useCandidateQuery } from 'services/candidate/query';

// ----------------------------------------------------------------------

export const CandidateAppliedJobForm = () => {
  const { id = '' } = useParams();

  // api ---------------------------------------------------------------

  const { data: candidateDetail } = useQuery({
    ...useCandidateQuery.detail({ candidateId: id }),
    enabled: !!id,
  });

  // --------------------------------------------------------------------

  if (!candidateDetail) {
    return null;
  }

  return <AppliedJobTable tableData={candidateDetail?.jobApplications} />;
};
