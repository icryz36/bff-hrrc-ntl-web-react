import Grid from '@mui/material/Grid';
import ListJobView from 'section/management-job/list-job/view/list-job-view';
import PageHeader from 'components/page-header/page-header';

const ListJobPage = () => {
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader title="Create Job" />
      </Grid>
      <Grid size={12} sx={{ px: { xs: 3, md: 5 }, py: 3 }}>
        <ListJobView />
      </Grid>
    </Grid>
  );
};

export default ListJobPage;
