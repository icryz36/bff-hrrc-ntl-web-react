import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import PageHeader from 'components/page-header/page-header';

const CreateJobPage = () => {
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader title="Create Job" />
      </Grid>
      <Grid size={12}>
        <Paper sx={{ px: { xs: 3, md: 5 }, py: 3 }}>Create Job Form</Paper>
      </Grid>
    </Grid>
  );
};

export default CreateJobPage;
