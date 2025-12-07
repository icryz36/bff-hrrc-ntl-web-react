import { useParams } from 'react-router';
import { Button, Chip, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useQuery } from '@tanstack/react-query';
import { useBoolean } from 'hooks/useBoolean';
import paths from 'routes/paths';
import { getStatusJpbBadgeColor } from 'section/manage-job-application/job-application/helper';
import JobApplicationDetailView from 'section/manage-job-application/job-application/view/job-application-detail-view';
import { useJobpostQuery } from 'services/jobpost/query';
import IconifyIcon from 'components/base/IconifyIcon';
import PageHeader from 'components/page-header/page-header';

const ListJobPage = () => {
  const { id = '' } = useParams();
  const isOpenApplyCandidateDialog = useBoolean();

  const { data } = useQuery(useJobpostQuery.detail({ jobPostId: id }));

  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader
          title="Job Application"
          breadcrumb={[
            { label: 'Home', url: '/' },
            { label: 'List Job Application', url: paths.listJobApplication },
            { label: 'Job Application', active: true },
          ]}
          actionComponent={
            <Stack spacing={2} alignItems="center">
              <Button
                variant="soft"
                color="neutral"
                onClick={isOpenApplyCandidateDialog.onTrue}
                startIcon={<IconifyIcon icon="mdi:user-outline" width={20} height={20} />}
              >
                Apply Candidate
              </Button>

              <Stack spacing={1.5} alignItems="center">
                <Typography variant="subtitle2_semibold">Job Status:</Typography>
                <Chip
                  label={data?.data?.statusName}
                  variant="soft"
                  color={getStatusJpbBadgeColor(data?.data?.statusName || '')}
                  sx={{ textTransform: 'capitalize' }}
                />
              </Stack>
            </Stack>
          }
        />
      </Grid>
      <Grid size={12} sx={{ px: { xs: 3, md: 5 }, py: 3 }}>
        <JobApplicationDetailView isOpenApplyCandidateDialog={isOpenApplyCandidateDialog} />
      </Grid>
    </Grid>
  );
};

export default ListJobPage;
