import { useMemo } from 'react';
import { Box, Chip, Link, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useGridApiRef } from '@mui/x-data-grid';
import { StyledDataGrid } from 'section/management-job/list-job/styles';

const defaultPageSize = 10;

const AppliedJobTable = () => {
  const apiRef = useGridApiRef();

  const tableData: any[] = [];

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
        columns={columns}
        pageSizeOptions={[defaultPageSize, 15]}
        disableVirtualization
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: defaultPageSize,
            },
          },
        }}
      />
    </Box>
  );
};

export default AppliedJobTable;
