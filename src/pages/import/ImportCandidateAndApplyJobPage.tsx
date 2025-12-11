import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import ImportCandidateView from 'section/import-file/candidate-and-applyjob/view/import-candidate-and-applyjob-view';
import { useDownloadCandidateTemplateMutation } from 'services/candidate/mutation';
import IconifyIcon from 'components/base/IconifyIcon';
import PageHeader from 'components/page-header/page-header';

const ImportCandidateAndApplyJobPage = () => {
  const { mutate: downloadTemplate, isPending: isDownloadingTemplate } =
    useDownloadCandidateTemplateMutation();

  const downloadBase64File = (
    base64String: string,
    fileName: string,
    mimeType: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
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
      return false;
    }
  };

  const handleDownloadTemplate = () => {
    downloadTemplate(
      { filePath: '/templates/template-candidates.xlsx' },
      {
        onSuccess: (response) => {
          if (response.data?.binaryBase64) {
            downloadBase64File(response.data.binaryBase64, 'template-candidate.xlsx');
          }
        },
      },
    );
  };

  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader
          title="Import Candidate & Apply Job"
          actionComponent={
            <Button
              variant="outlined"
              color="neutral"
              startIcon={
                <IconifyIcon
                  icon={
                    isDownloadingTemplate
                      ? 'line-md:loading-twotone-loop'
                      : 'material-symbols:download'
                  }
                />
              }
              onClick={handleDownloadTemplate}
              disabled={isDownloadingTemplate}
            >
              Download Template
            </Button>
          }
        />
      </Grid>
      <Grid size={12} sx={{ px: { xs: 3, md: 5 }, py: 3 }}>
        <ImportCandidateView />
      </Grid>
    </Grid>
  );
};

export default ImportCandidateAndApplyJobPage;
