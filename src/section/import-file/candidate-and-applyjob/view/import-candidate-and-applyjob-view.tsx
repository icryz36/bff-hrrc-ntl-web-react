import { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { useGridApiRef } from '@mui/x-data-grid';
import FileDropZone from 'components/base/FileDropZone';
import ImportCandidateAndApplyJobTableView from './import-candidate-and-applyjob-table-view';

const ImportCandidateAndApplyJobView = () => {
  const apiRef = useGridApiRef();

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
          Fail <b style={{ color: '#B61C2A' }}>0</b> Record
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
