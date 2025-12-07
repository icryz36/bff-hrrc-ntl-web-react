import { useState } from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import { useGridApiRef } from '@mui/x-data-grid';
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

  const tableData: any = [
    {
      id: '1',
      validateStatus: 'success',
      errorMsg: '',
      title: 'Mr.',
      nameTh: 'Akkharaphon',
      surnameTh: 'Wattanapongphisitkulchai',
      gender: 'Male',
      age: '28',
      mobileNo: '000-000-0000',
      email: 'Exampleemail@gmail.com',
      desiredLocation: 'Head Office',
      desiredProvince: 'Bangkok',
      source: 'Job website : JobsDB',
      highestDegree: 'Master',
      workExperience:
        'Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      canDriveMotorcycle: 'ได้ มีใบขับขี่',
      canDriveCar: 'ได้ มีใบขับขี่',
      jobPostNo: 'HYYYYMM-0000010',
      applicationSource: 'Job website : JobsDB.',
      applicationDate: '11/11/2025',
    },
    {
      id: '2',
      validateStatus: 'fail',
      errorMsg: 'Wrong Email Format',
      title: 'Mr.',
      nameTh: 'Akkharaphon',
      surnameTh: 'Wattanapongphisitkulchai',
      gender: 'Male',
      age: '28',
      mobileNo: '000-000-0000',
      email: 'Exampleemail@gmail.com',
      desiredLocation: 'Head Office',
      desiredProvince: 'Bangkok',
      source: 'Job website : JobsDB',
      highestDegree: 'Master',
      workExperience:
        'Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      canDriveMotorcycle: 'ได้ มีใบขับขี่',
      canDriveCar: 'ได้ มีใบขับขี่',
      jobPostNo: 'HYYYYMM-0000010',
      applicationSource: 'Job website : JobsDB.',
      applicationDate: '11/11/2025',
    },
  ];
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
        maxSize={2 * 1024 * 1024}
        onDrop={(acceptedFiles) => {
          console.log({ acceptedFiles });
        }}
        sx={{
          height: 200,
        }}
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
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
          'application/vnd.ms-excel': ['.xls'],
          'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
          'application/pdf': ['.pdf'],
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
        loading={false}
      />
    </>
  );
};

export default ImportCandidateAndApplyJobView;
