import Grid from '@mui/material/Grid';
import TrackingAndHistoryView from 'section/import-file/tracking-and-history/view/tracking-and-history-view';
import PageHeader from 'components/page-header/page-header';

const ImportTrackingAndHistoryPage = () => {
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader title="Import Tracking & History" />
      </Grid>
      <Grid size={12} sx={{ px: { xs: 3, md: 5 }, py: 3 }}>
        <TrackingAndHistoryView />
      </Grid>
    </Grid>
  );
};

export default ImportTrackingAndHistoryPage;
