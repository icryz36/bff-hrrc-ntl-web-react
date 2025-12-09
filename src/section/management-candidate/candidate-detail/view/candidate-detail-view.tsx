import { useParams } from 'react-router';
import { CandidateDetail } from '../components/candidate-detail';

const CandidateDetailView = () => {
  const { id = '' } = useParams();

  return <CandidateDetail candidateId={id} />;
};

export default CandidateDetailView;
