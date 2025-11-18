import Grid from '@mui/material/Grid';
import PageHeader from 'components/page-header/page-header';

const CandidateListPage = () => {
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader title="List Candidate" />
      </Grid>
      <Grid size={12} sx={{ px: { xs: 3, md: 5 }, py: 3 }}>
        x
      </Grid>
    </Grid>
  );
};

export default CandidateListPage;
