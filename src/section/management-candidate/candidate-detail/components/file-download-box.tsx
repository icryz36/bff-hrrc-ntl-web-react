import { Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { useBoolean } from 'hooks/useBoolean';
import { useDownloadCandidateDocumentMutation } from 'services/candidate/mutation';
import { TDocumentItem } from 'types/candidate';
import IconifyIcon from 'components/base/IconifyIcon';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';

const FileDownloadBox = ({ data }: { data: TDocumentItem[] }) => {
  const isOpenUpdateFailedDialog = useBoolean();
  const { mutate: downloadCandidateDocument } = useDownloadCandidateDocumentMutation();

  const downloadBase64File = (
    base64String: string,
    fileName: string,
    mimeType: string = 'application/pdf',
  ): boolean => {
    try {
      const binaryString = atob(base64String);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);

      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      return true;
    } catch {
      isOpenUpdateFailedDialog.onToggle();
      return false;
    }
  };
  const handleDownload = (url: string, fileName: string) => {
    downloadCandidateDocument(
      { filePath: url },
      {
        onSuccess: (response) => {
          downloadBase64File(response.data.binaryBase64, fileName);
        },
        onError: () => {
          isOpenUpdateFailedDialog.onToggle();
        },
      },
    );
  };

  return (
    <Grid container spacing={2}>
      {data?.map((item) => (
        <Grid key={item.documentId} size={{ md: 6 }}>
          <Stack flexDirection="column" spacing={2} width="100%">
            <Typography>{item.documentType.documentTypeNameEn}</Typography>
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
                  <Typography variant="subtitle2_regular">{item.fileName}</Typography>
                </Stack>
                <IconifyIcon
                  icon="material-symbols:download"
                  fontSize="20px"
                  color="primary"
                  onClick={() => handleDownload(item.filePath, item.fileName)}
                  style={{ cursor: 'pointer' }}
                />
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      ))}
      <CustomConfirmDialog
        title="เกิดข้อผิดพลาด"
        open={isOpenUpdateFailedDialog.value}
        onClose={isOpenUpdateFailedDialog.onFalse}
        description={
          <Typography color="text.secondary" variant="subtitle1">
            ไม่สามารถแก้ไขข้อมูลได้ กรุณาลองใหม่อีกครั้ง
          </Typography>
        }
        action={
          <Button variant="contained" onClick={isOpenUpdateFailedDialog.onFalse}>
            Close
          </Button>
        }
      />
    </Grid>
  );
};

export default FileDownloadBox;
