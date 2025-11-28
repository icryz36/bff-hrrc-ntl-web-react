import { useNavigate } from 'react-router';
import { IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { EditCandidateView } from 'section/management-candidate/edit-candidate/view/edit-candidate-view';
import IconifyIcon from 'components/base/IconifyIcon';
import PageHeader from 'components/page-header/page-header';
import PageContent from 'components/sections/common/PageContent';

const CandidateEditPage = () => {
  const navigate = useNavigate();
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader
          title="Edit Candidate Detail"
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
      <Grid size={12}>
        <PageContent>
          <EditCandidateView />
        </PageContent>
      </Grid>
    </Grid>
  );
};

export default CandidateEditPage;
