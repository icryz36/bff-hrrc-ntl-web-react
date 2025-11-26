import { Grid, Paper, Stack, Typography } from '@mui/material';
import { TDocumentItem } from 'types/candidate';
import IconifyIcon from 'components/base/IconifyIcon';

const FileDownloadBox = ({ data }: { data: TDocumentItem[] }) => {
  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  return (
    <Grid container spacing={2}>
      {data?.map((item) => (
        <Grid key={item.ducumentId} size={{ md: 6 }}>
          <Stack flexDirection="column" spacing={2} width="100%">
            <Typography>{item.ducumentType.docTypeNameEn}</Typography>
            <Paper
              elevation={0}
              background={1}
              variant="elevation"
              sx={{ height: 72, alignItems: 'center', display: 'flex', px: 1.5 }}
            >
              <Stack alignItems="center" justifyContent="space-between" width="100%">
                <Stack alignItems="center" spacing={2}>
                  <Paper
                    elevation={0}
                    background={2}
                    variant="elevation"
                    sx={{ p: 2, height: 56, width: 56 }}
                  >
                    <IconifyIcon icon="mdi:note-text-outline" fontSize="20px" color="primary" />
                  </Paper>
                  <Typography variant="subtitle2_regular">{item.filePath}</Typography>
                </Stack>
                <IconifyIcon
                  icon="material-symbols:download"
                  fontSize="20px"
                  color="primary"
                  onClick={() => handleDownload(item.filePath, item.ducumentType.docTypeNameEn)}
                  style={{ cursor: 'pointer' }}
                />
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

export default FileDownloadBox;
