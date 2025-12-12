import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { grey } from '@mui/material/colors';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import DetailBatchIDView from 'section/import-file/batch-id/view/detail-batch-id-view';
import { useDownloadCandidateFailMutation } from 'services/candidate/mutation';
import { downloadBase64File } from 'utils/convertBase64file';
import IconifyIcon from 'components/base/IconifyIcon';
import PageContent from 'components/sections/common/PageContent';

const ImportDetailBatchIdPage = () => {
  const { id = '' } = useParams();
  const { down } = useBreakpoints();
  const downLg = down('lg');
  const navigate = useNavigate();
  const { mutate: downloadFail, isPending: isDownloadingFail } = useDownloadCandidateFailMutation();
  const handleDownloadCandidateFail = () => {
    downloadFail(
      { batchId: id, status: 'fail' },
      {
        onSuccess: (response) => {
          if (response.data?.binaryBase64) {
            downloadBase64File(response.data.binaryBase64, 'candidate-fail.xlsx');
          }
        },
      },
    );
  };

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
                  {`Import Detail Batch ID : ${id}`}
                </Typography>
              </Stack>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              <LoadingButton
                loading={isDownloadingFail}
                onClick={handleDownloadCandidateFail}
                variant="text"
                startIcon={<IconifyIcon icon="uil:import" />}
                sx={{
                  bgcolor: grey[200],
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: grey[300],
                  },
                }}
              >
                Download
              </LoadingButton>
            </Stack>
          </Stack>
        </PageContent>
      </Grid>
      <Grid size={12} sx={{ px: { xs: 3, md: 5 }, py: 3 }}>
        <DetailBatchIDView />
      </Grid>
    </Grid>
  );
};

export default ImportDetailBatchIdPage;
