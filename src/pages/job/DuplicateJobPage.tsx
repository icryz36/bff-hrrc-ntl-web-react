import Grid from '@mui/material/Grid';
import DuplicateJobView from 'section/management-job/duplicate-job/view/duplicate-job-view';
import PageHeader from 'components/page-header/page-header';
import PageContent from 'components/sections/common/PageContent';

const EditJobPage = () => {
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader title="Create Job" />
      </Grid>
      <Grid size={12}>
        <PageContent>
          <DuplicateJobView />
        </PageContent>
      </Grid>
    </Grid>
  );
};

export default EditJobPage;
