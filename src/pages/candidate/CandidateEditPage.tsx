import Grid from '@mui/material/Grid';
import { EditCandidateView } from 'section/management-candidate/edit-candidate/view/edit-candidate-view';
import PageHeader from 'components/page-header/page-header';
import PageContent from 'components/sections/common/PageContent';

const CandidateEditPage = () => {
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader title="Edit Candidate Detail" />
      </Grid>
      <Grid size={12}>
        <PageContent>
          <EditCandidateView />
        </PageContent>
      </Grid>
    </Grid>
  );
};

export default CandidateEditPage;
