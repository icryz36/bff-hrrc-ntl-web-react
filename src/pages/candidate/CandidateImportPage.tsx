import Grid from '@mui/material/Grid';
import ImportCandidateView from 'section/management-candidate/view/import-candidate-view';
import PageHeader from 'components/page-header/page-header';

const CandidateImportPage = () => {
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader title="Import Candidate" />
      </Grid>
      <Grid size={12} sx={{ px: { xs: 3, md: 5 }, py: 3 }}>
        <ImportCandidateView />
      </Grid>
    </Grid>
  );
};

export default CandidateImportPage;
