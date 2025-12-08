import { useState } from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import { useGridApiRef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useCandidateQuery } from 'services/candidate/query';
import IconifyIcon from 'components/base/IconifyIcon';
import FileDropCustom from 'components/common/FileDropCustom';
import ImportCandidateAndApplyJobTableView from './import-candidate-and-applyjob-table-view';

const ImportCandidateAndApplyJobView = () => {
  const apiRef = useGridApiRef();
  const theme = useTheme();

  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });

  const [fileUpload, setFileUpload] = useState<File | undefined>();

  const query = useCandidateQuery.import({
    file: fileUpload,
  });

  const { data: listCandidateImport, isLoading } = useQuery(query);

  const tableData = listCandidateImport?.items || [];
  const tableTotalRecords = 0;

  const handlePageChange = ({ page, pageSize }: { page: number; pageSize: number }) => {
    setPagination({
      pageNo: page + 1,
      pageSize,
    });
  };

  return (
    <>
      <FileDropCustom
        maxSize={50 * 1024 * 1024}
        onDrop={(acceptedFiles) => {
          setFileUpload(acceptedFiles[0]);
        }}
        sx={{
          height: 200,
        }}
        buttonDelete
        children={
          <Stack flexDirection={'column'} alignItems={'center'} spacing={1}>
            <IconifyIcon
              icon="material-symbols:upload"
              fontSize={72}
              color={theme.palette.primary.main}
            />
            <Typography variant="body1_regular" color="primary">
              browse from device
            </Typography>
            <Typography variant="caption_regular" color="textSecondary">
              รองรับไฟล์ .xlsx และ .xls ขนาดไฟล์ไม่เกิน is 50 MB
            </Typography>
          </Stack>
        }
        accept={{
          'application/vnd.ms-excel': [],
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
        }}
      />
      <Stack py={3} gap={0.8} alignItems={'center'}>
        <Typography variant="h6_bold">Validate Detail : </Typography>
        <Typography variant="h6_regular">
          Total <b>0</b> Record |{' '}
        </Typography>
        <Typography variant="h6_regular">
          Success <b>0</b> Record |{' '}
        </Typography>
        <Typography variant="h6_regular">
          Fail <b style={{ color: theme.palette.chRed[400] }}>0</b> Record
        </Typography>
      </Stack>
      <ImportCandidateAndApplyJobTableView
        apiRef={apiRef}
        tableData={tableData}
        onPageChange={handlePageChange}
        totalItem={tableTotalRecords}
        currentPage={pagination.pageNo}
        loading={isLoading}
      />
    </>
  );
};

export default ImportCandidateAndApplyJobView;
