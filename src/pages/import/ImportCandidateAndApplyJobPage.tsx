import Grid from '@mui/material/Grid';
import ImportCandidateView from 'section/import-file/candidate-and-applyjob/view/import-candidate-and-applyjob-view';
import PageHeader from 'components/page-header/page-header';

const ImportCandidateAndApplyJobPage = () => {
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader title="Import Candidate & Apply Job" />
      </Grid>
      <Grid size={12} sx={{ px: { xs: 3, md: 5 }, py: 3 }}>
        <ImportCandidateView />
      </Grid>
    </Grid>
  );
};

export default ImportCandidateAndApplyJobPage;
