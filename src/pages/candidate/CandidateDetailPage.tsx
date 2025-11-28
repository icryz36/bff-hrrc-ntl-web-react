import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import CandidateDetailView from 'section/management-candidate/candidate-detail/view/candidate-detail-view';
import IconifyIcon from 'components/base/IconifyIcon';
import PageHeader from 'components/page-header/page-header';

const CandidateDatailPage = () => {
  const navigate = useNavigate();
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader
          title="Candidate Detail"
          actionComponent={
            <IconButton edge="end" aria-label="back" onClick={() => navigate(-1)}>
              <IconifyIcon icon="material-symbols:arrow-back-ios-rounded" />
            </IconButton>
          }
          sx={{
            flexDirection: 'row-reverse',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        />
      </Grid>
      <Grid size={12} sx={{ px: { xs: 3, md: 5 }, py: 3 }}>
        <CandidateDetailView />
      </Grid>
    </Grid>
  );
};

export default CandidateDatailPage;
