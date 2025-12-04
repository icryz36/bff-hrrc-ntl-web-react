// ---------------------------------------------------------------------
import { Stack, Typography } from '@mui/material';
import FileDropZone from 'components/base/FileDropZone';

const ImportCandidateView = () => {
  return (
    <>
      <FileDropZone
        maxSize={2 * 1024 * 1024}
        onDrop={(acceptedFiles) => {
          console.log({ acceptedFiles });
        }}
        accept={{
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
          'application/vnd.ms-excel': ['.xls'],
        }}
      />
      <Stack py={2} gap={0.8} alignItems={'center'}>
        <Typography variant="h6_bold">Validate Detail : </Typography>
        <Typography variant="h6_regular">
          Total <b>0</b> Record |{' '}
        </Typography>
        <Typography variant="h6_regular">
          Success <b>0</b> Record |{' '}
        </Typography>
        <Typography variant="h6_regular">
          Fail <b>0</b> Record
        </Typography>
      </Stack>
    </>
  );
};

export default ImportCandidateView;
