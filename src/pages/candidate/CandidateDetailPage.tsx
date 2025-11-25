import Grid from '@mui/material/Grid';
import CandidateDetailView from 'section/management-candidate/candidate-detail/view/candidate-detail-view';
import PageHeader from 'components/page-header/page-header';

const CandidateDatailPage = () => {
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader title="Candidate Detail" />
      </Grid>
      <Grid size={12} sx={{ px: { xs: 3, md: 5 }, py: 3 }}>
        <CandidateDetailView />
      </Grid>
    </Grid>
  );
};

export default CandidateDatailPage;
