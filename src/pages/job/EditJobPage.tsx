import Grid from '@mui/material/Grid';
import EditJobView from 'section/management-job/edit-job/view/edit-job-view';
import PageHeader from 'components/page-header/page-header';
import PageContent from 'components/sections/common/PageContent';

const EditJobPage = () => {
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader title="Edit Job" />
      </Grid>
      <Grid size={12}>
        <PageContent>
          <EditJobView />
        </PageContent>
      </Grid>
    </Grid>
  );
};

export default EditJobPage;
