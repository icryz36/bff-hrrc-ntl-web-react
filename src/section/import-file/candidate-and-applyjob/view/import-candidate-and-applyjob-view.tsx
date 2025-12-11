import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { useGridApiRef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useBoolean } from 'hooks/useBoolean';
import { navigatePaths } from 'routes/paths';
import { useCandidateQuery } from 'services/candidate/query';
import IconifyIcon from 'components/base/IconifyIcon';
import FileDropCustom from 'components/common/FileDropCustom';
import CustomConfirmDialog from 'components/custom-confirm-dialog/CustomDialog';
import ImportCandidateAndApplyJobTableView from './import-candidate-and-applyjob-table-view';

const ImportCandidateAndApplyJobView = () => {
  const isOpenConfirmDialog = useBoolean();
  const isOpenBatchDialog = useBoolean();

  const apiRef = useGridApiRef();
  const theme = useTheme();
  const navigate = useNavigate();

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

  const handleConfirm = () => {
    isOpenConfirmDialog.onFalse();
    isOpenBatchDialog.onTrue();
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
      <Stack mt={3} justifyContent="flex-end">
        <Button
          variant="contained"
          disabled={tableTotalRecords > 0 ? true : false}
          loading={isLoading}
          onClick={() => isOpenConfirmDialog.onTrue()}
        >
          Confirm
        </Button>
      </Stack>
      <CustomConfirmDialog
        title="ยืนยันการนำเข้าข้อมูล"
        open={isOpenConfirmDialog.value}
        onClose={isOpenConfirmDialog.onFalse}
        description={
          <Stack direction="column">
            <Typography variant="subtitle1_regular">
              จำนวนรายการข้อมูลที่นำเข้า: 10 รายการ
            </Typography>
            <Typography variant="subtitle1_regular">
              ต้องการนำเข้าข้อมูลเหล่านี้เข้าสู่ระบบหรือไม่?
            </Typography>
          </Stack>
        }
        action={
          <Stack spacing={1}>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => isOpenConfirmDialog.onFalse()}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={() => handleConfirm()}>
              Confirm
            </Button>
          </Stack>
        }
      />
      <CustomConfirmDialog
        title="นำเข้าข้อมูลแล้ว"
        open={isOpenBatchDialog.value}
        onClose={isOpenBatchDialog.onFalse}
        description={
          <Stack direction="column">
            <Typography variant="subtitle1_regular">ระบบกำลังดำเนินการอยู่</Typography>
            <Stack spacing={0.5}>
              <Typography variant="subtitle1_regular">Batch ID:</Typography>
              <Typography variant="subtitle1_bold">0001</Typography>
              <IconButton>
                <IconifyIcon
                  icon="material-symbols:content-copy-outline-sharp"
                  sx={{
                    fontSize: 20,
                    color: 'text.primary',
                  }}
                />
              </IconButton>
            </Stack>
          </Stack>
        }
        action={
          <Stack spacing={1}>
            <Button variant="outlined" color="neutral" onClick={() => isOpenBatchDialog.onFalse()}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate(navigatePaths.importFile.importTrackingAndHistory)}
            >
              Go to Tracking & History
            </Button>
          </Stack>
        }
      />
    </>
  );
};

export default ImportCandidateAndApplyJobView;
