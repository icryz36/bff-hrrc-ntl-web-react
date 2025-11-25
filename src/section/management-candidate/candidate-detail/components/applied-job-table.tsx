import { useMemo } from 'react';
import { Box, Chip, ChipOwnProps } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useGridApiRef } from '@mui/x-data-grid';
import { StyledDataGrid } from 'section/management-job/list-job/styles';
import { StyledTypographyLine } from 'components/styled/StyledFontLine';

const defaultPageSize = 10;

export const getStatusBadgeColor = (val: string): ChipOwnProps['color'] => {
  switch (val?.toLocaleLowerCase()) {
    case 'interview':
      return 'success';
    default:
      return 'neutral';
  }
};

const AppliedJobTable = () => {
  const apiRef = useGridApiRef();

  const tableData: any[] = [
    {
      jobPostId: 'H00001',
      jobTitle:
        'เจ้าหน้าที่บริหารงานขายสาขา ปฏิบัติงาน สาขาสุขสวัสดิ์ 76 สาขาสุขสวัสดิ์ 84 สาขาตลาดพระประแดง สาขาซอยพุทธบูชา 44 สาขาประชาอุทิศ 90 สาขาพระประแดง',
      owner: 'NameOwner',
      applyDate: '01/11/2025',
      lastUpdate: '06/11/2025',
      status: 'New',
    },
    {
      jobPostId: 'H00002',
      jobTitle: 'เจ้าหน้าที่บริหารงานขายสาขา',
      owner: 'NameOwner',
      applyDate: '02/11/2025',
      lastUpdate: '06/11/2025',
      status: 'Interview',
    },
  ];

  const columns: GridColDef<any>[] = useMemo(
    () => [
      {
        field: 'jobPostId',
        headerName: 'Job Post ID',
        width: 104,
      },
      {
        field: 'jobTitle',
        headerName: 'Job Title',
        width: 380,
        renderCell: (params) => {
          return (
            <StyledTypographyLine variant="subtitle2_regular" line={1}>
              {params.row.jobTitle}
            </StyledTypographyLine>
          );
        },
      },
      {
        field: 'owner',
        headerName: 'Owner',
        width: 136,
      },
      {
        field: 'applyDate',
        headerName: 'Apply Date',
        width: 136,
      },
      {
        field: 'lastUpdate',
        headerName: 'Last Update',
        width: 136,
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 136,
        renderCell: (params) => {
          return (
            <Chip
              label={params.row.status}
              variant="soft"
              color={getStatusBadgeColor(params.row.status)}
              sx={{ textTransform: 'capitalize' }}
            />
          );
        },
      },
    ],
    [],
  );

  return (
    <Box sx={{ width: 1 }}>
      <StyledDataGrid
        rowHeight={64}
        rows={tableData}
        apiRef={apiRef}
        getRowId={(row) => row.jobPostId}
        columns={columns}
        pageSizeOptions={[defaultPageSize, 15]}
        disableVirtualization
        hideFooter
      />
    </Box>
  );
};

export default AppliedJobTable;
