import Grid from '@mui/material/Grid';
import JobApplicationListView from 'section/manage-job-application/job-application/view/job-application-list-view';
import PageHeader from 'components/page-header/page-header';

const ListJobPage = () => {
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader
          title="List Job Application"
          breadcrumb={[
            { label: 'Home', url: '/' },
            { label: 'List Job Application', active: true },
          ]}
        />
      </Grid>
      <Grid size={12} sx={{ px: { xs: 3, md: 5 }, py: 3 }}>
        <JobApplicationListView />
      </Grid>
    </Grid>
  );
};

export default ListJobPage;
