import { useState } from 'react';
import { useGridApiRef } from '@mui/x-data-grid';
import ImportCandidateAndApplyJobTableView from 'section/import-file/candidate-and-applyjob/view/import-candidate-and-applyjob-table-view';

const DetailBatchIDView = () => {
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
    <ImportCandidateAndApplyJobTableView
      apiRef={apiRef}
      tableData={tableData}
      onPageChange={handlePageChange}
      totalItem={tableTotalRecords}
      currentPage={pagination.pageNo}
      loading={false}
    />
  );
};

export default DetailBatchIDView;
