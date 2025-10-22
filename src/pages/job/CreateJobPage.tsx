import Grid from '@mui/material/Grid';
import PageHeader from 'components/page-header/page-header';
import PageContent from 'components/sections/common/PageContent';

const CreateJobPage = () => {
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader title="Create Job" />
      </Grid>
      <Grid size={12}>
        <PageContent>Create Job Form</PageContent>
      </Grid>
    </Grid>
  );
};

export default CreateJobPage;
