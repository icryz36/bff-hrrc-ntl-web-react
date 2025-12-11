import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { useGridApiRef } from '@mui/x-data-grid';
import { useBoolean } from 'hooks/useBoolean';
import { pathsNavigate } from 'routes/paths';
import {
  useImportCandidatesMutation,
  useValidateCandidatesMutation,
} from 'services/candidate/mutation';
import { TCandidateListData } from 'types/candidate';
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

  const [listCandidateImport, setListCandidateImport] = useState<TCandidateListData | undefined>();
  const [batchId, setBatchId] = useState<string>('');

  const { mutate: validateCandidates, isPending: isLoading } = useValidateCandidatesMutation();
  const { mutate: importCandidates, isPending: isImporting } = useImportCandidatesMutation();

  const tableData = listCandidateImport?.items || [];
  const tableTotalRecords = listCandidateImport?.pagination?.totalRecords || 0;

  const totalRecords = tableData.length;
  const successRecords = tableData.filter((item) => item.validateStatus === 'success').length;
  const failRecords = tableData.filter((item) => item.validateStatus === 'fail').length;

  const handleConfirm = () => {
    isOpenConfirmDialog.onFalse();
    importCandidates(
      { candidates: tableData },
      {
        onSuccess: (response) => {
          if (response.data?.batchId) {
            setBatchId(response.data.batchId);
            isOpenBatchDialog.onTrue();
          } else {
            isOpenConfirmDialog.onTrue();
          }
        },
        onError: () => {
          isOpenConfirmDialog.onTrue();
        },
      },
    );
  };

  const handleFileDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      validateCandidates(
        { file },
        {
          onSuccess: (response) => {
            setListCandidateImport(response.data);
          },
          onError: () => {
            setListCandidateImport(undefined);
          },
        },
      );
    }
  };

  const handleFileRemove = () => {
    setListCandidateImport(undefined);
  };

  return (
    <>
      <FileDropCustom
        maxSize={50 * 1024 * 1024}
        onDrop={handleFileDrop}
        onRemove={handleFileRemove}
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
          Total <b>{totalRecords}</b> Record |{' '}
        </Typography>
        <Typography variant="h6_regular">
          Success <b>{successRecords}</b> Record |{' '}
        </Typography>
        <Typography variant="h6_regular">
          Fail <b style={{ color: theme.palette.chRed[400] }}>{failRecords}</b> Record
        </Typography>
      </Stack>
      <ImportCandidateAndApplyJobTableView
        apiRef={apiRef}
        tableData={tableData}
        onPageChange={() => {}}
        totalItem={tableTotalRecords}
        currentPage={1}
        loading={isLoading}
      />
      <Stack mt={3} justifyContent="flex-end">
        <Button
          variant="contained"
          disabled={tableTotalRecords === 0 || isLoading || isImporting}
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
              จำนวนรายการข้อมูลที่นำเข้า: {totalRecords} รายการ
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
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="subtitle1_bold">{batchId || '0001'}</Typography>
                <IconButton
                  onClick={() => {
                    if (batchId) {
                      navigator.clipboard.writeText(batchId);
                    }
                  }}
                >
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
          </Stack>
        }
        action={
          <Stack spacing={1}>
            <Button variant="outlined" color="neutral" onClick={() => isOpenBatchDialog.onFalse()}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate(pathsNavigate.importFile.importTrackingAndHistory)}
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
