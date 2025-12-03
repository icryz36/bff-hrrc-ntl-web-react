import { useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { grey } from '@mui/material/colors';
import { useBoolean } from 'hooks/useBoolean';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import ApplyToOtherJobDialog from 'section/management-candidate/candidate-detail/components/apply-to-other-job-dialog';
import CandidateDetailView from 'section/management-candidate/candidate-detail/view/candidate-detail-view';
import IconifyIcon from 'components/base/IconifyIcon';
import PageContent from 'components/sections/common/PageContent';

const CandidateDatailPage = () => {
  const navigate = useNavigate();
  const isOpenApplyDialog = useBoolean();
  const { down } = useBreakpoints();
  const downLg = down('lg');

  return (
    <Grid container>
      <Grid size={12}>
        <PageContent>
          <Stack
            sx={{
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { sm: 'flex-end' },
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton edge="end" aria-label="back" onClick={() => navigate(-1)}>
                  <IconifyIcon icon="material-symbols:arrow-back-ios-rounded" />
                </IconButton>
                <Typography variant="h4" sx={[downLg && { fontSize: 'h5.fontSize' }]}>
                  Candidate Detail
                </Typography>
              </Stack>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                variant="text"
                startIcon={<IconifyIcon icon="mdi:briefcase-outline" />}
                onClick={isOpenApplyDialog.onTrue}
                sx={{
                  bgcolor: grey[200],
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: grey[300],
                  },
                }}
              >
                Applied Job
              </Button>
            </Stack>
          </Stack>
        </PageContent>
      </Grid>
      <Grid size={12} sx={{ px: { xs: 3, md: 5 }, py: 3 }}>
        <CandidateDetailView />
      </Grid>

      <ApplyToOtherJobDialog open={isOpenApplyDialog.value} onClose={isOpenApplyDialog.onFalse} />
    </Grid>
  );
};

export default CandidateDatailPage;
