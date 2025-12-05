import { useParams } from 'react-router';
import Grid from '@mui/material/Grid';
import PageHeader from 'components/page-header/page-header';

const ImportDetailBatchIdPage = () => {
  const { id = '' } = useParams();
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader title={`Import Detail Batch ID : ${id}`} />
      </Grid>
      <Grid size={12} sx={{ px: { xs: 3, md: 5 }, py: 3 }}></Grid>
    </Grid>
  );
};

export default ImportDetailBatchIdPage;
